import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Timeline from "@/pages/Timeline";
import Journalists from "@/pages/Journalists";
import Events from "@/pages/Events";
import Archives from "@/pages/Archives";
import FeaturedStories from "@/pages/FeaturedStories";

function Router() {
  // Get current location for navigation effects
  const [location] = useLocation();
  
  // Scroll to top of page when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/journalists" component={Journalists} />
      <Route path="/events" component={Events} />
      <Route path="/archives" component={Archives} />
      <Route path="/featured-stories" component={FeaturedStories} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
