import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

// ─── Users (Better Auth managed) ─────────────────────────────────────────────
export const users = sqliteTable("users", {
  id:            text("id").primaryKey().$defaultFn(() => createId()),
  name:          text("name").notNull(),
  email:         text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false),
  image:         text("image"),
  isPremium:     integer("is_premium", { mode: "boolean" }).default(false),
  createdAt:     integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt:     integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ─── Sessions (Better Auth) ───────────────────────────────────────────────────
export const sessions = sqliteTable("sessions", {
  id:        text("id").primaryKey().$defaultFn(() => createId()),
  userId:    text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token:     text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ─── Accounts (Better Auth OAuth) ────────────────────────────────────────────
export const accounts = sqliteTable("accounts", {
  id:                  text("id").primaryKey().$defaultFn(() => createId()),
  userId:              text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountId:           text("account_id").notNull(),
  providerId:          text("provider_id").notNull(),
  accessToken:         text("access_token"),
  refreshToken:        text("refresh_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope:               text("scope"),
  idToken:             text("id_token"),
  password:            text("password"),
  createdAt:           integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt:           integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ─── Verification Tokens (Better Auth) ───────────────────────────────────────
export const verifications = sqliteTable("verifications", {
  id:         text("id").primaryKey().$defaultFn(() => createId()),
  identifier: text("identifier").notNull(),
  value:      text("value").notNull(),
  expiresAt:  integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt:  integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt:  integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ─── Prompts ──────────────────────────────────────────────────────────────────
export const prompts = sqliteTable("prompts", {
  id:          text("id").primaryKey().$defaultFn(() => createId()),
  slug:        text("slug").notNull().unique(),
  title:       text("title").notNull(),
  description: text("description").notNull(),
  // Enum: 'debug' | 'boilerplate' | 'logic' | 'refactoring' | 'architecture' | 'testing'
  category:    text("category", {
    enum: ["debug", "boilerplate", "logic", "refactoring", "architecture", "testing", "ai-sdk"],
  }).notNull(),
  // JSON: PromptVersionContent[]
  versions:    text("versions", { mode: "json" }).notNull().$type<{
    version: string;
    label: string;
    systemInstructions: string;
  }[]>(),
  // JSON: PromptVariable[]
  variables:   text("variables", { mode: "json" }).notNull().$type<{
    key: string;
    label: string;
    placeholder: string;
    required: boolean;
  }[]>().default([]),
  // JSON: string[]
  tags:        text("tags", { mode: "json" }).notNull().$type<string[]>().default([]),
  isPremium:   integer("is_premium", { mode: "boolean" }).notNull().default(false),
  copyCount:   integer("copy_count").notNull().default(0),
  /** 0–100 deterministic confidence score (static, set at seed time) */
  deterministicScore: integer("deterministic_score").notNull().default(80),
  /** JSON: { claude: string; gpt: string; cursor: string } */
  modelOptimizations: text("model_optimizations", { mode: "json" }).$type<{
    claude: string;
    gpt: string;
    cursor: string;
  }>().default({ claude: "", gpt: "", cursor: "" }),
  rating:      real("rating").default(0),
  createdAt:   integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt:   integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ─── Copy Analytics ───────────────────────────────────────────────────────────
export const copies = sqliteTable("copies", {
  id:        text("id").primaryKey().$defaultFn(() => createId()),
  promptId:  text("prompt_id").notNull().references(() => prompts.id, { onDelete: "cascade" }),
  userId:    text("user_id").references(() => users.id, { onDelete: "set null" }),
  llmTarget: text("llm_target", { enum: ["claude", "gpt", "cursor"] }).notNull(),
  copiedAt:  integer("copied_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────
export type User       = typeof users.$inferSelect;
export type NewUser    = typeof users.$inferInsert;
export type Session    = typeof sessions.$inferSelect;
export type Prompt     = typeof prompts.$inferSelect;
export type NewPrompt  = typeof prompts.$inferInsert;
export type Copy       = typeof copies.$inferSelect;
