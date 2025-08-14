@echo off
echo Setting up Project-1...
echo.

echo Installing dependencies...
npm install

echo.
echo Generating Prisma client...
npx prisma generate

echo.
echo Setup complete! 
echo.
echo Next steps:
echo 1. Create a .env file with your DATABASE_URL
echo 2. Run: npx prisma db push
echo 3. Run: npm run dev
echo.
pause
