# FaceGate - Facial Authentication System

A passwordless biometric authentication system using facial recognition powered by face-api.js.

## 📁 Project Structure

```
FaceGate/
├── Backend/          → Express.js API server (routes, authentication logic)
├── Database/         → MongoDB models and configuration (schemas, seeds, connection)
├── Frontend/         → React + Vite + TanStack Router UI (components, pages, services)
├── Security/         → SAST/DAST security scan reports
├── Miscellaneous/    → Old, duplicate, and unused files (archived for reference)
├── start.bat         → Launch both backend and frontend servers
├── setup.bat         → Install all dependencies and configure environment
└── README.md         → This file
```

## 🚀 Quick Start

1. **Setup** - Run `setup.bat` to install all dependencies
2. **Start** - Run `start.bat` to launch both servers
3. **Open** - Visit `http://localhost:5173` in your browser

### Alternative: Terminal Commands
If you prefer running from the terminal instead of using batch scripts:
- **Backend**: `npm run start:backend` (from the main folder)
- **Frontend**: `npm run start:frontend` (from the main folder)

## 📂 Folder Details

### Backend/
- `server.js` - Express server entry point
- `routes/auth.js` - Authentication API routes (register, login, users, delete)
- `.env` - MongoDB connection string and port config

### Database/
- `models/User.js` - Mongoose schema for user data with face descriptors
- `config/db.js` - MongoDB connection handler with reconnection logic
- `config/seed.js` - Database seeder for initial setup

### Frontend/
- `src/routes/` - Page components (login, register, dashboard, admin)
- `src/components/` - Reusable UI components (FaceCapture, Navbar, Sidebar, etc.)
- `src/services/auth-api.ts` - API client for backend communication
- `src/lib/auth-context.tsx` - Authentication state management
- `public/models/` - face-api.js ML model weights

### Security/
- Bandit SAST reports (HTML, XML)
- DAST scan reports (JSON)
- Static analysis results

### Miscellaneous/
- `Old-Files/` - Outdated versions of files from earlier development
- `Duplicate-Files/` - Redundant copies that were scattered across the project

## 🛠 Tech Stack
- **Frontend**: React, Vite, TanStack Router, TailwindCSS, shadcn/ui
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Auth**: face-api.js (biometric face recognition)
