import { pgTable, uuid, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    id: uuid("id").primaryKey(),
    
    email: varchar("email", {length: 254}).unique().notNull(),
    
    passwordHash: text("password_hash").notNull(),
    
    name: varchar("name", {length: 50}).unique().notNull(),
    
    points: integer("points").notNull(),
    
    createdAt: timestamp("created_at", {
        mode: "date"
    }).notNull()
});

export const taskTable = pgTable("tasks", {
    id: uuid("id").primaryKey(),
    
    title: varchar("title", {length: 25}).notNull(),
    
    content: varchar("content", {length: 100}).notNull(),

    isCompleted: boolean("is_completed").notNull(),
    
    createdAt: timestamp("created_at", {
        mode: "date"
    }).notNull(),

    lastUpdate: timestamp("last_update", {
        mode: "date"
    }).notNull(),
    
    eventDate: timestamp("event_date", {
        mode: "date"
    }).notNull(),
    
    priority: text("priority", { 
        enum: ["low", "medium", "high"]
    }).notNull(),
    
    userId: uuid("id").references(() => userTable.id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    })
});