
# 2️⃣ PRD.MD (Product Requirements Document)

## Product Vision

Build a fast, intuitive Resume Builder that allows users to create, preview, and export professional resumes using multiple templates.

## User Stories

1. **As a user**, I want to input my personal information, education, experience, skills, and projects.
2. **As a user**, I want to preview my resume in real-time using different templates.
3. **As a user**, I want to export my resume as a PDF.
4. **As a user**, I want my resume data saved and retrievable.

## Functional Requirements

* Form input for: Profile, Education, Experience, Skills, Projects
* JSON schema for storing resume data
* Preview panel with live template switching (2 templates MVP)
* API endpoints for CRUD operations on resume data
* PDF export functionality

## Non-Functional Requirements

* Responsive frontend UI
* Fast load and save operations
* Modular architecture for future expansion (AI, marketplace, hosting)
* Simple dev setup with Bun runtime and Nitro backend

## MVP Scope

* Included: Resume input form, JSON storage, live preview, 2 templates, PDF export
* Excluded (Post-MVP): Drag & drop editor, AI text rewriting, template marketplace, hosted resume profiles
