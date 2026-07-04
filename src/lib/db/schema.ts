import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  integer,
  boolean,
  decimal,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";

// Enums
export const subscriptionTierEnum = pgEnum("subscription_tier", [
  "starter",
  "professional",
  "enterprise",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "past_due",
  "canceled",
  "incomplete",
]);

export const widgetPositionEnum = pgEnum("widget_position", [
  "bottom-right",
  "bottom-left",
  "custom",
]);

export const userRoleEnum = pgEnum("user_role", ["admin", "owner", "employee"]);

export const consultationStatusEnum = pgEnum("consultation_status", [
  "in_progress",
  "completed",
  "expired",
]);

export const messageRoleEnum = pgEnum("message_role", ["ai", "customer"]);

export const photoTypeEnum = pgEnum("photo_type", [
  "inspiration",
  "current_state",
  "reference",
]);

// Tables
export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  subscriptionTier: subscriptionTierEnum("subscription_tier")
    .default("starter")
    .notNull(),
  subscriptionStatus: subscriptionStatusEnum("subscription_status")
    .default("incomplete")
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const organizationBranding = pgTable("organization_branding", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color").default("#000000").notNull(),
  secondaryColor: text("secondary_color").default("#ffffff").notNull(),
  fontFamily: text("font_family").default("Inter").notNull(),
  widgetPosition: widgetPositionEnum("widget_position")
    .default("bottom-right")
    .notNull(),
  widgetTitle: text("widget_title").default("Chat with AI").notNull(),
  widgetSubtitle: text("widget_subtitle")
    .default("AI Consultation Assistant")
    .notNull(),
  aiName: text("ai_name").default("Consultant").notNull(),
  aiPersonality: text("ai_personality"),
  aiInstructions: text("ai_instructions"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey(), // maps to supabase.auth.users.id
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  role: userRoleEnum("role").default("employee").notNull(),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  title: text("title"),
  bio: text("bio"),
  photoUrl: text("photo_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const employeeServices = pgTable(
  "employee_services",
  {
    employeeId: uuid("employee_id")
      .references(() => employees.id, { onDelete: "cascade" })
      .notNull(),
    serviceId: uuid("service_id")
      .references(() => services.id, { onDelete: "cascade" })
      .notNull(),
    priceOverride: decimal("price_override", { precision: 10, scale: 2 }),
    durationOverride: integer("duration_override"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.employeeId, table.serviceId] }),
  })
);

export const faqs = pgTable("faqs", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const consultations = pgTable("consultations", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  customerEmail: text("customer_email"),
  status: consultationStatusEnum("status").default("in_progress").notNull(),
  consultationData: jsonb("consultation_data"), // store full conversation or intermediate state
  recommendedServiceId: uuid("recommended_service_id").references(
    () => services.id,
    { onDelete: "set null" }
  ),
  recommendedUpsells: jsonb("recommended_upsells"),
  estimatedPrice: decimal("estimated_price", { precision: 10, scale: 2 }),
  estimatedDurationMinutes: integer("estimated_duration_minutes"),
  aiNotes: text("ai_notes"),
  goals: text("goals"),
  hairType: text("hair_type"),
  currentLength: text("current_length"),
  scalpNotes: text("scalp_notes"),
  faceShape: text("face_shape"),
  budgetRange: text("budget_range"),
  lifetimeValueScore: decimal("lifetime_value_score", {
    precision: 5,
    scale: 2,
  }),
  bookedAppointment: boolean("booked_appointment").default(false).notNull(),
  bookingReference: text("booking_reference"),
  startedAt: timestamp("started_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const consultationMessages = pgTable("consultation_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  consultationId: uuid("consultation_id")
    .references(() => consultations.id, { onDelete: "cascade" })
    .notNull(),
  role: messageRoleEnum("role").notNull(),
  content: text("content").notNull(),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const consultationPhotos = pgTable("consultation_photos", {
  id: uuid("id").defaultRandom().primaryKey(),
  consultationId: uuid("consultation_id")
    .references(() => consultations.id, { onDelete: "cascade" })
    .notNull(),
  cloudinaryUrl: text("cloudinary_url").notNull(),
  cloudinaryPublicId: text("cloudinary_public_id").notNull(),
  type: photoTypeEnum("type").default("inspiration").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const analyticsEvents = pgTable("analytics_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  organizationId: uuid("organization_id")
    .references(() => organizations.id, { onDelete: "cascade" })
    .notNull(),
  eventType: text("event_type").notNull(),
  eventData: jsonb("event_data"),
  customerId: text("customer_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
