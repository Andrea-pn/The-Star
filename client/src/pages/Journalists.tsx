import { useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Search, X, Camera, Award, BookOpen, Mail, Twitter, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import SectionHeading from "../components/SectionHeading";

type SocialMedia = {
  twitter?: string;
  linkedin?: string;
  email?: string;
};

type Journalist = {
  id: number;
  name: string;
  title: string;
  department: string;
  bio: string;
  imageUrl: string;
  achievements: string[];
  category: "editors" | "reporters" | "photographers" | "columnists";
  featured?: boolean;
  specialty?: string[];
  yearsAtTheStar?: number;
  socialMedia?: SocialMedia;
  featuredStories?: {
    title: string;
    url: string;
  }[];
};

const journalists: Journalist[] = [
  {
    id: 1,
    name: "Sarah Kimani",
    title: "Editor-in-Chief",
    department: "Editorial",
    bio: "With over 20 years of experience in journalism, Sarah has led The Star's editorial team since 2015, guiding the newspaper through its digital transformation and maintaining its commitment to fact-based reporting.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Kenya Media Council Award for Excellence in Leadership", "International Press Institute Fellow", "Harvard Nieman Fellowship"],
    category: "editors",
    featured: true,
    specialty: ["Political Analysis", "Media Ethics", "Investigative Journalism"],
    yearsAtTheStar: 12,
    socialMedia: {
      twitter: "@sarahkimani",
      linkedin: "sarah-kimani",
      email: "sarah.kimani@thestar.co.ke"
    },
    featuredStories: [
      { title: "The Future of Digital Journalism in Kenya", url: "/archives" },
      { title: "Ethics in the Era of Fake News", url: "/archives" },
      { title: "18 Years of The Star: An Editor's Perspective", url: "/archives" }
    ]
  },
  {
    id: 2,
    name: "David Ochieng",
    title: "Senior Investigative Reporter",
    department: "Investigations",
    bio: "David's groundbreaking reports have exposed corruption and influenced public policy in Kenya. His meticulous research and compelling storytelling have earned him numerous accolades.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Africa Investigative Journalism Award", "Kenya Editors Guild Recognition", "CNN African Journalist Award"],
    category: "reporters",
    featured: true,
    specialty: ["Anti-corruption", "Government Accountability", "Data Journalism"],
    yearsAtTheStar: 9,
    socialMedia: {
      twitter: "@davidochieng",
      linkedin: "david-ochieng",
      email: "david.ochieng@thestar.co.ke"
    },
    featuredStories: [
      { title: "The Highways Corruption Scandal: An Investigation", url: "/archives" },
      { title: "Following the Money: Public Procurement", url: "/archives" }
    ]
  },
  {
    id: 3,
    name: "Mercy Wanjiru",
    title: "Chief Photographer",
    department: "Visual Media",
    bio: "Mercy's powerful images have documented Kenya's most pivotal moments over the past decade. Her focus on human stories behind the headlines brings depth to The Star's visual journalism.",
    imageUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Kenya Photography Awards", "East Africa Visual Journalist of the Year", "World Press Photo Nominee"],
    category: "photographers",
    specialty: ["Photojournalism", "Documentary", "Visual Storytelling"],
    yearsAtTheStar: 10,
    socialMedia: {
      twitter: "@mercywanjiru",
      linkedin: "mercy-wanjiru",
      email: "mercy.wanjiru@thestar.co.ke"
    },
    featuredStories: [
      { title: "Faces of Resilience: Kenya During Crisis", url: "/archives" },
      { title: "The Unseen Kenya: Photo Essay", url: "/archives" }
    ]
  },
  {
    id: 4,
    name: "James Kariuki",
    title: "Political Columnist",
    department: "Opinion",
    bio: "James's insightful analysis of Kenyan politics has made his weekly column a must-read. His balanced perspective and historical knowledge provide readers with context beyond the daily news cycle.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Political Commentary Award", "Distinguished Columnist Recognition", "Author of 'Kenya's Political Landscape'"],
    category: "columnists",
    specialty: ["Kenyan Politics", "East African Affairs", "Political History"],
    yearsAtTheStar: 15,
    socialMedia: {
      twitter: "@jameskariuki",
      linkedin: "james-kariuki",
      email: "james.kariuki@thestar.co.ke"
    },
    featuredStories: [
      { title: "The Evolution of Kenya's Political Parties", url: "/archives" },
      { title: "Constitutional Reforms: A Decade Later", url: "/archives" }
    ]
  },
  {
    id: 5,
    name: "Paul Mwangi",
    title: "Sports Editor",
    department: "Sports",
    bio: "Paul has transformed The Star's sports coverage, expanding beyond traditional sports to highlight Kenya's athletes across all disciplines. His editorial vision celebrates both elite athletes and grassroots sports development.",
    imageUrl: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Sports Press Association Award", "Olympics Coverage Recognition", "Football Association Media Excellence"],
    category: "editors",
    specialty: ["Athletics", "Football", "Olympic Sports"],
    yearsAtTheStar: 8,
    socialMedia: {
      twitter: "@paulmwangi",
      linkedin: "paul-mwangi",
      email: "paul.mwangi@thestar.co.ke"
    },
    featuredStories: [
      { title: "Kenyan Athletes: The Road to Olympic Gold", url: "/archives" },
      { title: "Grassroots Sports: Building Kenya's Future", url: "/archives" }
    ]
  },
  {
    id: 6,
    name: "Lucy Njeri",
    title: "Health Reporter",
    department: "News",
    bio: "Lucy specializes in health reporting, translating complex medical information into accessible stories. Her coverage of healthcare issues has informed public health policy discussions and raised awareness on critical health concerns.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Health Journalism Excellence Award", "Pandemic Reporting Recognition", "Public Health Media Champion"],
    category: "reporters",
    specialty: ["Public Health", "Medical Research", "Health Policy"],
    yearsAtTheStar: 6,
    socialMedia: {
      twitter: "@lucynjeri",
      linkedin: "lucy-njeri",
      email: "lucy.njeri@thestar.co.ke"
    },
    featuredStories: [
      { title: "Healthcare Access in Rural Kenya", url: "/archives" },
      { title: "Fighting Misinformation During Health Crises", url: "/archives" }
    ]
  },
  {
    id: 7,
    name: "Michael Otieno",
    title: "Environmental Photojournalist",
    department: "Visual Media",
    bio: "Michael's environmental photography has documented Kenya's conservation efforts and climate challenges. His compelling images have raised awareness about environmental issues facing the country.",
    imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Environmental Photography Award", "National Geographic Recognition", "Climate Journalism Prize"],
    category: "photographers",
    specialty: ["Environmental Photography", "Wildlife Conservation", "Climate Change"],
    yearsAtTheStar: 7,
    socialMedia: {
      twitter: "@michaelotieno",
      linkedin: "michael-otieno",
      email: "michael.otieno@thestar.co.ke"
    },
    featuredStories: [
      { title: "Kenya's Changing Landscapes: A Photo Documentary", url: "/archives" },
      { title: "Conservation Heroes: Visual Profiles", url: "/archives" }
    ]
  },
  {
    id: 8,
    name: "Jane Auma",
    title: "Technology Columnist",
    department: "Opinion",
    bio: "Jane bridges the gap between technology and society in her popular column. Her analysis of tech trends and their impact on Kenyan society has made complex technological changes accessible to general readers.",
    imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Digital Innovation Commentary Award", "Tech Journalism Excellence", "Women in Technology Media Recognition"],
    category: "columnists",
    specialty: ["Digital Transformation", "Tech Accessibility", "Innovation Policy"],
    yearsAtTheStar: 5,
    socialMedia: {
      twitter: "@janeauma",
      linkedin: "jane-auma",
      email: "jane.auma@thestar.co.ke"
    },
    featuredStories: [
      { title: "Digital Literacy in Kenya: The Path Forward", url: "/archives" },
      { title: "Bridging Kenya's Digital Divide", url: "/archives" }
    ]
  }
];

