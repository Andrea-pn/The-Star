import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import SectionHeading from "../components/SectionHeading";
import TornPaperEdge from "../components/TornPaperEdge";
import ImmersiveStoryCard from "../components/ImmersiveStoryCard";
import { fetchPosts, WPPost, getFeaturedImageUrl, createExcerpt, extractTextFromHtml } from "../services/wordpress-api";

// Helper function to extract category names
const extractCategory = (post: WPPost): string => {
  if (!post._embedded || !post._embedded['wp:term']) {
    return 'News';
  }
  
  const categories = post._embedded['wp:term']?.find(terms => 
    terms.length > 0 && terms[0].taxonomy === 'category'
  );
  
  return categories && categories.length > 0 
    ? categories[0].name 
    : 'News';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

const FeaturedStories = () => {
  const { toast } = useToast();
  
  // Fetch featured stories
  const { data: postsData, isLoading: isLoadingPosts, error: postsError } = useQuery({
    queryKey: ['/api/wp/featured-posts'],
    queryFn: async () => {
      return fetchPosts({ 
        per_page: 10,
        categories: [], // You could set a specific "featured" category ID here
        _embed: true
      });
    }
  });
  
  if (postsError) {
    toast({
      title: "Error loading featured stories",
      description: "Could not load stories from The Star.",
      variant: "destructive"
    });
  }
  
  return (
    <>
      <Helmet>
        <title>Featured Stories | The Star 18th Anniversary</title>
        <meta name="description" content="Explore the most impactful and compelling stories from The Star's 18 years of journalism excellence." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 py-20 px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto"
          >
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl mb-4">
              Featured Stories
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-100">
              Immersive journalism and impactful narratives from The Star's 18 years of excellence.
            </p>
          </motion.div>
          <TornPaperEdge direction="bottom" color="white" />
        </div>
        
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <SectionHeading>Spotlight Stories</SectionHeading>
            <p className="text-gray-600 text-lg mb-12 max-w-3xl">
              Dive into the most impactful stories that have shaped our national conversation over the past 18 years. These pieces represent the pinnacle of The Star's journalistic mission.
            </p>
          </motion.div>
          
          {isLoadingPosts ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--primary-blue))] mb-4" />
              <p className="text-xl text-gray-600">Loading featured stories from The Star...</p>
            </div>
          ) : postsData?.posts && postsData.posts.length > 0 ? (
            <div className="space-y-24">
              {/* First featured story (hero) */}
              {postsData.posts.length > 0 && (
                <ImmersiveStoryCard
                  title={postsData.posts[0].title.rendered}
                  excerpt={createExcerpt(extractTextFromHtml(postsData.posts[0].excerpt.rendered), 200)}
                  imageUrl={getFeaturedImageUrl(postsData.posts[0]) || '/placeholder-image.jpg'}
                  date={formatDate(postsData.posts[0].date)}
                  category={extractCategory(postsData.posts[0])}
                  link={postsData.posts[0].link}
                  featured={true}
                />
              )}
              
              {/* Rest of the stories */}
              {postsData.posts.slice(1).map((post, index) => (
                <ImmersiveStoryCard
                  key={post.id}
                  title={post.title.rendered}
                  excerpt={createExcerpt(extractTextFromHtml(post.excerpt.rendered), 150)}
                  imageUrl={getFeaturedImageUrl(post) || '/placeholder-image.jpg'}
                  date={formatDate(post.date)}
                  category={extractCategory(post)}
                  link={post.link}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-xl">No featured stories available at the moment.</p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-6">
            <SectionHeading>About Our Editorial Process</SectionHeading>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 mb-6">
                At The Star, we believe in maintaining the highest journalistic standards. Our featured stories undergo a rigorous editorial process to ensure accuracy, fairness, and depth.
              </p>
              <p className="text-gray-700 mb-6">
                Each piece is researched extensively, fact-checked meticulously, and edited with care. We value context and nuance, seeking to present the full picture rather than just fragments.
              </p>
              <p className="text-gray-700">
                This commitment to quality journalism has been our guiding principle for 18 years and continues to shape how we report on the issues that matter most to our readers.
              </p>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default FeaturedStories;