import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import PolaroidImage from "../components/PolaroidImage";
import TornPaperEdge from "../components/TornPaperEdge";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { TrainingProgram } from "../types";
import { fetchPosts, getFeaturedImageUrl, WPPost } from "../services/wordpress-api";
import { useState, useEffect } from "react";

// Function to convert WordPress post to PolaroidImage props
const postToPolaroidProps = (post: WPPost, rotation: number = 0) => {
  const imageUrl = getFeaturedImageUrl(post) || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167';
  
  // Get the title and decode HTML entities
  const title = post.title.rendered.replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"');
  
  return {
    src: imageUrl,
    alt: title, 
    caption: title, 
    rotation,
    link: post.link
  };
};

const LevellingField = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [featuredPosts, setFeaturedPosts] = useState<WPPost[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch training programs from API (legacy)
  const { data: programs = [] } = useQuery<TrainingProgram[]>({
    queryKey: ['/api/programs/training'],
  });

  // Fetch featured posts from WordPress API
  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['wp-featured-posts'],
    queryFn: async () => {
      // Fetch posts with featured media embedded
      const result = await fetchPosts({
        per_page: 8, // More posts for carousel
        _embed: true
      });
      return result;
    }
  });

  // Process posts data when available
  useEffect(() => {
    if (postsData?.posts) {
      setFeaturedPosts(postsData.posts);
    }
  }, [postsData]);

  // Create array of rotations for polaroid images (same as original)
  const rotations = [-2, 1, -1, 2];

  // Fallback static data (maintaining original structure)
  const staticCards = [
    {
      src: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167",
      alt: "Journalist reporting breaking news",
      caption: "Breaking News Coverage",
      rotation: -2
    },
    {
      src: "https://images.unsplash.com/photo-1557200134-90327ee9fafa",
      alt: "Investigative journalism documents", 
      caption: "Investigative Reporting",
      rotation: 1
    },
    {
      src: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
      alt: "Community engagement event",
      caption: "Community Engagement", 
      rotation: -1
    },
    {
      src: "https://images.unsplash.com/photo-1569616724363-dbdebd9561ca",
      alt: "Digital journalism platform",
      caption: "Digital Transformation",
      rotation: 2
    },
    {
      src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
      alt: "Political reporting",
      caption: "Political Coverage",
      rotation: -2
    },
    {
      src: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3",
      alt: "Sports journalism",
      caption: "Sports Reporting",
      rotation: 1
    },
    {
      src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0",
      alt: "Business journalism",
      caption: "Business Coverage",
      rotation: -1
    },
    {
      src: "https://images.unsplash.com/photo-1495020689067-958852a7765e",
      alt: "Entertainment reporting",
      caption: "Entertainment News",
      rotation: 2
    }
  ];

  // Use WordPress posts if available, otherwise use static data
  const allCards = featuredPosts.length > 0 
    ? featuredPosts.map((post, index) => postToPolaroidProps(post, rotations[index % rotations.length]))
    : staticCards;

  // Group cards into slides of 4 (original grid layout)
  const cardsPerSlide = 4;
  const totalSlides = Math.ceil(allCards.length / cardsPerSlide);
  const slides = Array.from({ length: totalSlides }, (_, index) =>
    allCards.slice(index * cardsPerSlide, (index + 1) * cardsPerSlide)
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section 
      id="levelling" 
      className="bg-primary-red-light py-20 relative"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <SectionHeading color="white">
          18 YEARS OF IMPACT
        </SectionHeading>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-xl mb-12 max-w-3xl"
        >
          For 18 years, The Star has been a pillar of Kenyan journalism,
          bringing vital stories to light and making a significant impact on society through factual reporting.
        </motion.p>
        
        {isLoadingPosts ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-white" />
            <span className="ml-3 text-white text-lg">Loading featured stories...</span>
          </div>
        ) : (
          <div className="relative mt-16">
            {/* Carousel Container */}
            <div 
              className="relative overflow-visible"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {slides[currentSlide]?.map((card, index) => (
                    <motion.div
                      key={`${currentSlide}-${index}`}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        rotate: 0,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {'link' in card ? (
                        <a href={card.link as string} target="_blank" rel="noopener noreferrer">
                          <PolaroidImage
                            src={card.src}
                            alt={card.alt}
                            caption={card.caption}
                            rotation={card.rotation}
                          />
                        </a>
                      ) : (
                        <PolaroidImage
                          src={card.src}
                          alt={card.alt}
                          caption={card.caption}
                          rotation={card.rotation}
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows - Only show if more than 1 slide */}
            {totalSlides > 1 && (
              <>
                <motion.button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 shadow-lg"
                  onClick={prevSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </motion.button>
                
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 shadow-lg"
                  onClick={nextSlide}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </motion.button>
              </>
            )}

            {/* Dot Indicators - Only show if more than 1 slide */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-8 space-x-3">
                {slides.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentSlide 
                        ? 'w-8 h-3 bg-white' 
                        : 'w-3 h-3 bg-white bg-opacity-40 hover:bg-opacity-60'
                    }`}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + (index * 0.05) }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 flex justify-center"
        >
          <motion.a
            href="/archives"
            className="bg-white text-[hsl(var(--primary-red))] font-montserrat font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            READ OUR STORIES
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute top-10 right-10 circle-pulse h-16 w-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="h-8 w-8 bg-white rounded-full"></div>
      </motion.div>
      
    <TornPaperEdge color="hsl(42 100% 57%)" />
    </section>
  );
};

export default LevellingField;