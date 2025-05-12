import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Footer = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  const programs = [
    { name: "Youth Development", href: "#" },
    { name: "Community Sports", href: "#" },
    { name: "Coaching Education", href: "#" },
    { name: "Equipment Donations", href: "#" },
    { name: "Scholarships", href: "#" },
  ];

  const involvement = [
    { name: "Volunteer", href: "#" },
    { name: "Donate", href: "#" },
    { name: "Partner With Us", href: "#" },
    { name: "Sponsor an Event", href: "#" },
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
            <Link href="/">
              <a className="flex space-x-1 text-white font-montserrat font-bold text-2xl mb-6">
                <span className="bg-primary-yellow-light text-dark px-2">GAME</span>
                <span className="bg-primary-red-light px-2">ON</span>
              </a>
            </Link>
            <p className="text-gray-400 mb-6">
              Creating positive change through the power of sports in communities around the world.
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
            <h3 className="font-montserrat font-bold text-xl mb-6">Programs</h3>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.name}>
                  <a 
                    href={program.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {program.name}
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
                <span className="text-gray-400">123 Sports Way, Athleticsville, AS 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary-yellow-light flex-shrink-0" />
                <span className="text-gray-400">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary-yellow-light flex-shrink-0" />
                <span className="text-gray-400">info@gameon.org</span>
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
          <p>&copy; {new Date().getFullYear()} Game On. All rights reserved.</p>
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
