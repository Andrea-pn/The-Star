import { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Calendar as CalendarIcon, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import SectionHeading from "../components/SectionHeading";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  category: "panel-discussion" | "exhibition" | "community" | "gala" | "workshop";
  isFeatured: boolean;
};

const anniversaryEvents: Event[] = [
  {
    id: 1,
    title: "18th Anniversary Gala",
    description: "Join us for an elegant evening celebrating 18 years of The Star's impact on Kenyan journalism. The night will feature distinguished speakers, awards, and entertainment showcasing Kenya's artistic talent.",
    date: "June 3, 2025",
    time: "7:00 PM - 11:00 PM",
    location: "Kenyatta International Convention Centre, Nairobi",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "gala",
    isFeatured: true
  },
  {
    id: 2,
    title: "The Evolution of Kenyan Media: Panel Discussion",
    description: "Industry experts and veteran journalists discuss the transformation of Kenya's media landscape over the past two decades, with special focus on The Star's role in shaping modern journalism.",
    date: "May 25, 2025",
    time: "2:00 PM - 4:30 PM",
    location: "University of Nairobi, Main Campus",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "panel-discussion",
    isFeatured: false
  },
  {
    id: 3,
    title: "18 Years of Headlines: Photo Exhibition",
    description: "A visual journey through 18 years of The Star's most impactful front pages and photojournalism. This exhibition showcases the stories that defined Kenya's history over nearly two decades.",
    date: "May 15-30, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Nairobi National Museum",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "exhibition",
    isFeatured: true
  },
  {
    id: 4,
    title: "Youth Journalism Workshop",
    description: "The Star's top journalists will mentor the next generation of reporters in this hands-on workshop. Participants will learn investigative techniques, ethical reporting, and digital journalism skills.",
    date: "June 10, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "The Star Media Centre, Westlands",
    imageUrl: "https://images.unsplash.com/photo-1520971081497-7aa8732346f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "workshop",
    isFeatured: false
  },
  {
    id: 5,
    title: "Community Cleanup & Tree Planting",
    description: "Join The Star team in giving back to the community. This environmental initiative demonstrates our commitment to Kenya's sustainable future. All materials provided, just bring your enthusiasm!",
    date: "June 5, 2025",
    time: "8:00 AM - 12:00 PM",
    location: "Karura Forest, Nairobi",
    imageUrl: "https://images.unsplash.com/photo-1552084117-56a987a8e322?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "community",
    isFeatured: false
  },
  {
    id: 6,
    title: "Digital Journalism Masterclass",
    description: "Learn from industry experts about the latest digital tools and techniques transforming journalism. This workshop is perfect for working journalists, students, and media enthusiasts.",
    date: "May 29, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "iHub, Kilimani",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "workshop",
    isFeatured: false
  },
  {
    id: 7,
    title: "The Star Readers' Forum",
    description: "An interactive session where our loyal readers meet with editors and reporters to discuss the future of news and share feedback. Help shape the next chapter of The Star's journey.",
    date: "June 12, 2025",
    time: "5:30 PM - 7:30 PM",
    location: "Sarova Stanley Hotel, Nairobi",
    imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "panel-discussion",
    isFeatured: false
  },
  {
    id: 8,
    title: "Anniversary Family Fun Day",
    description: "A day of celebration for The Star staff, their families, and our readers. Enjoy games, food, music, and activities for all ages as we celebrate 18 years of journalistic excellence.",
    date: "June 15, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Uhuru Gardens, Nairobi",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "community",
    isFeatured: true
  }
];

