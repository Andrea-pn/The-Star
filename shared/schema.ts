import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Impact stories model
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  story: text("story").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStorySchema = createInsertSchema(stories).pick({
  name: true,
  story: true,
});

// Newsletter subscriptions model
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  email: true,
});

// Champions nomination model
export const nominations = pgTable("nominations", {
  id: serial("id").primaryKey(),
  nomineeName: text("nominee_name").notNull(),
  nomineeOrganization: text("nominee_organization"),
  reason: text("reason").notNull(),
  nominatorName: text("nominator_name").notNull(),
  nominatorEmail: text("nominator_email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNominationSchema = createInsertSchema(nominations).pick({
  nomineeName: true,
  nomineeOrganization: true,
  reason: true,
  nominatorName: true,
  nominatorEmail: true,
});

// Define types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

export type InsertNomination = z.infer<typeof insertNominationSchema>;
export type Nomination = typeof nominations.$inferSelect;
