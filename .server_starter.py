import http.server, socketserver, os, signal, sys
os.chdir(r'D:\王旭东\Codex-project\yishou_china')
os.environ['ENTRY_KEY'] = 'prototypes/yishou-app'
class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
httpd = socketserver.TCPServer(('', 0), Handler)
port = httpd.server_address[1]
print(f'Serving on port {port}')
sys.stdout.flush()
# Start server, return port
httpd.timeout = 0.5
httpd.server_activate()
import threading
t = threading.Thread(target=httpd.serve_forever)
t.daemon = True
t.start()
print(port)
sys.stdout.flush()