const Events = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Filter events based on category
  const filteredEvents = categoryFilter === "all" 
    ? anniversaryEvents 
    : anniversaryEvents.filter(event => event.category === categoryFilter);

  // Featured events for the hero section
  const featuredEvents = anniversaryEvents.filter(event => event.isFeatured);

  // Get unique categories for filter
  const categories = [...new Set(anniversaryEvents.map(event => event.category))];

  return (
    <>
      <Helmet>
        <title>18th Anniversary Events | The Star Kenya</title>
        <meta 
          name="description" 
          content="Join us in celebrating The Star Kenya's 18th anniversary with a series of special events, workshops, and community activities throughout May and June 2025." 
        />
        <meta property="og:title" content="The Star Kenya - 18th Anniversary Celebration Events" />
        <meta property="og:description" content="From gala dinners to journalism workshops and community initiatives, discover all the events marking The Star's 18 years of trusted journalism in Kenya." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      
      <div className="pt-20 bg-white">
        {/* Hero banner with featured events */}
        <div className="bg-[hsl(var(--primary-blue-light))] text-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto text-center mb-12"
            >
              <h1 className="font-montserrat font-black text-4xl md:text-5xl uppercase mb-4">
                ANNIVERSARY CELEBRATION
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Join us for a series of special events commemorating 18 years of The Star
              </p>
              <div className="flex justify-center">
                <motion.a
                  href="#all-events"
                  className="bg-white text-[hsl(var(--primary-blue))] font-montserrat font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  VIEW ALL EVENTS
                </motion.a>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {featuredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden text-gray-800"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="outline" className="bg-[hsl(var(--primary-yellow-light))] border-0 text-[hsl(var(--dark))] mb-2">
                      Featured Event
                    </Badge>
                    <h3 className="font-montserrat font-bold text-xl mb-2">{event.title}</h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-500 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                    <Button 
                      className="w-full bg-[hsl(var(--primary-blue))]"
                    >
                      LEARN MORE
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* All events section */}
        <div className="container mx-auto px-4 py-16" id="all-events" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <SectionHeading>
              ALL CELEBRATION EVENTS
            </SectionHeading>
            <p className="text-lg text-gray-600 mt-4">
              Browse our complete lineup of anniversary events and activities taking place throughout May and June 2025.
            </p>
          </motion.div>

          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-montserrat font-bold">Upcoming Events</h2>
            <div className="flex items-center">
              <Filter className="mr-2 text-gray-500" />
              <Select
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + (index * 0.05) }}
                whileHover={{ y: -5 }}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                      {event.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </Badge>
                    {event.isFeatured && (
                      <Badge variant="outline" className="bg-[hsl(var(--primary-yellow-light))] border-0 text-[hsl(var(--dark))]">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-montserrat font-bold text-xl mb-3">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                  <div className="space-y-2 text-sm text-gray-500 mb-5">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2 text-[hsl(var(--primary-blue))]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-[hsl(var(--primary-blue))]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[hsl(var(--primary-blue))]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-[hsl(var(--primary-blue))]"
                  >
                    LEARN MORE
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-500 text-xl">No events found in this category.</p>
            </motion.div>
          )}
        </div>

        {/* Call to action section */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="font-montserrat font-bold text-3xl mb-4">Host Your Own Celebration</h2>
              <p className="text-lg text-gray-600 mb-8">
                Want to organize your own event to celebrate The Star's 18th anniversary? 
                Whether it's a reading club, discussion group, or community initiative, 
                we'd love to support your event and add it to our calendar.
              </p>
              <motion.a
                href="#contact"
                className="inline-block bg-[hsl(var(--primary-red))] text-white font-montserrat font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                PROPOSE AN EVENT
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Calendar Download */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Calendar className="h-16 w-16 text-[hsl(var(--primary-blue))]" />
            </div>
            <h2 className="font-montserrat font-bold text-2xl mb-4">Never Miss an Event</h2>
            <p className="text-lg text-gray-600 mb-8">
              Download our complete calendar of anniversary events to your device. 
              Available in multiple formats for your convenience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-[hsl(var(--primary-blue))] text-[hsl(var(--primary-blue))]">
                Google Calendar
              </Button>
              <Button variant="outline" className="border-[hsl(var(--primary-blue))] text-[hsl(var(--primary-blue))]">
                Apple Calendar
              </Button>
              <Button variant="outline" className="border-[hsl(var(--primary-blue))] text-[hsl(var(--primary-blue))]">
                Outlook Calendar
              </Button>
              <Button variant="outline" className="border-[hsl(var(--primary-blue))] text-[hsl(var(--primary-blue))]">
                Download PDF
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Events;