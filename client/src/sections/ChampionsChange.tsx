import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import PolaroidImage from "../components/PolaroidImage";
import TornPaperEdge from "../components/TornPaperEdge";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Champion } from "../types";

const ChampionsChange = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  // Fetch champions from API
  const { data: champions = [] } = useQuery<Champion[]>({
    queryKey: ['/api/champions'],
  });

  return (
    <section 
      id="champions" 
      className="bg-primary-blue-light py-20 relative"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <SectionHeading color="white">
          JOURNALIST EXCELLENCE
        </SectionHeading>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-xl mb-12 max-w-3xl"
        >
          Celebrating our talented journalists who have played a vital role in The Star's 
          18-year journey, bringing truth and impactful stories to the Kenyan public.
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PolaroidImage
              src="https://images.unsplash.com/photo-1459499362902-55a20553e082"
              alt="Senior journalist reviewing a story"
              caption="Sarah Kimani: Senior Editor"
              rotation={-1}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PolaroidImage
              src="https://images.unsplash.com/photo-1524601500432-1e1a4c71d33d"
              alt="Field journalist reporting news"
              caption="David Ochieng: Investigative Reporter"
              rotation={2}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <PolaroidImage
              src="https://images.unsplash.com/photo-1560264280-88b68371db39"
              alt="Photojournalist in action"
              caption="Mercy Wanjiru: Chief Photographer"
              rotation={-2}
            />
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <motion.a
            href="#contact"
            className="bg-white text-[hsl(var(--primary-blue))] font-montserrat font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 inline-flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            MEET OUR JOURNALISTS
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute top-20 right-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Star className="h-8 w-8 text-primary-yellow-light animate-pulse" />
      </motion.div>
      
      <TornPaperEdge color="#000000" />
    </section>
  );
};

export default ChampionsChange;
