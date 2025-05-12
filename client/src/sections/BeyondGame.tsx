import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import PolaroidImage from "../components/PolaroidImage";
import TornPaperEdge from "../components/TornPaperEdge";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { BeyondProgram } from "../types";
import { fetchPosts, getFeaturedImageUrl, WPPost } from "../services/wordpress-api";
import { useState, useEffect } from "react";

// Function to convert WordPress post to PolaroidImage props
const postToPolaroidProps = (post: WPPost, rotation: number = 0) => {
  const imageUrl = getFeaturedImageUrl(post) || 'https://images.unsplash.com/photo-1516321497487-e288fb19713f';
  
  // Extract category
  let category = "News";
  if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0].length > 0) {
    category = post._embedded['wp:term'][0][0].name;
  }
  
  return {
    src: imageUrl,
    alt: post.title.rendered,
    caption: category,
    rotation
  };
};

const BeyondGame = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [featuredPosts, setFeaturedPosts] = useState<WPPost[]>([]);

  // Fetch beyond game programs from API (legacy)
  const { data: programs = [] } = useQuery<BeyondProgram[]>({
    queryKey: ['/api/programs/beyond'],
  });

  // Fetch featured posts from WordPress API with a different category
  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['wp-beyond-posts'],
    queryFn: async () => {
      // Fetch different posts than the ones in LevellingField section
      // We're using a different page to ensure different content
      const result = await fetchPosts({
        per_page: 4,
        page: 2,
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

  // Create array of rotations for polaroid images
  const rotations = [1, -2, 3, -1];

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {isLoadingPosts ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--primary-blue))]" />
              <span className="ml-3 text-[hsl(var(--primary-blue))] text-lg">Loading impact stories...</span>
            </div>
          ) : featuredPosts.length > 0 ? (
            featuredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              >
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <PolaroidImage
                    {...postToPolaroidProps(post, rotations[index % rotations.length])}
                  />
                </a>
              </motion.div>
            ))
          ) : (
            // Fallback to static content if no posts
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <PolaroidImage
                  src="https://images.unsplash.com/photo-1516321497487-e288fb19713f"
                  alt="Community engagement panel discussion"
                  caption="Public Debate Forums"
                  rotation={1}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <PolaroidImage
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
                  alt="Journalism school program"
                  caption="Journalism Education"
                  rotation={-2}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <PolaroidImage
                  src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4"
                  alt="Digital media training"
                  caption="Digital Literacy"
                  rotation={3}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <PolaroidImage
                  src="https://images.unsplash.com/photo-1559223984-d8c32f5d5fb1"
                  alt="Mobile journalism"
                  caption="Mobile Reporting"
                  rotation={-1}
                />
              </motion.div>
            </>
          )}
        </div>
        
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
      
      <TornPaperEdge direction="bottom" color="white" />
    </section>
  );
};

export default BeyondGame;