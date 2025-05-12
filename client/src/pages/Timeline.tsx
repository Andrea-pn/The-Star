import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import SectionHeading from "../components/SectionHeading";
import { Calendar, ArrowRight } from "lucide-react";

type TimelineEvent = {
  year: number;
  title: string;
  description: string;
  imageUrl: string;
  highlight?: boolean;
};

const timelineEvents: TimelineEvent[] = [
  {
    year: 2007,
    title: "The Star is Born",
    description: "The Star newspaper launched in Nairobi, providing Kenya with a fresh voice in journalism.",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    highlight: true
  },
  {
    year: 2010,
    title: "Digital Transformation Begins",
    description: "The Star launched its first website, extending its reach beyond print and embracing the digital revolution.",
    imageUrl: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: 2013,
    title: "Coverage of 2013 Elections",
    description: "Award-winning coverage of Kenya's general elections, cementing The Star's reputation for balanced political reporting.",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    highlight: true
  },
  {
    year: 2015,
    title: "Investigative Journalism Unit",
    description: "Launch of dedicated investigative journalism desk, uncovering corruption and championing accountability.",
    imageUrl: "https://images.unsplash.com/photo-1586892477838-2b96e85e0f96?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: 2018,
    title: "Award-Winning Coverage",
    description: "Multiple journalism awards including recognition for environmental reporting and human interest stories.",
    imageUrl: "https://images.unsplash.com/photo-1551667883-9cdab39dbd12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    highlight: true
  },
  {
    year: 2020,
    title: "Pandemic Reporting",
    description: "Essential COVID-19 coverage, including fact-checking initiatives to combat misinformation during the pandemic.",
    imageUrl: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: 2022,
    title: "Mobile App Launch",
    description: "Introduction of The Star mobile app, bringing news directly to Kenyans' smartphones with personalized features.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    year: 2025,
    title: "18th Anniversary",
    description: "Celebrating 18 years of trusted journalism and looking forward to the future of media in Kenya.",
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    highlight: true
  }
];

const ParallaxSection = ({ event, index }: { event: TimelineEvent, index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Create different parallax effects based on index
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    index % 2 === 0 ? [100, -100] : [-100, 100]
  );
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  
  const isEven = index % 2 === 0;
  
  return (
    <div 
      ref={ref} 
      className={`min-h-[80vh] flex items-center justify-center relative my-32 ${isEven ? 'flex-row-reverse' : ''}`}
    >
      {/* Background design element */}
      <motion.div 
        className={`absolute ${isEven ? 'left-0' : 'right-0'} h-[50vh] w-[50vw] bg-[hsl(var(--primary-yellow))] opacity-10 rounded-full blur-3xl`}
        style={{ y, scale }}
      />
      
      {/* Year marker - fixed in the middle */}
      <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
        <motion.div 
          style={{ scale, opacity }}
          className="font-montserrat font-black text-8xl opacity-10 text-[hsl(var(--primary-red))]"
        >
          {event.year}
        </motion.div>
      </div>
      
      {/* Event content */}
      <div className={`w-full md:w-5/12 ${isEven ? 'pr-4 md:pr-12' : 'pl-4 md:pl-12'} z-10`}>
        <motion.div 
          className={`bg-white p-6 md:p-8 rounded-xl shadow-xl ${event.highlight ? 'border-t-4 border-[hsl(var(--primary-red))]' : ''}`}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, isEven ? -50 : 50]), opacity }}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-montserrat font-bold text-xl md:text-2xl">{event.title}</h3>
            {event.highlight && (
              <span className="bg-[hsl(var(--primary-yellow))] text-xs font-bold py-1 px-2 rounded-full">
                Milestone
              </span>
            )}
          </div>
          
          <div className="flex items-center text-gray-500 mb-3">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{event.year}</span>
          </div>
          
          <p className="mb-6 text-gray-600">{event.description}</p>
          
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <img 
              src={event.imageUrl} 
              alt={event.title} 
              className="w-full h-52 md:h-64 object-cover rounded-md shadow-md" 
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <>
      <Helmet>
        <title>18 Year Timeline | The Star Kenya</title>
        <meta 
          name="description" 
          content="Explore The Star Kenya's 18-year journey through journalism, from our humble beginnings to becoming Kenya's trusted news source." 
        />
        <meta property="og:title" content="The Star Kenya - 18 Years of Journalism Timeline" />
        <meta property="og:description" content="From our founding in 2007 to today, discover how The Star has evolved and the major milestones in our journey of bringing trusted news to Kenyans." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      
      <div className="pt-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 py-12" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-block relative mb-4">
              <SectionHeading>
                OUR 18 YEAR JOURNEY
              </SectionHeading>
              <motion.div 
                className="absolute -z-10 -right-6 -top-6 w-16 h-16 rounded-full bg-[hsl(var(--primary-yellow))] opacity-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            </div>
            
            <p className="text-lg text-gray-600 mt-4">
              From our founding in 2007 to today, explore how The Star has evolved to become Kenya's trusted 
              source for news, analysis, and investigative journalism.
            </p>
            
            <motion.div 
              className="mt-8 flex justify-center space-x-1"
              style={{ opacity: opacityProgress }}
            >
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--primary-red))]"></span>
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--primary-yellow))]"></span>
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--primary-blue))]"></span>
            </motion.div>
          </motion.div>

          {/* Vertical line connecting the timeline */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 z-0" />
          
          {/* Timeline events with parallax effects */}
          <div className="space-y-12" ref={ref}>
            {timelineEvents.map((event, index) => (
              <ParallaxSection key={event.year} event={event} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-24 mb-12 relative"
          >
            <motion.div 
              className="absolute top-0 left-0 w-full h-full -z-10"
              style={{ y: backgroundY }}
            >
              <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-blue-100 opacity-30 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-red-100 opacity-30 blur-3xl" />
            </motion.div>
            
            <h3 className="font-montserrat font-bold text-3xl mb-4">The Journey Continues</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              As we celebrate our 18th anniversary, we look forward to continuing our mission of delivering trusted, 
              impactful journalism to Kenyans for many more years to come.
            </p>
            
            <motion.a
              href="/archives"
              className="inline-flex items-center px-6 py-3 bg-[hsl(var(--primary-blue))] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ y: -2, x: 2 }}
              whileTap={{ y: 0 }}
            >
              Explore Our Archives
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Timeline;