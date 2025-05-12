import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Sponsor } from "../types";

// Form validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormData = z.infer<typeof formSchema>;

const Sponsors = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();

  // Fetch sponsors from API
  const { data: sponsors = [] } = useQuery<Sponsor[]>({
    queryKey: ['/api/sponsors'],
  });

  // Form setup
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle newsletter subscription
  const subscribeMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/newsletter/subscribe", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "You've been added to our newsletter.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    subscribeMutation.mutate(data);
  };

  return (
    <section 
      className="bg-gray-100 py-16"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="font-montserrat font-black text-3xl md:text-4xl uppercase mb-6">
            JOIN OUR TEAM
          </h2>
          <p className="text-lg mb-8">
            Stay updated with our latest programs, events, and impact stories.
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow max-w-md">
                    <FormControl>
                      <Input
                        placeholder="Your Email Address"
                        className="px-6 py-6 rounded-md border border-gray-300"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-primary-blue-light text-white font-montserrat font-bold px-8 py-3 rounded-md hover:bg-opacity-90 whitespace-nowrap"
                disabled={subscribeMutation.isPending}
              >
                {subscribeMutation.isPending ? "PROCESSING..." : "SUBSCRIBE"}
              </Button>
            </form>
          </Form>
        </motion.div>
        
        <div className="mt-20">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-montserrat font-bold text-xl text-center uppercase mb-8"
          >
            OUR PARTNERS & SPONSORS
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                className="sponsor-logo"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              >
                <img 
                  src={sponsor.logoUrl} 
                  alt={`${sponsor.name} logo`}
                  className="h-12 object-contain" 
                />
              </motion.div>
            ))}
            
            {/* Fallback logos if no sponsors are loaded */}
            {sponsors.length === 0 && (
              <>
                <motion.div
                  className="sponsor-logo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60" className="h-12">
                    <rect width="120" height="60" fill="#ccc" />
                    <text x="60" y="35" fontSize="12" fill="#555" textAnchor="middle">SPONSOR</text>
                  </svg>
                </motion.div>
                <motion.div
                  className="sponsor-logo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60" className="h-12">
                    <rect width="120" height="60" fill="#ccc" />
                    <text x="60" y="35" fontSize="12" fill="#555" textAnchor="middle">SPONSOR</text>
                  </svg>
                </motion.div>
                <motion.div
                  className="sponsor-logo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60" className="h-12">
                    <rect width="120" height="60" fill="#ccc" />
                    <text x="60" y="35" fontSize="12" fill="#555" textAnchor="middle">SPONSOR</text>
                  </svg>
                </motion.div>
                <motion.div
                  className="sponsor-logo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60" className="h-12">
                    <rect width="120" height="60" fill="#ccc" />
                    <text x="60" y="35" fontSize="12" fill="#555" textAnchor="middle">SPONSOR</text>
                  </svg>
                </motion.div>
                <motion.div
                  className="sponsor-logo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60" className="h-12">
                    <rect width="120" height="60" fill="#ccc" />
                    <text x="60" y="35" fontSize="12" fill="#555" textAnchor="middle">SPONSOR</text>
                  </svg>
                </motion.div>
                <motion.div
                  className="sponsor-logo"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" viewBox="0 0 120 60" className="h-12">
                    <rect width="120" height="60" fill="#ccc" />
                    <text x="60" y="35" fontSize="12" fill="#555" textAnchor="middle">SPONSOR</text>
                  </svg>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
