@echo off
echo ========================================
echo 3D Panoramic Tour - Development Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    echo.
    call npm install
    echo.
)

echo Starting development server...
echo The tour will open in your browser at http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
