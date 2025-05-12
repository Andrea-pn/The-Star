import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Search, Calendar, Tag, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import Navbar from "../components/Navbar";
import Footer from "../sections/Footer";
import SectionHeading from "../components/SectionHeading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { fetchPosts, fetchCategories, WPPost, WPCategory, getFeaturedImageUrl, createExcerpt } from "../services/wordpress-api";
import { useQuery } from "@tanstack/react-query";

type HeadlineArchive = {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  category: string;
  description: string;
  url: string;
  isSignificant: boolean;
  year: number;
};

// Form schema for archive search
const searchSchema = z.object({
  query: z.string().optional(),
  year: z.string().optional(),
  category: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

// This will be populated with real data from WordPress, but we'll keep it for fallback
const archiveHeadlines: HeadlineArchive[] = [
  {
    id: 1,
    title: "The Star Launches: A New Voice for Kenya",
    date: "July 2, 2007",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Milestone",
    description: "The first edition of The Star hits newsstands across Kenya, promising independent journalism and a fresh perspective on national issues.",
    url: "#",
    isSignificant: true,
    year: 2007
  },
  {
    id: 2,
    title: "Kenya's Post-Election Crisis: Special Coverage",
    date: "January 15, 2008",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Politics",
    description: "The Star provides in-depth reporting on the unfolding post-election crisis, with on-the-ground coverage from affected communities.",
    url: "#",
    isSignificant: true,
    year: 2008
  },
  {
    id: 3,
    title: "New Constitution: Kenya's Fresh Start",
    date: "August 28, 2010",
    imageUrl: "https://images.unsplash.com/photo-1589262804704-c5aa9e6def89?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Politics",
    description: "Special edition covering the promulgation of Kenya's new constitution, with analysis of its implications for governance and citizens' rights.",
    url: "#",
    isSignificant: true,
    year: 2010
  },
  {
    id: 4,
    title: "The Star Launches Digital Subscription Service",
    date: "March 10, 2013",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Business",
    description: "The newspaper enters the digital age with a comprehensive online platform, offering premium content to subscribers across Kenya and globally.",
    url: "#",
    isSignificant: false,
    year: 2013
  },
  {
    id: 5,
    title: "Westgate Attack: Kenya in Mourning",
    date: "September 22, 2013",
    imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "National Security",
    description: "Breaking news coverage and aftermath of the Westgate Mall terrorist attack, with testimonies from survivors and analysis of security implications.",
    url: "#",
    isSignificant: true,
    year: 2013
  },
  {
    id: 6,
    title: "Obama Returns to Kenya: Presidential Visit",
    date: "July 25, 2015",
    imageUrl: "https://images.unsplash.com/photo-1541726260-e6078c228bd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "International",
    description: "Comprehensive coverage of U.S. President Barack Obama's historic visit to Kenya, including exclusive interviews and analysis of U.S.-Kenya relations.",
    url: "#",
    isSignificant: true,
    year: 2015
  },
  {
    id: 7,
    title: "The Star's Investigative Series Wins Global Award",
    date: "November 5, 2016",
    imageUrl: "https://images.unsplash.com/photo-1590212151175-e58afe0b41d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Media",
    description: "The newspaper's investigative team receives international recognition for its series on environmental corruption affecting Kenya's water resources.",
    url: "#",
    isSignificant: false,
    year: 2016
  },
  {
    id: 8,
    title: "Supreme Court Nullifies Presidential Election",
    date: "September 1, 2017",
    imageUrl: "https://images.unsplash.com/photo-1575505586569-9e6133567f9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Politics",
    description: "Breaking news and analysis of the Supreme Court's unprecedented decision to nullify Kenya's presidential election, with legal and political perspectives.",
    url: "#",
    isSignificant: true,
    year: 2017
  },
  {
    id: 9,
    title: "Handshake: Kenyatta and Odinga Unite",
    date: "March 10, 2018",
    imageUrl: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Politics",
    description: "Exclusive coverage of the historic handshake between President Uhuru Kenyatta and opposition leader Raila Odinga, marking a new chapter in Kenyan politics.",
    url: "#",
    isSignificant: true,
    year: 2018
  },
  {
    id: 10,
    title: "COVID-19 Reaches Kenya: First Case Confirmed",
    date: "March 13, 2020",
    imageUrl: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Health",
    description: "Breaking news on Kenya's first confirmed coronavirus case, with health guidelines and government containment measures explained.",
    url: "#",
    isSignificant: true,
    year: 2020
  },
  {
    id: 11,
    title: "BBI Ruling: Court Blocks Constitutional Changes",
    date: "May 14, 2021",
    imageUrl: "https://images.unsplash.com/photo-1589894404892-7310b92ea7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Politics",
    description: "Analysis of the High Court's landmark ruling declaring the Building Bridges Initiative unconstitutional, with implications for Kenya's political landscape.",
    url: "#",
    isSignificant: true,
    year: 2021
  },
  {
    id: 12,
    title: "The Star Celebrates 15 Years of Journalism",
    date: "July 2, 2022",
    imageUrl: "https://images.unsplash.com/photo-1612621445311-2fee1483aab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Milestone",
    description: "Special anniversary edition reflecting on 15 years of The Star's impact on Kenyan journalism and society, featuring testimonials from readers and public figures.",
    url: "#",
    isSignificant: true,
    year: 2022
  },
  {
    id: 13,
    title: "Kenya's New Government: Ruto Takes Office",
    date: "September 13, 2022",
    imageUrl: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Politics",
    description: "Comprehensive coverage of William Ruto's inauguration as Kenya's fifth president, with analysis of campaign promises and cabinet appointments.",
    url: "#",
    isSignificant: true,
    year: 2022
  },
  {
    id: 14,
    title: "Climate Crisis: Kenya's Worst Drought in Decades",
    date: "April 5, 2023",
    imageUrl: "https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Environment",
    description: "In-depth reporting on Kenya's devastating drought, its impact on communities, and the government's response to the climate emergency.",
    url: "#",
    isSignificant: false,
    year: 2023
  },
  {
    id: 15,
    title: "The Star Launches New Mobile App",
    date: "January 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Technology",
    description: "The Star introduces its next-generation mobile app, featuring personalized news feeds, audio articles, and enhanced multimedia content for subscribers.",
    url: "#",
    isSignificant: false,
    year: 2024
  },
  {
    id: 16,
    title: "The Star Looks to the Future: 18th Anniversary",
    date: "May 1, 2025",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Milestone",
    description: "Special edition announcing The Star's 18th anniversary celebration plans and reflecting on the newspaper's continued commitment to quality journalism.",
    url: "#",
    isSignificant: true,
    year: 2025
  }
];

const Archives = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  const [searchResults, setSearchResults] = useState<HeadlineArchive[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<{
    search?: string;
    categories?: number[];
  }>({});

  // Fetch posts from WordPress API
  const { data: postsData, isLoading: isLoadingPosts, error: postsError } = useQuery({
    queryKey: ['wp-posts', page, searchParams],
    queryFn: async () => {
      const result = await fetchPosts({
        page,
        per_page: 12,
        search: searchParams.search,
        categories: searchParams.categories,
      });
      return result;
    }
  });

  // Fetch categories from WordPress API
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['wp-categories'],
    queryFn: async () => {
      return await fetchCategories();
    }
  });

  // Extract unique years from posts
  const getYearsFromPosts = (posts: WPPost[]) => {
    if (!posts) return [];
    const years = new Set<number>();
    posts.forEach(post => {
      const year = new Date(post.date).getFullYear();
      years.add(year);
    });
    return Array.from(years).sort((a, b) => b - a);
  };

  // Convert WordPress posts to our HeadlineArchive format
  useEffect(() => {
    if (postsData?.posts) {
      const convertedPosts: HeadlineArchive[] = postsData.posts.map(post => {
        const date = new Date(post.date);
        const year = date.getFullYear();
        const formattedDate = date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        // Get category from embedded data
        let category = "News";
        if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0].length > 0) {
          category = post._embedded['wp:term'][0][0].name;
        }
        
        // Get featured image
        const imageUrl = getFeaturedImageUrl(post) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
        
        // Extract excerpt
        const description = post.excerpt?.rendered 
          ? createExcerpt(post.excerpt.rendered)
          : createExcerpt(post.content.rendered);
        
        return {
          id: post.id,
          title: post.title.rendered,
          date: formattedDate,
          imageUrl,
          category,
          description,
          url: post.link,
          isSignificant: false, // We could determine this based on specific categories or tags
          year
        };
      });
      
      setSearchResults(convertedPosts);
    } else if (!postsError) {
      // If we don't have data yet and no error, use the sample data as initial state
      setSearchResults(archiveHeadlines);
    }
  }, [postsData, postsError]);

  // Handle errors
  useEffect(() => {
    if (postsError) {
      toast({
        title: "Error loading articles",
        description: "Could not load articles from The Star. Using sample archives instead.",
        variant: "destructive"
      });
      // Fallback to sample data
      setSearchResults(archiveHeadlines);
    }
  }, [postsError, toast]);

  // Get categories and years for filters
  const wpCategories = categoriesData || [];
  const wpYears = postsData ? getYearsFromPosts(postsData.posts) : [];
  
  // Fallback to static data if API fails
  const years = wpYears.length > 0 ? wpYears : [...new Set(archiveHeadlines.map(headline => headline.year))].sort((a, b) => b - a);
  const categories = wpCategories.length > 0 ? wpCategories.map(c => c.name) : [...new Set(archiveHeadlines.map(headline => headline.category))];

  // Form setup for search
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
      year: "",
      category: "",
    },
  });

  // Handle search form submission
  const onSubmit = (values: SearchFormValues) => {
    // Reset to page 1 when searching
    setPage(1);
    
    const newParams: {
      search?: string;
      categories?: number[];
    } = {};
    
    // Add search term if provided
    if (values.query) {
      newParams.search = values.query;
    }
    
    // Add category if provided
    if (values.category && values.category !== "all" && categoriesData) {
      const selectedCategory = categoriesData.find(cat => cat.name === values.category);
      if (selectedCategory) {
        newParams.categories = [selectedCategory.id];
      }
    }
    
    // Update search params
    setSearchParams(newParams);
    
    // If year filter is provided, we'll need to filter the results after they're fetched
    // This is because WordPress API doesn't support filtering by year directly
    if (values.year && values.year !== "all" && postsData) {
      const yearValue = parseInt(values.year);
      const filteredByYear = searchResults.filter(headline => headline.year === yearValue);
      setSearchResults(filteredByYear);
    }
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setPage(1);
    
    // Reset form when changing tabs
    form.reset({
      query: "",
      year: "",
      category: "",
    });
    
    if (value === "all") {
      // Reset search params to show all posts
      setSearchParams({});
    } else if (value === "significant") {
      // For significant news, we can use categories if available
      // Alternatively, we could use tags or specific criteria
      
      // If we have categoriesData, we can look for categories like "featured" or "breaking"
      if (categoriesData) {
        const featuredCategory = categoriesData.find(
          cat => cat.name.toLowerCase() === "featured" || 
                cat.name.toLowerCase() === "breaking" ||
                cat.name.toLowerCase() === "headline" ||
                cat.name.toLowerCase() === "important"
        );
        
        if (featuredCategory) {
          setSearchParams({ categories: [featuredCategory.id] });
        } else {
          // If no relevant category found, show a curated list from our static data
          setSearchResults(archiveHeadlines.filter(headline => headline.isSignificant));
        }
      } else {
        // Fallback to static data if categoriesData is not available
        setSearchResults(archiveHeadlines.filter(headline => headline.isSignificant));
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>18 Years of Headlines | The Star Kenya Archives</title>
        <meta 
          name="description" 
          content="Explore The Star Kenya's most significant headlines and stories from the past 18 years, documenting Kenya's journey through news, politics, and culture." 
        />
        <meta property="og:title" content="The Star Kenya - 18 Years of Headlines Archive" />
        <meta property="og:description" content="Browse through The Star's most impactful front pages and headlines since 2007. Relive Kenya's major news moments through our archive of stories." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      
      <div className="pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <SectionHeading>
              18 YEARS OF HEADLINES
            </SectionHeading>
            <p className="text-lg text-gray-600 mt-4">
              Explore The Star's most significant front pages and news stories from our 18-year journey, 
              documenting Kenya's most impactful moments since 2007.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mb-10"
          >
            <Tabs defaultValue="all" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="all">All Headlines</TabsTrigger>
                <TabsTrigger value="significant">Significant Moments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <FormField
                        control={form.control}
                        name="query"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                  placeholder="Search headlines..."
                                  className="pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-48">
                            <FormControl>
                              <div className="relative">
                                <select
                                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                  {...field}
                                  disabled={isLoadingPosts}
                                >
                                  <option value="all">All Years</option>
                                  {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                  ))}
                                </select>
                                {isLoadingPosts && (
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem className="w-full md:w-48">
                            <FormControl>
                              <div className="relative">
                                <select
                                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                  {...field}
                                  disabled={isLoadingCategories}
                                >
                                  <option value="all">All Categories</option>
                                  {wpCategories.length > 0 ? (
                                    wpCategories.map(category => (
                                      <option key={category.id} value={category.name}>{category.name}</option>
                                    ))
                                  ) : (
                                    categories.map(category => (
                                      <option key={category} value={category}>{category}</option>
                                    ))
                                  )}
                                </select>
                                {isLoadingCategories && (
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="bg-[hsl(var(--primary-blue))]"
                        disabled={isLoadingPosts || isLoadingCategories}
                      >
                        {isLoadingPosts ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading...
                          </>
                        ) : (
                          <>Search</>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="significant">
                <div className="space-y-6">
                  <p className="text-gray-600">
                    Highlighting the most impactful and historic front pages from The Star's 18-year history. 
                    These headlines mark pivotal moments in Kenya's journey that defined our nation.
                  </p>
                  
                  {isLoadingPosts ? (
                    <div className="flex justify-center py-6">
                      <Loader2 className="h-8 w-8 animate-spin text-[hsl(var(--primary-blue))] mb-4" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {wpCategories.length > 0 && wpCategories
                        .filter(cat => 
                          cat.name.toLowerCase().includes("featured") || 
                          cat.name.toLowerCase().includes("breaking") ||
                          cat.name.toLowerCase().includes("headline") ||
                          cat.name.toLowerCase().includes("important")
                        )
                        .slice(0, 6)
                        .map(category => (
                          <Button
                            key={category.id}
                            variant="outline"
                            className="p-4 h-auto flex flex-col items-center justify-center gap-2 text-center"
                            onClick={() => {
                              setSearchParams({ categories: [category.id] });
                              setActiveTab("all");
                            }}
                          >
                            <Tag className="h-5 w-5 text-[hsl(var(--primary-blue))]" />
                            <span>{category.name}</span>
                            <span className="text-xs text-gray-500">{category.count} articles</span>
                          </Button>
                        ))
                      }
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          <div className="mt-8" ref={ref}>
            {isLoadingPosts || isLoadingCategories ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--primary-blue))] mb-4" />
                <p className="text-xl text-gray-600">Loading headlines from The Star...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {searchResults.map((headline, index) => (
                  <motion.div
                    key={headline.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + (index * 0.05) }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={headline.imageUrl} 
                        alt={headline.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                      />
                      {headline.isSignificant && (
                        <div className="absolute top-0 right-0 m-3">
                          <Badge className="bg-[hsl(var(--primary-yellow))] text-[hsl(var(--dark))]">
                            Significant
                          </Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">{headline.date}</span>
                      </div>
                      <h3 className="font-montserrat font-bold text-xl mb-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: headline.title }}></h3>
                      <div className="flex items-center mb-3">
                        <Tag className="h-4 w-4 mr-2 text-[hsl(var(--primary-blue))]" />
                        <span className="text-sm text-[hsl(var(--primary-blue))]">{headline.category}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{headline.description}</p>
                      <a 
                        href={headline.url}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="inline-flex items-center text-[hsl(var(--primary-blue))] font-semibold text-sm"
                      >
                        Read Full Story <ArrowRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-500 text-xl">No headlines found matching your search criteria.</p>
                <Button 
                  onClick={() => {
                    setSearchParams({});
                    setPage(1);
                    form.reset({
                      query: "",
                      year: "",
                      category: "",
                    });
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Reset Search
                </Button>
              </motion.div>
            )}
            
            {/* Pagination controls */}
            {postsData && postsData.totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center px-4">
                    <span className="text-sm text-gray-600">
                      Page {page} of {postsData.totalPages}
                    </span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setPage(p => Math.min(postsData.totalPages, p + 1))}
                    disabled={page === postsData.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-16 max-w-3xl mx-auto"
          >
            <h3 className="font-montserrat font-bold text-2xl mb-4">Visit Our Archive Library</h3>
            <p className="text-lg text-gray-600 mb-6">
              Want to explore The Star's complete archive? Visit our physical archive library 
              at our headquarters or access our full digital archive with a subscription.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                href="#subscribe"
                className="bg-[hsl(var(--primary-blue))] text-white font-montserrat font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DIGITAL ARCHIVE ACCESS
              </motion.a>
              <motion.a
                href="#visit"
                className="bg-white border-2 border-[hsl(var(--primary-blue))] text-[hsl(var(--primary-blue))] font-montserrat font-bold px-8 py-4 rounded-full hover:bg-gray-50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VISIT OUR LIBRARY
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Archives;