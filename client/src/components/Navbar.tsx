import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const links = [
  { name: "HOME", href: "#hero" },
  { name: "LEVELLING THE FIELD", href: "#levelling" },
  { name: "BEYOND THE GAME", href: "#beyond" },
  { name: "CHAMPIONS OF CHANGE", href: "#champions" },
  { name: "IMPACT", href: "#impact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();
  const isMobile = useIsMobile();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to sections
  const handleScroll = (href: string) => {
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    
    if (element) {
      // Close mobile menu if open
      setIsOpen(false);
      
      // Scroll to element
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-white bg-opacity-95 shadow-md transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="flex space-x-1 text-dark font-montserrat font-bold text-2xl">
              <span className="bg-[hsl(var(--primary-yellow))] px-2">GAME</span>
              <span className="bg-[hsl(var(--primary-red))] text-white px-2">ON</span>
            </a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScroll(link.href)}
              className="nav-link font-montserrat font-semibold"
            >
              {link.name}
            </button>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white w-full absolute top-full left-0 shadow-md overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleScroll(link.href)}
                  className="py-2 font-montserrat font-semibold border-b border-gray-200 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
