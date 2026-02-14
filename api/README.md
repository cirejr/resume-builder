# Resume Builder API

Backend API for Resume Builder built with Bun + Nitro.

## Features

- Resume CRUD operations with SQLite storage
- PDF export using Playwright
- Type-safe API with Zod validation
- Health check endpoint

## Setup

1. Install dependencies:
```bash
bun install
```

2. Start development server:
```bash
bun run dev
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Resume Operations

- `GET /resumes` - List all resumes
- `GET /resumes?id=<resume-id>` - Get specific resume
- `POST /resumes` - Create new resume
- `PUT /resumes?id=<resume-id>` - Update resume
- `DELETE /resumes?id=<resume-id>` - Delete resume

### PDF Export

- `POST /export` - Generate PDF from resume data
  ```json
  {
    "data": { ...resume_data },
    "template": "minimal-professional" | "tech-dev"
  }
  ```

### Health Check

- `GET /health` - API health status

## Database

Uses SQLite with `bun:sqlite` for persistence. Database file: `resumes.db`

## Development

```bash
bun run dev    # Start development server
bun run build  # Build for production
bun run start  # Start production server
```

## Tech Stack

- **Runtime**: Bun
- **Framework**: Nitro
- **Database**: SQLite (bun:sqlite)
- **Validation**: Zod
- **PDF Generation**: Playwright
