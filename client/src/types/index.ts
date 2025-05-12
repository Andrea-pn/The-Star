// Interface for training programs
export interface TrainingProgram {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  startDate: string;
  endDate: string;
}

// Interface for beyond game programs
export interface BeyondProgram {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

// Interface for champions of change
export interface Champion {
  id: number;
  name: string;
  title: string;
  organization: string;
  bio: string;
  imageUrl: string;
  achievements: string[];
}

// Interface for impact stories
export interface ImpactStory {
  id: number;
  name: string;
  title: string;
  story: string;
  date: string;
}

// Interface for sponsors
export interface Sponsor {
  id: number;
  name: string;
  logoUrl: string;
  website: string;
}

// Interface for newsletter subscription
export interface NewsletterSubscription {
  email: string;
}

// Interface for story submission
export interface StorySubmission {
  name: string;
  story: string;
}

// Interface for champion nomination
export interface ChampionNomination {
  nomineeName: string;
  nomineeOrganization: string;
  reason: string;
  nominatorName: string;
  nominatorEmail: string;
}
