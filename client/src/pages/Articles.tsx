import React, { useEffect, useState, useRef } from 'react';

const WP_API_URL = 'https://thefamoustv.com/wp-json/wp/v2';

const Articles: React.FC = () => {
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const getLatestStory = async () => {
    setLoading(true);
    setError(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); 
    }
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(
        `${WP_API_URL}/posts?per_page=1&_embed`,
        { signal: abortControllerRef.current.signal }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        setStory(data[0]);
      } else {
        setStory(null);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Fetch error:', err);
        setError('Failed to load story.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLatestStory();
    const interval = setInterval(getLatestStory, 60 * 1000);

    return () => {
      clearInterval(interval);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  if (loading) return <p>Loading latest story...</p>;
  if (error) return <p>{error}</p>;
  if (!story) return <p>No story found.</p>;

  const link = story.link;
  const title = story.title?.rendered?.replace(/(<([^>]+)>)/gi, "") || 'Untitled Story';
  const image = (story._embedded?.['wp:featuredmedia'] as any)?.[0]?.source_url || '';
  const categoriesArray = story._embedded?.['wp:term']?.[0] || [];
  const categories = categoriesArray.map((cat: any) => cat.name).join(', ');

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      {categories && (
        <h2 style={{ fontSize: '1.2rem', color: '#777', marginBottom: '5px' }}>{categories}</h2>
      )}

      <a href={link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {image && (
          <img
            src={image}
            alt="Featured"
            style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }}
          />
        )}

        <h1 style={{ fontSize: '1.5rem', color: '#111', marginTop: '10px' }}>
          {title}
        </h1>
      </a>
    </div>
  );
};

export default Articles;
