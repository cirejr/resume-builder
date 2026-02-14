---

# Resume Builder Project Documentation
---

# 1️⃣ DOCUMENTATION.MD

## Project Overview

* **Project Name:** Resume Builder
* **Goal:** Users can input resume data, preview resumes with multiple templates, and export PDFs.
* **Architecture:** Frontend (React + Vite) + Backend (Nitro + Bun) + Shared templates

## Folder Structure

```
resume-builder/
  web/          # Frontend (Vite + React + TanStack Router)
  api/          # Backend (Nitro + Bun)
  templates/    # Resume template React components
  packages/     # Optional shared packages (ui, utils)
```

## Technologies

* **Frontend:** Vite, React, TanStack Router, Zustand, Tailwind CSS, Shadcn UI
* **Backend:** Bun runtime, Nitro framework, Hono (optional), Playwright for PDF export
* **Database:** PostgreSQL + Drizzle ORM (or in-memory for MVP)
* **PDF Generation:** Playwright / Puppeteer
* **Version Control:** Git

## How to Run (MVP)

### Backend

```bash
cd api
bun install
bun run dev
```

### Frontend

```bash
cd web
bun install
bun run dev
```

## Notes

* Start with MVP: raw JSON storage, minimal templates, live preview
* PDF export via API endpoint
* Later: AI resume assistant, drag & drop block editor, template marketplace

---
