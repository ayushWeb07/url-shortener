import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.model.ts";

const urls = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),

  shortCode: varchar({ length: 20 }).notNull(),
  targetURL: text().notNull(),
  userId: uuid()
    .notNull()
    .references(() => users.id),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export { urls };
