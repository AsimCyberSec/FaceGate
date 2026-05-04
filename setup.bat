@echo off
echo ============================
echo  FaceGate Setup Script
echo ============================
echo.
echo Installing root dependencies...
cd /d "%~dp0"
npm install mongoose dotenv cors express

echo Installing frontend dependencies...
cd /d "%~dp0Frontend"
npm install

echo.
echo Installing backend dependencies...
cd /d "%~dp0Backend"
npm install

echo.
echo Creating backend .env file...
cd /d "%~dp0Backend"
echo MONGO_URI=mongodb://localhost:27017/facelogin_db > .env
echo PORT=5000 >> .env

echo.
echo Setup complete! Now run start.bat to start the project.
pause
