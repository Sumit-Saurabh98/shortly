import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    imageUrl: varchar("imageUrl"),
    subscription: boolean("subscription").$default(() => false),
})
