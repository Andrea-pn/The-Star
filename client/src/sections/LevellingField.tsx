import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import PolaroidImage from "../components/PolaroidImage";
import TornPaperEdge from "../components/TornPaperEdge";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { TrainingProgram } from "../types";

const LevellingField = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  // Fetch training programs from API
  const { data: programs = [] } = useQuery<TrainingProgram[]>({
    queryKey: ['/api/programs/training'],
  });

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PolaroidImage
              src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167"
              alt="Journalist reporting breaking news"
              caption="Breaking News Coverage"
              rotation={-2}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PolaroidImage
              src="https://images.unsplash.com/photo-1557200134-90327ee9fafa"
              alt="Investigative journalism documents"
              caption="Investigative Reporting"
              rotation={1}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <PolaroidImage
              src="https://images.unsplash.com/photo-1503428593586-e225b39bddfe"
              alt="Community engagement event"
              caption="Community Engagement"
              rotation={-1}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <PolaroidImage
              src="https://images.unsplash.com/photo-1569616724363-dbdebd9561ca"
              alt="Digital journalism platform"
              caption="Digital Transformation"
              rotation={2}
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
            className="bg-white text-primary-red-light font-montserrat font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            JOIN A PROGRAM
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
      
      <TornPaperEdge color="#FFC726" />
    </section>
  );
};

export default LevellingField;
