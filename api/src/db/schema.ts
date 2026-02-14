import { pgTable, uuid, varchar, text, json, timestamp, boolean } from 'drizzle-orm/pg-core'

// Resumes table - linked to Clerk users
export const resumes = pgTable('resumes', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  data: json('data').notNull(),
  templateId: varchar('template_id', { length: 50 }).default('minimal-professional'),
  isPublic: boolean('is_public').default(false),
  slug: varchar('slug', { length: 100 }).unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Templates table - system + user-created
export const templates = pgTable('templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  config: json('config').notNull(),
  isSystem: boolean('is_system').default(false),
  createdBy: varchar('created_by', { length: 255 }), // clerk_user_id or null for system
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Type exports
export type Resume = typeof resumes.$inferSelect
export type NewResume = typeof resumes.$inferInsert
export type Template = typeof templates.$inferSelect
export type NewTemplate = typeof templates.$inferInsert
