import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import SectionHeading from "../components/SectionHeading";

type Journalist = {
  id: number;
  name: string;
  title: string;
  department: string;
  bio: string;
  imageUrl: string;
  achievements: string[];
  category: "editors" | "reporters" | "photographers" | "columnists";
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
    category: "editors"
  },
  {
    id: 2,
    name: "David Ochieng",
    title: "Senior Investigative Reporter",
    department: "Investigations",
    bio: "David's groundbreaking reports have exposed corruption and influenced public policy in Kenya. His meticulous research and compelling storytelling have earned him numerous accolades.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Africa Investigative Journalism Award", "Kenya Editors Guild Recognition", "CNN African Journalist Award"],
    category: "reporters"
  },
  {
    id: 3,
    name: "Mercy Wanjiru",
    title: "Chief Photographer",
    department: "Visual Media",
    bio: "Mercy's powerful images have documented Kenya's most pivotal moments over the past decade. Her focus on human stories behind the headlines brings depth to The Star's visual journalism.",
    imageUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["World Press Photo Award", "Kenya Photography Awards", "East African Photojournalism Prize"],
    category: "photographers"
  },
  {
    id: 4,
    name: "James Mwangi",
    title: "Political Editor",
    department: "Politics",
    bio: "James has covered every major political event in Kenya since 2010. His analysis and insider reporting have made him one of the country's most respected political journalists.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Political Reporting Award", "Parliamentary Press Recognition", "Election Coverage Excellence Award"],
    category: "editors"
  },
  {
    id: 5,
    name: "Lisa Adhiambo",
    title: "Features Writer",
    department: "Features & Lifestyle",
    bio: "Lisa's human interest stories have captured the diverse experiences of Kenyans, from rural communities to urban centers. Her empathetic approach brings richness to The Star's features section.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Lifestyle Journalism Award", "Arts & Culture Media Recognition", "Human Interest Story of the Year"],
    category: "reporters"
  },
  {
    id: 6,
    name: "Thomas Kariuki",
    title: "Economics Columnist",
    department: "Business",
    bio: "Thomas provides insightful analysis on Kenya's economy and business landscape. His weekly column is essential reading for business leaders and policymakers across the country.",
    imageUrl: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Business Journalist of the Year", "Financial Analysis Excellence Award", "Economics Commentary Prize"],
    category: "columnists"
  },
  {
    id: 7,
    name: "Ruth Nyambura",
    title: "Environmental Reporter",
    department: "Environmental Desk",
    bio: "Ruth has pioneered The Star's climate coverage, bringing critical environmental issues to the forefront of public discourse in Kenya. Her reporting has influenced environmental policy.",
    imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Environmental Journalism Award", "Climate Reporting Grant", "Conservation Media Prize"],
    category: "reporters"
  },
  {
    id: 8,
    name: "Caleb Mwanzi",
    title: "Sports Photographer",
    department: "Sports",
    bio: "Caleb has captured the most exciting moments in Kenyan sports for over a decade. His dynamic images bring sporting events to life for The Star's readers.",
    imageUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    achievements: ["Sports Photography Award", "Olympic Coverage Recognition", "Action Photography Prize"],
    category: "photographers"
  }
];

const Journalists = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
      
      <div className="pt-24 bg-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-10"
          >
            <SectionHeading>
              OUR JOURNALISTS
            </SectionHeading>
            <p className="text-lg text-gray-600 mt-4">
              Meet the talented team who bring you Kenya's most trusted news coverage. 
              From investigative reporters to photojournalists, these are the faces behind The Star's journalism excellence.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto" ref={ref}>
            <motion.div 
              className="flex flex-col sm:flex-row justify-between mb-8 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search journalists..."
                  className="pl-10 py-6"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJournalists.map((journalist, index) => (
                <motion.div
                  key={journalist.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100"
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + (index * 0.05) }}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={journalist.imageUrl} 
                      alt={journalist.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--primary-yellow-light))] text-[hsl(var(--dark))] text-xs font-bold mb-3">
                      {journalist.department}
                    </div>
                    <h3 className="font-montserrat font-bold text-xl mb-1">{journalist.name}</h3>
                    <p className="text-[hsl(var(--primary-red))] font-semibold mb-3">{journalist.title}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{journalist.bio}</p>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Notable Achievements:</h4>
                      <ul className="pl-5 list-disc text-sm text-gray-600 space-y-1">
                        {journalist.achievements.slice(0, 2).map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredJournalists.length === 0 && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-500 text-xl">No journalists found matching your search.</p>
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-16 max-w-3xl mx-auto"
          >
            <h3 className="font-montserrat font-bold text-2xl mb-4">Join Our Team</h3>
            <p className="text-lg text-gray-600">
              The Star is always looking for talented journalists to join our team. 
              If you're passionate about delivering impactful stories to Kenyans, 
              we'd love to hear from you.
            </p>
            <motion.a
              href="#careers"
              className="inline-block mt-6 bg-[hsl(var(--primary-blue))] text-white font-montserrat font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW CAREER OPPORTUNITIES
            </motion.a>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Journalists;