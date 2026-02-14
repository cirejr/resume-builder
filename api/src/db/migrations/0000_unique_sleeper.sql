CREATE TABLE "resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"title" varchar(255) NOT NULL,
	"data" json NOT NULL,
	"template_id" varchar(50) DEFAULT 'minimal-professional',
	"is_public" boolean DEFAULT false,
	"slug" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "resumes_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"config" json NOT NULL,
	"is_system" boolean DEFAULT false,
	"created_by" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
