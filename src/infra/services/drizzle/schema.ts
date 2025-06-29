import { boolean, date, numeric, pgTable, varchar } from "drizzle-orm/pg-core"

export const company = pgTable("company", {
  id: varchar().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  isActive: boolean().notNull(),
  deleteDate: date(),
  createdAt: date().notNull(),
  updatedAt: date().notNull(),
})

export const service = pgTable("service", {
  id: varchar().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  price: numeric().notNull(),
  company_id: varchar({ length: 255 }).notNull(),
  createdAt: date().notNull(),
  updatedAt: date().notNull(),
})
