import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import SectionHeading from "../components/SectionHeading";
import { Calendar } from "lucide-react";

type TimelineEvent = {
  year: number;
  title: string;
  description: string;
  imageUrl: string;
};

const timelineEvents: TimelineEvent[] = [
  {
    year: 2007,
    title: "The Star is Born",
    description: "The Star newspaper launched in Nairobi, providing Kenya with a fresh voice in journalism.",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
    imageUrl: "https://images.unsplash.com/photo-1551667883-9cdab39dbd12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
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
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const Timeline = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

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
      
      <div className="pt-24 bg-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <SectionHeading>
              OUR 18 YEAR JOURNEY
            </SectionHeading>
            <p className="text-lg text-gray-600 mt-4">
              From our founding in 2007 to today, explore how The Star has evolved to become Kenya's trusted source for news, analysis, and investigative journalism.
            </p>
          </motion.div>

          <div className="relative" ref={ref}>
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={event.year}
                className={`relative flex items-center mb-24 ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Year bubble */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className="rounded-full bg-[hsl(var(--primary-yellow))] w-16 h-16 flex items-center justify-center font-montserrat font-bold shadow-lg">
                    {event.year}
                  </div>
                </div>
                
                {/* Content card */}
                <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                  <motion.div 
                    className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[hsl(var(--primary-red))]"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-montserrat font-bold text-xl mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.year}</span>
                    </div>
                    <p className="mb-4 text-gray-600">{event.description}</p>
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-48 object-cover rounded-md" 
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-12"
          >
            <h3 className="font-montserrat font-bold text-2xl mb-4">The Journey Continues</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              As we celebrate our 18th anniversary, we look forward to continuing our mission of delivering trusted, 
              impactful journalism to Kenyans for many more years to come.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Timeline;