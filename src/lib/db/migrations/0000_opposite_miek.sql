CREATE TYPE "public"."consultation_status" AS ENUM('in_progress', 'completed', 'expired');--> statement-breakpoint
CREATE TYPE "public"."message_role" AS ENUM('ai', 'customer');--> statement-breakpoint
CREATE TYPE "public"."photo_type" AS ENUM('inspiration', 'current_state', 'reference');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'past_due', 'canceled', 'incomplete');--> statement-breakpoint
CREATE TYPE "public"."subscription_tier" AS ENUM('starter', 'professional', 'enterprise');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'owner', 'employee');--> statement-breakpoint
CREATE TYPE "public"."widget_position" AS ENUM('bottom-right', 'bottom-left', 'custom');--> statement-breakpoint
CREATE TABLE "analytics_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"event_type" text NOT NULL,
	"event_data" jsonb,
	"customer_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consultation_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consultation_id" uuid NOT NULL,
	"role" "message_role" NOT NULL,
	"content" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consultation_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consultation_id" uuid NOT NULL,
	"cloudinary_url" text NOT NULL,
	"cloudinary_public_id" text NOT NULL,
	"type" "photo_type" DEFAULT 'inspiration' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consultations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"customer_name" text,
	"customer_phone" text,
	"customer_email" text,
	"status" "consultation_status" DEFAULT 'in_progress' NOT NULL,
	"consultation_data" jsonb,
	"recommended_service_id" uuid,
	"recommended_upsells" jsonb,
	"estimated_price" numeric(10, 2),
	"estimated_duration_minutes" integer,
	"ai_notes" text,
	"goals" text,
	"hair_type" text,
	"current_length" text,
	"scalp_notes" text,
	"face_shape" text,
	"budget_range" text,
	"lifetime_value_score" numeric(5, 2),
	"booked_appointment" boolean DEFAULT false NOT NULL,
	"booking_reference" text,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employee_services" (
	"employee_id" uuid NOT NULL,
	"service_id" uuid NOT NULL,
	"price_override" numeric(10, 2),
	"duration_override" integer,
	CONSTRAINT "employee_services_employee_id_service_id_pk" PRIMARY KEY("employee_id","service_id")
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"title" text,
	"bio" text,
	"photo_url" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"category" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_branding" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"logo_url" text,
	"primary_color" text DEFAULT '#000000' NOT NULL,
	"secondary_color" text DEFAULT '#ffffff' NOT NULL,
	"font_family" text DEFAULT 'Inter' NOT NULL,
	"widget_position" "widget_position" DEFAULT 'bottom-right' NOT NULL,
	"widget_title" text DEFAULT 'Chat with AI' NOT NULL,
	"widget_subtitle" text DEFAULT 'AI Consultation Assistant' NOT NULL,
	"ai_name" text DEFAULT 'Consultant' NOT NULL,
	"ai_personality" text,
	"ai_instructions" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"stripe_customer_id" text,
	"stripe_subscription_id" text,
	"subscription_tier" "subscription_tier" DEFAULT 'starter' NOT NULL,
	"subscription_status" "subscription_status" DEFAULT 'incomplete' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "organizations_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"category" text,
	"price" numeric(10, 2) NOT NULL,
	"duration_minutes" integer NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"organization_id" uuid NOT NULL,
	"email" text NOT NULL,
	"full_name" text,
	"role" "user_role" DEFAULT 'employee' NOT NULL,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "analytics_events" ADD CONSTRAINT "analytics_events_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation_messages" ADD CONSTRAINT "consultation_messages_consultation_id_consultations_id_fk" FOREIGN KEY ("consultation_id") REFERENCES "public"."consultations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultation_photos" ADD CONSTRAINT "consultation_photos_consultation_id_consultations_id_fk" FOREIGN KEY ("consultation_id") REFERENCES "public"."consultations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_recommended_service_id_services_id_fk" FOREIGN KEY ("recommended_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_services" ADD CONSTRAINT "employee_services_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee_services" ADD CONSTRAINT "employee_services_service_id_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_branding" ADD CONSTRAINT "organization_branding_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "services" ADD CONSTRAINT "services_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;