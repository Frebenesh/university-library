import {
  varchar,
  uuid,
  integer,
  text,
  pgTable,
  pgEnum,
  date,
  timestamp,
} from "drizzle-orm/pg-core";

export const STATUS = pgEnum("status_enum", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE = pgEnum("role_enum", ["ADMIN", "USER"]);
export const BORROW_STATUS = pgEnum("borrow_status_enum", [
  "BORROWED",
  "RETURNED",
]);

export const users = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card").notNull().unique(),
  status: STATUS("status").notNull().default("PENDING"),
  role: ROLE("role").notNull().default("USER"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
  }).defaultNow(),
});
