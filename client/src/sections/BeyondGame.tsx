import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import PolaroidImage from "../components/PolaroidImage";
import TornPaperEdge from "../components/TornPaperEdge";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { BeyondProgram } from "../types";
import { fetchPosts, getFeaturedImageUrl, WPPost } from "../services/wordpress-api";
import { useState, useEffect } from "react";

const postToPolaroidProps = (post: WPPost, rotation: number = 0) => {
  const imageUrl = getFeaturedImageUrl(post) || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f';
  
  let category = "News";
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0].length > 0) {
    category = post._embedded['wp:term'][0][0].name;
  }
  
  const title = post.title.rendered.replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"');
  
  return {
    src: imageUrl,
    alt: title, 
    caption: title, 
    rotation,
    link: post.link
  };
};

const BeyondGame = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [featuredPosts, setFeaturedPosts] = useState<WPPost[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { data: programs = [] } = useQuery<BeyondProgram[]>({
    queryKey: ['/api/programs/beyond'],
  });

  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['wp-beyond-posts'],
    queryFn: async () => {
      const result = await fetchPosts({
        per_page: 8, // Increased for carousel
        page: 2,
        _embed: true
      });
      return result;
    }
  });

  useEffect(() => {
    if (postsData?.posts) {
      setFeaturedPosts(postsData.posts);
    }
  }, [postsData]);

  const rotations = [1, -2, 3, -1];

  // Fallback static data for when posts aren't available
  const staticCards = [
    {
      src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      alt: "Community engagement panel discussion",
      caption: "Public Debate Forums",
      rotation: 1
    },
    {
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
      alt: "Journalism school program",
      caption: "Journalism Education",
      rotation: -2
    },
    {
      src: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4",
      alt: "Digital media training",
      caption: "Digital Literacy",
      rotation: 3
    },
    {
      src: "https://images.unsplash.com/photo-1559223984-d8c32f5d5fb1",
      alt: "Mobile journalism",
      caption: "Mobile Reporting",
      rotation: -1
    },
    {
      src: "https://images.unsplash.com/photo-1557200134-90327ee9fafa",
      alt: "Media literacy workshop",
      caption: "Media Literacy Training",
      rotation: 2
    },
    {
      src: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe",
      alt: "Community outreach program",
      caption: "Community Outreach",
      rotation: -1
    },
    {
      src: "https://images.unsplash.com/photo-1569616724363-dbdebd9561ca",
      alt: "Digital transformation",
      caption: "Digital Innovation",
      rotation: 1
    },
    {
      src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
      alt: "Policy engagement",
      caption: "Policy Dialogue",
      rotation: -2
    }
  ];

  // Use WordPress posts if available, otherwise use static data
  const allCards = featuredPosts.length > 0 
    ? featuredPosts.map((post, index) => postToPolaroidProps(post, rotations[index % rotations.length]))
    : staticCards;

  // Group cards into slides of 4
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
      id="beyond" 
      className="bg-primary-yellow-light py-20 relative"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <SectionHeading>
          BEYOND THE NEWS
        </SectionHeading>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-dark text-xl mb-12 max-w-3xl"
        >
          For 18 years, The Star's influence has extended beyond headlines – fostering informed debate, 
          shaping public policy, and empowering communities through knowledge and truth.
        </motion.p>
        
        {isLoadingPosts ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--primary-blue))]" />
            <span className="ml-3 text-[hsl(var(--primary-blue))] text-lg">Loading impact stories...</span>
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
                  <ChevronLeft className="w-6 h-6 text-[hsl(var(--primary-blue))]" />
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
                  <ChevronRight className="w-6 h-6 text-[hsl(var(--primary-blue))]" />
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
                        ? 'w-8 h-3 bg-[hsl(var(--primary-blue))]' 
                        : 'w-3 h-3 bg-[hsl(var(--primary-blue))] bg-opacity-40 hover:bg-opacity-60'
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <h3 className="font-montserrat font-bold text-xl mb-4 text-primary-blue">Community Engagement</h3>
            <p className="text-gray-700 mb-4">
              Through town halls, reader forums, and public events, The Star has created platforms 
              for Kenyans to engage directly with newsmakers and each other, fostering dialogue on 
              national issues and building a more informed citizenry.
            </p>
            <div className="flex items-center">
              <span className="text-sm text-primary-blue font-semibold">250+ Community Events</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-primary-blue font-semibold">All 47 Counties</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white rounded-lg p-6 shadow-md"
          >
            <h3 className="font-montserrat font-bold text-xl mb-4 text-primary-blue">Media Literacy Programs</h3>
            <p className="text-gray-700 mb-4">
              The Star has been at the forefront of promoting media literacy, helping Kenyans 
              navigate the complex media landscape, distinguish fact from fiction, and become 
              more critical consumers of information in the digital age.
            </p>
            <div className="flex items-center">
              <span className="text-sm text-primary-blue font-semibold">100,000+ Students Reached</span>
              <span className="mx-2 text-gray-300">•</span>
              <span className="text-sm text-primary-blue font-semibold">500+ Schools</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <TornPaperEdge direction="bottom" color="hsl(214, 48%, 23%)" />
    </section>
  );
};

export default BeyondGame;