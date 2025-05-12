import { Helmet } from "react-helmet";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import SectionHeading from "../components/SectionHeading";
import ImmersiveStoryCard from "../components/ImmersiveStoryCard";
import { WPPost, fetchPosts, getFeaturedImageUrl, createExcerpt } from "../services/wordpress-api";

// Helper function to format date
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Helper function to extract category
const extractCategory = (post: WPPost): string => {
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0].length > 0) {
    return post._embedded['wp:term'][0][0].name;
  }
  return "News";
};

const FeaturedStories = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Animation values
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.05], [0, -50]);
  const headerBg = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.6], 
    ["rgba(0, 0, 0, 0.7)", "rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0)"]
  );

  // Fetch featured stories from WordPress API
  const { data, isLoading, error } = useQuery({
    queryKey: ['wp-featured-stories'],
    queryFn: async () => {
      const result = await fetchPosts({
        per_page: 5,
        _embed: true
      });
      return result;
    }
  });

  return (
    <>
      <Helmet>
        <title>Featured Stories | The Star Kenya</title>
        <meta 
          name="description" 
          content="Explore The Star Kenya's most impactful stories from our 18 years of journalism. Discover the headlines that shaped national conversations." 
        />
        <meta property="og:title" content="The Star Kenya - Featured Stories" />
        <meta property="og:description" content="Dive into our immersive collection of featured stories from 18 years of The Star's journalism, showcasing Kenya's most significant news moments." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      
      {/* Hero section */}
      <div className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1586828680969-201ea0d8569e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80" 
            alt="Journalism" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60 z-10"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5], [0.6, 0]) }}
        />
        
        <motion.div 
          className="container mx-auto px-4 relative z-20 text-center"
          style={{ y: titleY, opacity: titleOpacity }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Featured Stories</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-8">
            Immerse yourself in The Star's most significant stories from 18 years of impactful journalism
          </p>
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Fixed header that appears on scroll */}
      <motion.div 
        className="fixed top-0 left-0 w-full z-40 py-4 px-6"
        style={{ backgroundColor: headerBg }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h2 className="text-white font-bold text-2xl">The Star: 18 Years of Stories</h2>
        </div>
      </motion.div>
      
      {/* Main content area */}
      <div className="bg-gradient-to-b from-[hsl(var(--primary-blue-dark))] to-gray-900" ref={containerRef}>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <SectionHeading color="white">
              STORIES THAT DEFINED US
            </SectionHeading>
            <p className="text-gray-300 mt-4 text-lg">
              These landmark stories showcase The Star's commitment to quality journalism and 
              highlight the impactful reporting that has become our hallmark over 18 years.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-white" />
              <span className="ml-3 text-white text-lg">Loading featured stories...</span>
            </div>
          ) : error ? (
            <div className="bg-red-500 bg-opacity-20 text-white p-6 rounded-xl text-center">
              <p>Sorry, we couldn't load the featured stories. Please try again later.</p>
            </div>
          ) : (
            <div className="space-y-32">
              {data?.posts.map((post, index) => (
                <ImmersiveStoryCard
                  key={post.id}
                  title={post.title.rendered}
                  excerpt={createExcerpt(post.excerpt.rendered, 180)}
                  imageUrl={getFeaturedImageUrl(post) || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167'}
                  date={formatDate(post.date)}
                  category={extractCategory(post)}
                  link={post.link}
                  featured={index === 0}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                />
              ))}
              
              {/* Fallback if no posts are available */}
              {(!data?.posts || data.posts.length === 0) && (
                <div className="text-center text-white py-12">
                  <p className="text-lg">No featured stories available at the moment.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Quote section */}
        <div className="bg-[hsl(var(--primary-red))] bg-opacity-90">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl text-white opacity-20 mb-6">❝</div>
                <h3 className="text-2xl md:text-3xl text-white font-light italic mb-6">
                  Good journalism is a nation talking to itself.
                </h3>
                <p className="text-white text-lg">— Arthur Miller</p>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-gray-900 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6">
                  Explore Our Complete Archives
                </h3>
                <p className="text-gray-300 mb-8">
                  Dive deeper into our 18-year history with full access to The Star's complete archives.
                  Browse by date, topic, or journalist.
                </p>
                <motion.a
                  href="/archives"
                  className="inline-flex items-center px-8 py-4 bg-white text-[hsl(var(--primary-blue))] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                >
                  Visit Archives
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FeaturedStories;