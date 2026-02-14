--

# 3️⃣ AGENTS.MD (Coding Agent Instructions)

## Purpose

Implement the Resume Builder MVP automatically.

## Agent Tasks

### Phase 0 – Initialize Projects

1. Initialize `web` folder as Vite + React + TypeScript project.
2. Initialize `api` folder as Bun + Nitro project.
3. Install required dependencies:

   * **Frontend:** `react`, `react-dom`, `tanstack/react-router`, `zustand`, `tailwindcss`
   * **Backend:** `nitropack`, `playwright`

### Phase 1 – Backend Implementation

1. Setup basic Nitro server in `api/src`.
2. Create `/resumes` endpoints: `POST`, `GET/:id`, `PUT/:id`.
3. Implement in-memory storage for MVP.
4. Create `/export` endpoint for PDF generation via Playwright.
5. Add `/health` endpoint.

### Phase 2 – Frontend Implementation

1. Scaffold pages/components in `web/src`:

   * `ResumeForm.tsx` (input form)
   * `PreviewPanel.tsx` (renders selected template)
   * `TemplateSelector.tsx` (switch between templates)
2. Setup Zustand store for resume state.
3. Implement Save/Load buttons connecting to backend API.

### Phase 3 – Templates

1. Create `MinimalProfessional.tsx` and `TechDev.tsx` templates in `templates/`.
2. Integrate template switcher in `PreviewPanel`.

### Phase 4 – PDF Export Integration

1. Frontend Export button sends JSON to backend `/export`.
2. Backend renders PDF and returns it for download.

### Phase 5 – MVP Polishing

1. Add Tailwind styling, responsive layout.
2. Add basic validation and error handling.
3. Ensure frontend and backend run together with `bun run dev`.

## Notes for Agent

* Focus on MVP first, no extra features.
* Keep code modular for future expansion.
* Use clear file/folder naming conventions.
* Generate README.md automatically in each folder with setup instructions.

---
