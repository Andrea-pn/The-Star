import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "../components/SectionHeading";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { apiRequest } from "@/lib/queryClient";
import { ImpactStory } from "../types";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  story: z.string().min(10, { message: "Your story must be at least 10 characters" }),
});

type FormData = z.infer<typeof formSchema>;

const Impact = () => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const { toast } = useToast();
  
  // Fetch a random testimonial
  const { data: testimonial } = useQuery<ImpactStory>({
    queryKey: ['/api/stories/featured'],
  });

  // Form setup
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      story: "",
    },
  });

  // Handle story submission
  const submitMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/stories", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Story submitted!",
        description: "Thank you for sharing your experience with us.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    submitMutation.mutate(data);
  };

  return (
    <section 
      id="impact" 
      className="bg-dark text-white py-20 relative"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <SectionHeading color="white">
          HOW HAS SPORT<br />IMPACTED YOUR LIFE?
        </SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gray-800 rounded-lg p-4 h-96 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b"
                alt="Interactive impact map" 
                className="w-full h-full object-cover rounded opacity-60"
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                <h3 className="font-montserrat font-bold text-2xl mb-4">OUR GLOBAL IMPACT</h3>
                <p className="text-center mb-6">Explore how our programs are changing lives around the world</p>
                <motion.button
                  className="bg-primary-yellow-light text-dark font-montserrat font-bold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  EXPLORE THE MAP
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {testimonial && (
              <motion.div 
                className="bg-gray-900 rounded-lg p-8 mb-6 transform hover:scale-102 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-yellow-light mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  <p className="text-lg italic">
                    "{testimonial.story}"
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-12 h-12 bg-primary-red-light rounded-full flex items-center justify-center font-montserrat font-bold text-xl">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-montserrat font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="mt-8">
              <h3 className="font-montserrat font-bold text-2xl mb-4">SHARE YOUR STORY</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Your Name"
                            className="bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:ring-primary-yellow-light"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="story"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="How has sport impacted your life?"
                            rows={4}
                            className="bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:ring-primary-yellow-light"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary-yellow-light text-dark font-montserrat font-bold hover:bg-opacity-90"
                    disabled={submitMutation.isPending}
                  >
                    {submitMutation.isPending ? "SUBMITTING..." : "SUBMIT YOUR STORY"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