const JournalistModal = ({ journalist, onClose }: { journalist: Journalist, onClose: () => void }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 relative">
            <img 
              src={journalist.imageUrl} 
              alt={journalist.name}
              className="w-full h-full object-cover aspect-[3/4]" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="font-montserrat font-bold text-3xl mb-1">{journalist.name}</h3>
              <p className="text-gray-200 text-lg mb-4">{journalist.title}</p>
              
              <div className="flex space-x-3 mb-4">
                {journalist.socialMedia?.twitter && (
                  <a 
                    href={`https://twitter.com/${journalist.socialMedia.twitter}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
                  >
                    <Twitter size={18} />
                  </a>
                )}
                {journalist.socialMedia?.linkedin && (
                  <a 
                    href={`https://linkedin.com/in/${journalist.socialMedia.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {journalist.socialMedia?.email && (
                  <a 
                    href={`mailto:${journalist.socialMedia.email}`} 
                    className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200"
                  >
                    <Mail size={18} />
                  </a>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {journalist.specialty?.map((skill, index) => (
                  <span key={index} className="text-xs bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:w-3/5 p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center text-gray-600 mb-1">
                  <span className="font-medium">{journalist.department}</span>
                  <span className="mx-2">•</span>
                  <span>{journalist.yearsAtTheStar} years at The Star</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {journalist.category === "photographers" && (
                    <Badge variant="outline" className="flex items-center">
                      <Camera className="mr-1 h-3 w-3" /> Photographer
                    </Badge>
                  )}
                  {journalist.featured && (
                    <Badge className="bg-[hsl(var(--primary-yellow))] text-black hover:bg-[hsl(var(--primary-yellow))]">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">About</h4>
              <p className="text-gray-700 leading-relaxed">{journalist.bio}</p>
            </div>
            
            {journalist.achievements.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-[hsl(var(--primary-red))]" /> 
                  Achievements
                </h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {journalist.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {journalist.featuredStories && journalist.featuredStories.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-[hsl(var(--primary-blue))]" /> 
                  Featured Stories
                </h4>
                <div className="space-y-3">
                  {journalist.featuredStories.map((story, index) => (
                    <a
                      key={index}
                      href={story.url}
                      className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      <p className="font-medium">{story.title}</p>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Parallax image component
const ParallaxJournalistImage = ({ journalist, onClick }: { journalist: Journalist, onClick: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  return (
    <motion.div 
      ref={ref}
      className="w-full h-full relative cursor-pointer overflow-hidden group"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <motion.div 
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"
      />
      
      <motion.img
        src={journalist.imageUrl}
        alt={journalist.name}
        className="w-full h-64 object-cover"
        style={{ y, scale }}
      />
      
      <motion.div
        className="absolute bottom-0 w-full p-4 text-white z-20 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
      >
        <div className="font-medium">View Profile</div>
      </motion.div>
    </motion.div>
  );
};

const Journalists = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedJournalist, setSelectedJournalist] = useState<Journalist | null>(null);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Animation values
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Filter journalists based on search term and category
  const filteredJournalists = journalists.filter(journalist => {
    const matchesSearch = journalist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         journalist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         journalist.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeTab === "all" || journalist.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Our Journalists | The Star Kenya</title>
        <meta 
          name="description" 
          content="Meet the talented journalists behind The Star Kenya's 18 years of excellence in reporting, photography, and editorial leadership." 
        />
        <meta property="og:title" content="The Star Kenya - Our Award-Winning Journalists" />
        <meta property="og:description" content="Discover the dedicated team who bring you Kenya's most trusted news coverage. From investigative reporters to photojournalists, meet The Star's talented professionals." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      
      <div className="pt-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 py-12 relative" ref={containerRef}>
          {/* Background animation elements */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10"
            style={{ y: bgY }}
          >
            <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-red-100 opacity-30 blur-3xl" />
            <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-blue-100 opacity-30 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-yellow-100 opacity-20 blur-3xl" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <div className="inline-block relative mb-4">
              <SectionHeading>
                OUR JOURNALISTS
              </SectionHeading>
              <motion.div 
                className="absolute -z-10 -right-6 -top-6 w-16 h-16 rounded-full bg-[hsl(var(--primary-yellow))] opacity-20"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            </div>
            
            <p className="text-lg text-gray-600 mt-4">
              Meet the talented team who bring you Kenya's most trusted news coverage. 
              From investigative reporters to photojournalists, these are the faces behind The Star's journalism excellence.
            </p>
            
            <motion.div 
              className="mt-8 flex justify-center space-x-1"
              style={{ opacity }}
            >
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--primary-red))]"></span>
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--primary-yellow))]"></span>
              <span className="w-3 h-3 rounded-full bg-[hsl(var(--primary-blue))]"></span>
            </motion.div>
          </motion.div>

          <div className="max-w-6xl mx-auto" ref={(el) => {
            // Use callback ref for intersection observer 
            if (el) ref(el);
          }}>
            <motion.div 
              className="flex flex-col sm:flex-row justify-between mb-10 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search journalists..."
                  className="pl-10 py-6 border-gray-300 focus:border-[hsl(var(--primary-blue))]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="editors">Editors</TabsTrigger>
                  <TabsTrigger value="reporters">Reporters</TabsTrigger>
                  <TabsTrigger value="photographers">Photographers</TabsTrigger>
                  <TabsTrigger value="columnists">Columnists</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredJournalists.map((journalist, index) => (
                <motion.div
                  key={journalist.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + (index * 0.05) }}
                  layout
                >
                  <div className="h-64 overflow-hidden">
                    <ParallaxJournalistImage 
                      journalist={journalist} 
                      onClick={() => setSelectedJournalist(journalist)} 
                    />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-montserrat font-bold text-lg mb-1">{journalist.name}</h3>
                        <p className="text-gray-600 text-sm">{journalist.title}</p>
                      </div>
                      
                      {journalist.featured && (
                        <Badge className="bg-[hsl(var(--primary-yellow))] text-black hover:bg-[hsl(var(--primary-yellow))]">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-3 mb-4">
                      <p className="text-gray-600 text-sm line-clamp-2">{journalist.bio}</p>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedJournalist(journalist)}
                    >
                      View Profile
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredJournalists.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-500 text-lg">No journalists found matching your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setActiveTab("all");
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedJournalist && (
          <JournalistModal 
            journalist={selectedJournalist}
            onClose={() => setSelectedJournalist(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default Journalists;