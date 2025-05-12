import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Footer = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  const newsCategories = [
    { name: "Politics", href: "#" },
    { name: "Business", href: "#" },
    { name: "Entertainment", href: "#" },
    { name: "Sports", href: "#" },
    { name: "Opinion", href: "#" },
  ];

  const involvement = [
    { name: "Subscribe", href: "#" },
    { name: "Advertise", href: "#" },
    { name: "Submit a Story", href: "#" },
    { name: "Anniversary Events", href: "#" },
    { name: "Career Opportunities", href: "#" },
  ];

  return (
    <footer 
      className="bg-dark text-white pt-16 pb-8"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex space-x-1 text-white font-montserrat font-bold text-2xl mb-6">
              <span className="bg-[hsl(var(--primary-yellow))] text-dark px-2">THE</span>
              <span className="bg-[hsl(var(--primary-red))] px-2">STAR</span>
              <span className="text-[hsl(var(--primary-blue))] px-2">18</span>
            </div>
            <p className="text-gray-400 mb-6">
              Celebrating 18 years of trusted journalism, bringing Kenya's stories to light since 2007.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-montserrat font-bold text-xl mb-6">News Categories</h3>
            <ul className="space-y-3">
              {newsCategories.map((category) => (
                <li key={category.name}>
                  <a 
                    href={category.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-montserrat font-bold text-xl mb-6">Get Involved</h3>
            <ul className="space-y-3">
              {involvement.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-montserrat font-bold text-xl mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mt-1 mr-3 text-primary-yellow-light flex-shrink-0" />
                <span className="text-gray-400">Lion Place, Waiyaki Way, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary-yellow-light flex-shrink-0" />
                <span className="text-gray-400">+254 20 3222111</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary-yellow-light flex-shrink-0" />
                <span className="text-gray-400">news@the-star.co.ke</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500"
        >
          <p>&copy; {new Date().getFullYear()} The Star, Kenya. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors duration-300">Accessibility</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
