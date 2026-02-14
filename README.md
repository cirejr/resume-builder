# Resume Builder - SaaS Edition

A modern, full-featured Resume Builder SaaS application built with React, Clerk, PostgreSQL, and TanStack ecosystem.

## 🚀 Features

- **Authentication**: Secure user authentication with Clerk (OAuth + Email)
- **Multi-tenant**: Each user has isolated data
- **Resume Editor**: Rich form-based editor with real-time preview
- **Templates**: Multiple professional templates (Minimal Professional, Tech Developer)
- **PDF Export**: High-quality PDF generation with Playwright
- **Public Sharing**: Share resumes via unique URLs
- **Dark Mode**: Full dark mode support
- **Responsive**: Works on desktop, tablet, and mobile

## 🏗️ Architecture

```
resume-builder/
├── apps/
│   ├── web/              # Frontend (Vite + React + TanStack Router)
│   └── api/              # Backend (Nitro + PostgreSQL + Drizzle)
└── packages/
    └── shared/           # Shared types (optional)
```

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for development and building
- **TanStack Router** for type-safe routing
- **Clerk** for authentication
- **Zustand** for global state
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components

### Backend
- **Nitro** for API framework
- **PostgreSQL** via Neon (serverless)
- **Drizzle ORM** for type-safe database queries
- **Playwright** for PDF generation
- **Clerk SDK** for auth verification

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh) installed on your system
- [Clerk](https://clerk.dev) account
- [Neon](https://neon.tech) account

### 1. Set up Environment Variables

**Frontend (`web/.env`):**
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:8080
```

**Backend (`api/.env`):**
```bash
# Database
DATABASE_URL=postgresql://user:password@neon-host/dbname

# Clerk
CLERK_SECRET_KEY=sk_test_...
CLERK_PUBLISHABLE_KEY=pk_test_...
```

### 2. Install Dependencies

```bash
# Backend
cd api
bun install

# Frontend
cd ../web
bun install
```

### 3. Set up Database

```bash
cd api

# Generate migrations
npx drizzle-kit generate

# Run migrations
npx drizzle-kit migrate

# (Optional) Open Drizzle Studio
npx drizzle-kit studio
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd api
bun run dev
```
API runs on `http://localhost:8080`

**Terminal 2 - Frontend:**
```bash
cd web
bun run dev
```
Frontend runs on `http://localhost:5173`

### 5. Open in Browser

Navigate to `http://localhost:5173`

## 📖 Usage

### Authentication
1. Sign up with email or OAuth (Google, GitHub, etc.)
2. Verify email if required
3. Access your dashboard

### Creating a Resume
1. Click "Create New Resume" on dashboard
2. Fill in your details:
   - Personal information
   - Professional summary
   - Work experience
   - Education
   - Skills
   - Projects
3. Choose a template
4. Preview in real-time
5. Save your resume

### Editing a Resume
1. Click on any resume card in dashboard
2. Make changes in the editor
3. Click "Update" to save
4. Or "Export PDF" to download

### Sharing a Resume
1. Edit a resume
2. (Future: Toggle "Make Public" setting)
3. Share the public URL: `/r/{slug}`

## 📁 Project Structure

### Frontend
```
web/src/
├── routes/              # TanStack Router file-based routes
│   ├── index.tsx        # Landing page
│   ├── dashboard.tsx    # Resume management
│   ├── sign-in.tsx      # Sign in
│   ├── sign-up.tsx      # Sign up
│   ├── resume/
│   │   ├── new.tsx      # Create resume
│   │   └── $resumeId.tsx # Edit resume
│   └── r/
│       └── $slug.tsx     # Public resume view
├── components/
│   ├── ResumeForm.tsx   # Resume editor form
│   ├── PreviewPanel.tsx # Live preview + template selector
│   ├── theme-provider.tsx # Dark mode provider
│   └── AuthProvider.tsx # Clerk auth integration
├── templates/
│   ├── MinimalProfessional.tsx
│   └── TechDev.tsx
├── stores/
│   └── resumeStore.ts   # Zustand state
└── lib/
    └── api.ts           # API client with auth
```

### Backend
```
api/src/
├── db/
│   ├── index.ts         # Database connection
│   ├── schema.ts        # Drizzle table schemas
│   └── migrations/      # Migration files
├── lib/
│   └── middleware/
│       └── auth.ts      # Clerk auth middleware
├── routes/
│   ├── resumes.ts       # CRUD operations (auth protected)
│   ├── export.ts        # PDF generation
│   ├── public/
│   │   └── resume.ts    # Public resume viewing
│   └── health.ts        # Health check
├── utils/
│   └── resume-templates.ts
└── types/
    └── resume.ts        # Zod schemas
```

## 🔧 Development Scripts

### Frontend
```bash
cd web
bun run dev        # Development server
bun run build      # Production build
bun run preview    # Preview production build
bun run lint       # Run ESLint
bun run check      # Prettier + ESLint
```

### Backend
```bash
cd api
bun run dev        # Development server
bun run build      # Production build
bun run start      # Production server
bun run preview    # Preview production build
```

### Database
```bash
cd api
npx drizzle-kit generate    # Generate migrations
npx drizzle-kit migrate     # Run migrations
npx drizzle-kit studio      # Open Drizzle Studio
npx drizzle-kit push        # Push schema (dev only)
```

## 🔐 API Endpoints

### Authentication
All protected endpoints require `Authorization: Bearer {token}` header.

### Resumes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/resumes` | ✅ | List user's resumes |
| GET | `/resumes?id=xxx` | ✅ | Get specific resume |
| POST | `/resumes` | ✅ | Create new resume |
| PUT | `/resumes?id=xxx` | ✅ | Update resume |
| DELETE | `/resumes?id=xxx` | ✅ | Delete resume |

### Export
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/export` | ✅ | Generate PDF |

### Public
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/public/resume?slug=xxx` | ❌ | View public resume |

## 🌟 Features Roadmap

### ✅ Implemented
- [x] User authentication with Clerk
- [x] PostgreSQL database with Drizzle ORM
- [x] Resume CRUD operations
- [x] PDF export with Playwright
- [x] Multiple templates
- [x] Dark mode support
- [x] Public resume sharing
- [x] Responsive design

### 🚧 Coming Soon
- [ ] Template gallery page
- [ ] Version history
- [ ] Import from LinkedIn
- [ ] Custom CSS templates
- [ ] Analytics dashboard
- [ ] Team/organization support

### 🔮 Future Ideas
- [ ] AI-powered content suggestions
- [ ] Job description matching
- [ ] Resume review service
- [ ] Template marketplace
- [ ] API for third-party integrations

## 🧪 Testing

```bash
# Frontend tests
cd web
bun run test

# Backend tests
cd api
bun run test
```

## 📚 Documentation

- [Implementation Summary](./IMPLEMENTATION_SUMMARY.md) - Detailed implementation notes
- [API Documentation](./api/README.md) - API endpoint details
- [Clerk Docs](https://clerk.com/docs) - Authentication
- [Drizzle Docs](https://orm.drizzle.team) - Database ORM
- [TanStack Router](https://tanstack.com/router) - Routing

## 🤝 Contributing

This is a SaaS-ready application. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

If you encounter issues:
1. Check that all environment variables are set
2. Verify database connection
3. Check Clerk dashboard for auth issues
4. Review logs in both frontend and backend terminals

---

**Built with ❤️ using React, Clerk, PostgreSQL, and TanStack**
