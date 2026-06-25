@echo off
cd /d "D:\???\Codex-project\yishou_china"
echo ========== Starting Vite dev server ==========
start /min "Vite Dev Server" "node" "node_modules\vite\bin\vite.js" --host 0.0.0.0
echo Waiting 12 seconds for Vite to start...
ping -n 12 127.0.0.1 > nul
echo ========== Starting Admin server ==========
start /min "Admin Server" "node" "node_modules\@axhub\make\bin\cli.mjs" --runtime-origin http://localhost:51720 --port 53817
echo Vite dev server: http://localhost:51720
echo Admin server:    http://localhost:53817
echo Press any key to stop servers...
pause
@rem Kill both servers
taskkill /f /im node.exe 2>nul
