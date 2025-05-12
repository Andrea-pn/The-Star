import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import PolaroidImage from "../components/PolaroidImage";
import TornPaperEdge from "../components/TornPaperEdge";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { BeyondProgram } from "../types";

const BeyondGame = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  // Fetch beyond game programs from API
  const { data: programs = [] } = useQuery<BeyondProgram[]>({
    queryKey: ['/api/programs/beyond'],
  });

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
              src="https://images.unsplash.com/photo-1607453998774-d533f65dac99"
              alt="Youth journalism workshop"
              caption="Youth Journalism Initiative"
              rotation={-2}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <PolaroidImage
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998"
              alt="Environmental campaign organized by The Star"
              caption="Environmental Campaigns"
              rotation={2}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <PolaroidImage
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f"
              alt="Digital literacy training program"
              caption="Digital Literacy Programs"
              rotation={-1}
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 flex justify-center"
        >
          <motion.a
            href="#contact"
            className="bg-dark text-white font-montserrat font-bold px-8 py-4 rounded-full hover:bg-opacity-80 transition-all duration-300 inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LEARN MORE
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-32 left-12 transform rotate-12"
        initial={{ opacity: 0, rotate: 0 }}
        animate={inView ? { opacity: 1, rotate: 12 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <svg xmlns='http://www.w3.org/2000/svg' width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      </motion.div>
      
      <TornPaperEdge color="#1D3557" />
    </section>
  );
};

export default BeyondGame;
