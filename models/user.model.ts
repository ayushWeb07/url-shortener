import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 100 }).notNull().unique(),
  password: text().notNull(),

  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export { users };
