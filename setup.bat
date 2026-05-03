@echo off
echo Installing frontend dependencies...
npm install
echo Installing backend dependencies...
cd backend
npm install
echo Creating .env file...
echo MONGO_URI=mongodb://localhost:27017/facelogin_db > .env
echo PORT=5000 >> .env
cd ..
echo Setup complete! Now run start.bat to start the project
pause
