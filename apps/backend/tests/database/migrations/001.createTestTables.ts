import { pgTable, uuid, varchar, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const userTableTest = pgTable("usersTest", {
    user_id: uuid().defaultRandom().primaryKey(),
    user_email: varchar({length: 254}).unique().notNull(),
    user_password: text().notNull(),
    user_name: varchar({length: 50}).unique().notNull(),
    user_points: integer().notNull().default(0),
    user_created_at: timestamp().notNull().defaultNow()
});

export const taskTableTest = pgTable("tasksTest", {
    task_id: uuid().defaultRandom().primaryKey(),
    task_title: varchar({length: 25}).notNull(),
    task_content: varchar({length: 100}).notNull(),
    task_is_completed: boolean().notNull().default(false),
    task_created_at: timestamp().notNull().defaultNow(),
    task_event_date: timestamp(),
    task_priority: varchar({length: 6}).notNull(),
    user_id: uuid().defaultRandom().references(() => userTableTest.user_id, {
        onDelete: "cascade",
        onUpdate: "cascade"
    })
});