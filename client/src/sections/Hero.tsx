import { motion } from "framer-motion";
import TornPaperEdge from "../components/TornPaperEdge";

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="bg-[hsl(var(--primary-yellow))] min-h-screen pt-32 pb-20 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <h1 className="font-montserrat font-black text-7xl sm:text-8xl md:text-9xl uppercase leading-none tracking-tighter mb-6">
              18<br />YEARS
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              Celebrating 18 years of trusted journalism in Kenya. 
              From breaking news to investigative reporting, The Star has been the voice of Kenya since 2007.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#impact"
                className="bg-[hsl(var(--dark))] text-white font-montserrat font-bold px-8 py-4 rounded-full hover:bg-opacity-80 transition-all duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                OUR JOURNEY
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.a>
              <motion.a
                href="#levelling"
                className="bg-white text-[hsl(var(--dark))] font-montserrat font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ANNIVERSARY EVENTS
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="order-1 md:order-2 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Journalist working on a news story" 
              className="rounded-lg shadow-2xl transform md:rotate-3 hover:rotate-0 transition-all duration-500"
            />
            <motion.div 
              className="absolute -bottom-4 -left-4 bg-[hsl(var(--primary-red))] text-white p-4 font-montserrat font-bold uppercase transform -rotate-3 shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              18 years of trusted journalism
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <span className="h-3 w-3 bg-dark rounded-full opacity-70"></span>
        <span className="h-3 w-3 bg-dark rounded-full"></span>
        <span className="h-3 w-3 bg-dark rounded-full opacity-70"></span>
      </motion.div>

      <TornPaperEdge />
    </section>
  );
};

export default Hero;
