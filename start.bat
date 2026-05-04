@echo off
echo Starting FaceGate Authentication System...
start cmd /k "cd /d "%~dp0Backend" && node server.js"
start cmd /k "cd /d "%~dp0Frontend" && npm run dev"
