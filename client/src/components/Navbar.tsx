import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Search, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const homeLinks = [
  { name: "Home", href: "#hero" },
  { name: "Our Impact", href: "#levelling" },
  { name: "Beyond The News", href: "#beyond" },
  { name: "Journalist Excellence", href: "#champions" },
  { name: "Your Story", href: "#impact" },
];

const siteLinks = [
  { name: "Home", href: "/" },
  { name: "Timeline", href: "/timeline" },
  { name: "Journalists", href: "/journalists" },
  { name: "Events", href: "/events" },
  { name: "Featured Stories", href: "/featured-stories" },
  { name: "Archives", href: "/archives" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const isMobile = useIsMobile();
  
  // Determine if we're on the home page
  const isHomePage = location === "/";
  
  // Use the appropriate links based on the current page
  const links = isHomePage ? homeLinks : siteLinks;

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

  // Handle link navigation
  const handleNavigation = (href: string) => {
    // Close mobile menu if open
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      // Handle smooth scroll for section links on home page
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: "smooth",
        });
      } else if (!isHomePage) {
        // If we're not on the home page but got a # link, go to home first
        setLocation('/');
        // We'll need to scroll after navigation, but that's tricky
      }
    } else {
      // For regular page links
      setLocation(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm py-2 shadow-md" : "bg-white/80 py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={() => handleNavigation("/")}
            className="flex items-center space-x-1 cursor-pointer group"
          >
            <div className="flex space-x-1 font-montserrat font-bold text-2xl transition-transform group-hover:scale-105 duration-300">
              <span className="bg-[hsl(var(--primary-yellow))] px-2 py-1 rounded-l">THE</span>
              <span className="bg-[hsl(var(--primary-red))] text-white px-2 py-1">STAR</span>
              <div className="relative">
                <span className="bg-[hsl(var(--primary-blue))] text-white px-2 py-1 rounded-r">18</span>
                <Star className="absolute -top-2 -right-2 h-4 w-4 text-white fill-white animate-pulse" />
              </div>
            </div>
            <span className="hidden sm:inline-block text-sm font-semibold ml-2 text-gray-600">
              CELEBRATING JOURNALISM
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className={`relative px-4 py-2 font-medium text-sm transition-all duration-200 
                  hover:text-[hsl(var(--primary-red))] group overflow-hidden rounded-md
                  ${location === link.href || (isHomePage && link.href === "#hero" && location === "/") 
                    ? "text-[hsl(var(--primary-red))]" 
                    : "text-gray-800"}`}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[hsl(var(--primary-red))] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            ))}
            
            <div className="pl-4 flex items-center space-x-3">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "200px", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Search articles..."
                      className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary-blue))] text-sm"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 mr-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-700" />
            </button>
            
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-5 w-5 text-gray-700" />
              ) : (
                <Menu className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
        
        {/* Search bar for mobile */}
        <AnimatePresence>
          {isSearchOpen && isMobile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 pb-3"
            >
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full py-2 px-3 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary-blue))] text-sm"
                autoFocus
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg w-full absolute left-0 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-3 flex flex-col divide-y divide-gray-100">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.href)}
                  className={`py-3 px-2 text-left flex justify-between items-center
                    ${location === link.href || (isHomePage && link.href === "#hero" && location === "/") 
                      ? "text-[hsl(var(--primary-red))] font-semibold" 
                      : "text-gray-800"}`}
                >
                  <span>{link.name}</span>
                  <ChevronDown className="h-4 w-4 opacity-70" />
                </button>
              ))}
              
              <div className="mt-4 pt-4 pb-2 flex justify-center space-x-6">
                <a href="https://twitter.com/TheStarKenya" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[hsl(var(--primary-blue))]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="https://www.facebook.com/TheStarKenya/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[hsl(var(--primary-blue))]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/thestarnewspaper/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[hsl(var(--primary-blue))]">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;