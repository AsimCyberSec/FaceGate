# FaceGate - Face Recognition Login

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

> A secure, passwordless authentication system using real-time face recognition.

## Requirements
- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com)

## Quick Start

### 1. Clone the repository
\\\ash
git clone https://github.com/AsimCyberSec/FaceGate.git
cd FaceGate
\\\

### 2. Run setup (only once)
\\\
double click setup.bat
\\\

### 3. Start the project (every time)
\\\
double click start.bat
\\\

### 4. Open in browser
\\\
http://localhost:8080
\\\

## Project Structure
\\\
FaceGate/
+-- backend/              <- Express + MongoDB
   +-- models/User.js
   +-- routes/auth.js
   +-- server.js
+-- src/                  <- React frontend
   +-- components/
   +-- routes/
   +-- services/
+-- public/models/        <- face-api.js weights
+-- setup.bat             <- install dependencies
+-- start.bat             <- start the project
\\\

## Team
| Role | Responsibility |
|------|---------------|
| Database | MongoDB models |
| Backend | Express API routes |
| Frontend | React + face-api.js |
| Security | CORS + rate limiting |

## Ports
- Backend: http://localhost:5000
- Frontend: http://localhost:8080
