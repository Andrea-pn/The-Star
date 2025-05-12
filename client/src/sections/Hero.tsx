import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TornPaperEdge from "../components/TornPaperEdge";

const Hero = () => {
  const scrollToNext = () => {
    const targetId = "levelling";
    const element = document.getElementById(targetId);
    
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="bg-gradient-to-b from-[hsl(var(--primary-yellow))] to-[hsl(var(--primary-yellow-light))] min-h-screen pt-32 pb-20 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute w-96 h-96 rounded-full bg-black -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 rounded-full bg-black top-1/3 -right-20"></div>
        <div className="absolute w-64 h-64 rounded-full bg-black bottom-20 left-1/4"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="relative mb-6">
              <h1 className="font-montserrat font-black text-7xl sm:text-8xl md:text-9xl uppercase leading-none tracking-tighter">
                18<br />
                <span className="text-[hsl(var(--primary-red))]">YEARS</span>
              </h1>
              
              <motion.div 
                className="absolute -right-8 top-0 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transform rotate-12"
                initial={{ opacity: 0, scale: 0.8, rotate: 45 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="text-[hsl(var(--primary-red))] font-bold text-lg">2023</span>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-lg md:text-xl mb-8 max-w-lg">
                <span className="bg-white px-2 py-1 inline-block mb-2 font-semibold">Celebrating 18 years</span> of trusted journalism in Kenya. 
                From breaking news to investigative reporting, The Star has been the voice of Kenya since 2007.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="/timeline"
                  className="bg-[hsl(var(--primary-blue))] text-white font-medium px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 inline-flex items-center justify-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  OUR JOURNEY
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a
                  href="/events"
                  className="bg-white text-[hsl(var(--dark))] font-medium px-8 py-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-center"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ANNIVERSARY EVENTS
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2 relative"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Journalist reporting in the field" 
                className="rounded-xl shadow-2xl object-cover aspect-[4/3]"
              />
              
              <motion.div 
                className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-xl transform rotate-3 max-w-[220px]"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-start">
                  <div className="bg-[hsl(var(--primary-red))] text-white px-3 py-1 text-xs font-bold uppercase rounded-full mr-2">
                    18 Years
                  </div>
                  <p className="text-sm font-medium">
                    Trusted journalism, impactful storytelling
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-4 -right-4 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg"
                initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
                animate={{ opacity: 1, scale: 1, rotate: 12 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="text-center">
                  <div className="text-[hsl(var(--primary-blue))] font-bold text-lg">2007</div>
                  <div className="text-xs text-gray-600">founded</div>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              className="hidden md:block absolute -right-10 -bottom-16 w-32 h-32 bg-[hsl(var(--primary-red))] rounded-full opacity-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            />
          </motion.div>
        </div>
      </div>
      
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ y: -3 }}
        whileTap={{ y: 0 }}
      >
        <ChevronDown className="text-gray-600" />
      </motion.button>

      <TornPaperEdge />
    </section>
  );
};

export default Hero;