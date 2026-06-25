@echo off
cd /d "D:\???\Codex-project\yishou_china"
start /min "Admin Server" "node" "node_modules\@axhub\make\bin\cli.mjs" --runtime-origin http://localhost:51720 --port 53817
echo Admin server: http://localhost:53817
