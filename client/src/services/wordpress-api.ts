// WordPress API service
import { apiRequest } from '../lib/queryClient';

const WP_API_URL = 'https://thefamoustv.com/wp-json/wp/v2';

export interface WPPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  link: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      media_details?: {
        sizes?: {
          medium_large?: {
            source_url: string;
          };
          full?: {
            source_url: string;
          };
        };
      };
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPTag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WPMedia {
  id: number;
  source_url: string;
  media_details: {
    sizes: {
      [key: string]: {
        source_url: string;
      };
    };
  };
}

// Fetch posts with featured media and terms embedded
export async function fetchPosts(params: {
  page?: number;
  per_page?: number;
  categories?: number[];
  tags?: number[];
  search?: string;
  _embed?: boolean;
} = {}): Promise<{
  posts: WPPost[];
  totalPages: number;
  total: number;
}> {
  const queryParams = new URLSearchParams();
  
  // Add parameters
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.per_page) queryParams.append('per_page', params.per_page.toString());
  if (params.categories && params.categories.length > 0) {
    queryParams.append('categories', params.categories.join(','));
  }
  if (params.tags && params.tags.length > 0) {
    queryParams.append('tags', params.tags.join(','));
  }
  if (params.search) queryParams.append('search', params.search);
  
  // Always embed featured media and terms, unless specifically disabled
  if (params._embed !== false) {
    queryParams.append('_embed', 'true');
  }
  
  const url = `${WP_API_URL}/posts?${queryParams.toString()}`;
  
  const response = await fetch(url);
  const posts = await response.json() as WPPost[];
  
  // Extract headers
  const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);
  const total = parseInt(response.headers.get('X-WP-Total') || '0', 10);
  
  return { posts, totalPages, total };
}

// Fetch a single post by ID or slug
export async function fetchPost(idOrSlug: number | string): Promise<WPPost | null> {
  const isId = typeof idOrSlug === 'number';
  const url = `${WP_API_URL}/posts/${idOrSlug}?_embed=true`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json() as WPPost;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Fetch categories
export async function fetchCategories(): Promise<WPCategory[]> {
  try {
    const url = `${WP_API_URL}/categories?per_page=100`;
    const response = await fetch(url);
    return await response.json() as WPCategory[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch tags
export async function fetchTags(): Promise<WPTag[]> {
  try {
    const url = `${WP_API_URL}/tags?per_page=100`;
    const response = await fetch(url);
    return await response.json() as WPTag[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

// Fetch media by ID
export async function fetchMedia(id: number): Promise<WPMedia | null> {
  try {
    const url = `${WP_API_URL}/media/${id}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json() as WPMedia;
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

// Helper to get featured image URL from a post with _embedded data
export function getFeaturedImageUrl(post: WPPost, size: 'thumbnail' | 'medium' | 'large' | 'full' = 'large'): string | null {
  if (!post._embedded || !post._embedded['wp:featuredmedia'] || !post._embedded['wp:featuredmedia'][0]) {
    return null;
  }
  
  const media = post._embedded['wp:featuredmedia'][0];
  
  // Check if media details and sizes exist
  if (!media.media_details?.sizes) {
    return media.source_url;
  }
  
  // Map of WordPress image sizes
  const sizeMap: Record<string, string> = {
    'thumbnail': 'thumbnail',
    'medium': 'medium',
    'large': 'large',
    'full': 'full'
  };
  
  // Get the WordPress size name
  const wpSize = sizeMap[size];
  
  // Try to get the requested size if it exists
  if (wpSize in media.media_details.sizes) {
    return (media.media_details.sizes as any)[wpSize].source_url;
  }
  
  // Fall back to medium_large if available
  if ('medium_large' in media.media_details.sizes) {
    return (media.media_details.sizes as any)['medium_large'].source_url;
  }
  
  // Otherwise return the full source URL
  return media.source_url;
}

// Helper to extract category names from a post with _embedded data
export function getCategoryNames(post: WPPost): string[] {
  if (!post._embedded || !post._embedded['wp:term'] || !post._embedded['wp:term'][0]) {
    return [];
  }
  
  return post._embedded['wp:term'][0].map(term => term.name);
}

// Helper to extract tag names from a post with _embedded data
export function getTagNames(post: WPPost): string[] {
  if (!post._embedded || !post._embedded['wp:term'] || !post._embedded['wp:term'][1]) {
    return [];
  }
  
  return post._embedded['wp:term'][1].map(term => term.name);
}

// Extract plain text from HTML content
export function extractTextFromHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

// Create excerpt from content if not available
export function createExcerpt(content: string, maxLength: number = 150): string {
  const text = extractTextFromHtml(content);
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}