import { pgTable, uuid, varchar, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
    user_id: uuid().defaultRandom().primaryKey(),
    user_email: varchar({length: 254}).unique().notNull(),
    user_password: text().notNull(),
    user_name: varchar({length: 50}).unique().notNull(),
    user_points: integer().notNull().default(0),
    user_created_at: timestamp().notNull().defaultNow()
});

export const taskTable = pgTable("tasks", {
    task_id: uuid().defaultRandom().primaryKey(),
    task_title: varchar({length: 25}).notNull(),
    task_content: varchar({length: 100}).notNull(),
    task_is_completed: boolean().notNull().default(false),
    task_created_at: timestamp().notNull().defaultNow(),
    task_event_date: timestamp(),
    task_priority: varchar({length: 6}).notNull(),
    user_id: uuid().defaultRandom().references(() => userTable.user_id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    })
});