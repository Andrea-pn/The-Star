import { 
  users, type User, type InsertUser,
  type Story, type InsertStory,
  type Subscription, type InsertSubscription,
  type Nomination, type InsertNomination
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Story methods
  getStories(): Promise<Story[]>;
  getStory(id: number): Promise<Story | undefined>;
  createStory(story: InsertStory): Promise<Story>;
  
  // Subscription methods
  getSubscriptions(): Promise<Subscription[]>;
  getSubscription(id: number): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  
  // Nomination methods
  getNominations(): Promise<Nomination[]>;
  getNomination(id: number): Promise<Nomination | undefined>;
  createNomination(nomination: InsertNomination): Promise<Nomination>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  private subscriptions: Map<number, Subscription>;
  private nominations: Map<number, Nomination>;
  private userIdCounter: number;
  private storyIdCounter: number;
  private subscriptionIdCounter: number;
  private nominationIdCounter: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.subscriptions = new Map();
    this.nominations = new Map();
    this.userIdCounter = 1;
    this.storyIdCounter = 1;
    this.subscriptionIdCounter = 1;
    this.nominationIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Story methods
  async getStories(): Promise<Story[]> {
    return Array.from(this.stories.values());
  }
  
  async getStory(id: number): Promise<Story | undefined> {
    return this.stories.get(id);
  }
  
  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.storyIdCounter++;
    const now = new Date();
    const story: Story = { ...insertStory, id, createdAt: now };
    this.stories.set(id, story);
    return story;
  }
  
  // Subscription methods
  async getSubscriptions(): Promise<Subscription[]> {
    return Array.from(this.subscriptions.values());
  }
  
  async getSubscription(id: number): Promise<Subscription | undefined> {
    return this.subscriptions.get(id);
  }
  
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    // Check for duplicate email
    const existingSubscription = Array.from(this.subscriptions.values()).find(
      (sub) => sub.email === insertSubscription.email
    );
    
    if (existingSubscription) {
      throw new Error("Email already subscribed");
    }
    
    const id = this.subscriptionIdCounter++;
    const now = new Date();
    const subscription: Subscription = { ...insertSubscription, id, createdAt: now };
    this.subscriptions.set(id, subscription);
    return subscription;
  }
  
  // Nomination methods
  async getNominations(): Promise<Nomination[]> {
    return Array.from(this.nominations.values());
  }
  
  async getNomination(id: number): Promise<Nomination | undefined> {
    return this.nominations.get(id);
  }
  
  async createNomination(insertNomination: InsertNomination): Promise<Nomination> {
    const id = this.nominationIdCounter++;
    const now = new Date();
    // Ensure nomineeOrganization is null if not provided
    const nomineeOrganization = insertNomination.nomineeOrganization ?? null;
    const nomination: Nomination = { 
      ...insertNomination, 
      nomineeOrganization,
      id, 
      createdAt: now 
    };
    this.nominations.set(id, nomination);
    return nomination;
  }
}

export const storage = new MemStorage();
