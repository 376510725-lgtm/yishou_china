import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
import os

screenshots_dir = r'd:\王旭东\Codex-project\yishou_china\src\prototypes\yishou-app\screenshots'
files = os.listdir(screenshots_dir)
for f in sorted(files):
    path = os.path.join(screenshots_dir, f)
    size_kb = os.path.getsize(path) / 1024
    print(f'{f} ({size_kb:.0f} KB)')
