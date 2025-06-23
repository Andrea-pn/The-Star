import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertStorySchema, insertSubscriptionSchema, insertNominationSchema } from "@shared/schema";
import dotenv from "dotenv";
dotenv.config();

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes with /api prefix
  
  // Get training programs
  app.get("/api/programs/training", (req, res) => {
    const programs = [
      {
        id: 1,
        name: "Free Training Program",
        description: "Weekly free training sessions for youth from all backgrounds",
        imageUrl: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e",
        location: "City Sports Center",
        startDate: "2023-06-01",
        endDate: "2023-12-31",
      },
      {
        id: 2,
        name: "Equipment for All",
        description: "Providing sports equipment to those who can't afford it",
        imageUrl: "https://images.unsplash.com/photo-1599058917212-d750089bc07e",
        location: "Multiple Locations",
        startDate: "2023-01-01",
        endDate: "2023-12-31",
      },
      {
        id: 3,
        name: "Inclusive Sports Camps",
        description: "Sports camps designed to be inclusive for all abilities",
        imageUrl: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51",
        location: "Regional Sports Complex",
        startDate: "2023-07-10",
        endDate: "2023-08-20",
      },
      {
        id: 4,
        name: "Adaptive Sports Initiative",
        description: "Sports programs tailored for people with disabilities",
        imageUrl: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb21",
        location: "Community Center",
        startDate: "2023-03-15",
        endDate: "2023-11-30",
      },
    ];
    
    res.json(programs);
  });
  
  // Get beyond game programs
  app.get("/api/programs/beyond", (req, res) => {
    const programs = [
      {
        id: 1,
        name: "Building Team Leaders",
        description: "Leadership development through team sports",
        imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
        category: "Leadership",
      },
      {
        id: 2,
        name: "Sports Mentorship",
        description: "Connecting youth with experienced mentors",
        imageUrl: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0",
        category: "Mentorship",
      },
      {
        id: 3,
        name: "Scholar Athletes",
        description: "Supporting academic success for student athletes",
        imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45",
        category: "Education",
      },
      {
        id: 4,
        name: "Career Skills Through Sport",
        description: "Developing workplace skills through sports activities",
        imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093",
        category: "Career Development",
      },
    ];
    
    res.json(programs);
  });
  
  // Get champions of change
  app.get("/api/champions", (req, res) => {
    const champions = [
      {
        id: 1,
        name: "Coach Michael",
        title: "Youth Coach & Mentor",
        organization: "Grassroots Heroes",
        bio: "Former professional athlete dedicating his career to coaching underserved youth",
        imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8",
        achievements: ["Coached 200+ youth", "Developed 5 scholarship athletes", "Community Service Award 2022"],
      },
      {
        id: 2,
        name: "Community First Foundation",
        title: "Non-profit Organization",
        organization: "Community First",
        bio: "Organization focused on bringing sports facilities to low-income neighborhoods",
        imageUrl: "https://images.unsplash.com/photo-1540206351-d6465b3ac5c1",
        achievements: ["Built 12 playgrounds", "Renovated 8 community sports facilities", "Raised $2M for sports programs"],
      },
      {
        id: 3,
        name: "East Side Sports Alliance",
        title: "Community Group",
        organization: "East Side Alliance",
        bio: "Neighborhood-led initiative providing safe sports activities for at-risk youth",
        imageUrl: "https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1",
        achievements: ["Reduced neighborhood crime by 30%", "250+ regular participants", "Public Safety Partnership Award"],
      },
    ];
    
    res.json(champions);
  });
  
  // Get sponsors
  app.get("/api/sponsors", (req, res) => {
    const sponsors = [
      {
        id: 1,
        name: "SportGear",
        logoUrl: "https://via.placeholder.com/120x60?text=SportGear",
        website: "https://example.com/sponsor1"
      },
      {
        id: 2,
        name: "ActiveLife",
        logoUrl: "https://via.placeholder.com/120x60?text=ActiveLife",
        website: "https://example.com/sponsor2"
      },
      {
        id: 3,
        name: "FitFuture",
        logoUrl: "https://via.placeholder.com/120x60?text=FitFuture",
        website: "https://example.com/sponsor3"
      },
      {
        id: 4,
        name: "TeamSpirit",
        logoUrl: "https://via.placeholder.com/120x60?text=TeamSpirit",
        website: "https://example.com/sponsor4"
      },
      {
        id: 5,
        name: "ChampionsClub",
        logoUrl: "https://via.placeholder.com/120x60?text=ChampionsClub",
        website: "https://example.com/sponsor5"
      },
      {
        id: 6,
        name: "VictoryLane",
        logoUrl: "https://via.placeholder.com/120x60?text=VictoryLane",
        website: "https://example.com/sponsor6"
      },
    ];
    
    res.json(sponsors);
  });
  
  // Get a featured impact story
  app.get("/api/stories/featured", (req, res) => {
    const featuredStory = {
      id: 1,
      name: "Jamie Davis",
      title: "Program Participant, 2018-2020",
      story: "Sports taught me discipline and perseverance. The community basketball program gave me purpose and helped me develop leadership skills that I use every day in my career.",
      date: "2023-03-15",
    };
    
    res.json(featuredStory);
  });
  
  // Submit a story
  app.post("/api/stories", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertStorySchema.parse(req.body);
      
      // Save the story
      const story = await storage.createStory(validatedData);
      
      res.status(201).json({ success: true, story });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Failed to submit story" });
      }
    }
  });
  
  // Subscribe to newsletter
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertSubscriptionSchema.parse(req.body);
      
      // Save the subscription
      const subscription = await storage.createSubscription(validatedData);
      
      res.status(201).json({ success: true, subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Failed to subscribe to newsletter" });
      }
    }
  });
  
  // Submit champion nomination
  app.post("/api/nominations", async (req, res) => {
    try {
      // Validate the request body
      const validatedData = insertNominationSchema.parse(req.body);
      
      // Save the nomination
      const nomination = await storage.createNomination(validatedData);
      
      res.status(201).json({ success: true, nomination });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Failed to submit nomination" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
