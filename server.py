#!/usr/bin/env python3
import http.server
import socketserver
import urllib.request
import urllib.error
import json
import ssl
SSL_CTX = ssl._create_unverified_context()
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))
DEFAULT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImYxMDU3ZDM0LWVmZWYtNDUwNy1iNDhmLTM2ZjUwMTI4YjgwYSIsImlhdCI6MTc4OTY3ODI0OCwic3ViIjoiZGV2ZWxvcGVyL2I2YWRiNmRkLWVkM2MtNDhiZC04OTE5LTU1YjJhYjYyOTYwMCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIxOTguODQuMjAxLjIxNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.WCrHNZtHkfCYOP7Ni99hJhC-K8y1bUeFsJHJrtTnYv6rXCIN-ruitlHSXx_W0JrOmvNaeVS1dpW4jlYf0Vd3Fg'

def get_api_key():
    key = os.environ.get('CLASH_ROYALE_API_KEY')
    if key:
        return key
    env_path = os.path.join(DIRECTORY, '.env')
    if os.path.exists(env_path):
        try:
            with open(env_path, 'r') as f:
                for line in f:
                    if line.startswith('CLASH_ROYALE_API_KEY='):
                        return line.split('=', 1)[1].strip()
        except Exception:
            pass
    return DEFAULT_TOKEN.replace("\\n", "").replace("\n", "").strip()

class NexusHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        # Ezoic ads.txt redirect — must be served from root of domain
        if self.path == '/ads.txt':
            self.send_response(301)
            self.send_header('Location', 'https://srv.adstxtmanager.com/19390/nexusroyale.online')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            return

        if self.path.startswith('/api/clashroyale/'):
            target_subpath = self.path[len('/api/clashroyale/'):]
            
            # Strip any query parameters
            query_str = ""
            if '?' in target_subpath:
                target_subpath, query_str = target_subpath.split('?', 1)

            # Ensure player tags have %23 prepended for Supercell API
            if target_subpath.startswith('players/') and not target_subpath.startswith('players/%23') and not target_subpath.startswith('players/#'):
                parts = target_subpath.split('/', 1)
                sub_parts = parts[1].split('/', 1)
                clean_tag = sub_parts[0].replace('#', '').replace('%23', '')
                encoded_tag = f"%23{clean_tag}"
                if len(sub_parts) > 1:
                    target_subpath = f"players/{encoded_tag}/{sub_parts[1]}"
                else:
                    target_subpath = f"players/{encoded_tag}"

            cr_api_url = f'https://api.clashroyale.com/v1/{target_subpath}'
            
            auth_header = self.headers.get('Authorization')
            if not auth_header:
                token_val = get_api_key()
                if token_val:
                    auth_header = f'Bearer {token_val}'

            req = urllib.request.Request(cr_api_url)
            if auth_header:
                req.add_header('Authorization', auth_header)
            req.add_header('Accept', 'application/json')

            try:
                with urllib.request.urlopen(req, context=SSL_CTX) as response:
                    content = response.read()
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                    self.send_header('Pragma', 'no-cache')
                    self.send_header('Expires', '0')
                    self.end_headers()
                    self.wfile.write(content)
            except urllib.error.HTTPError as e:
                self.send_response(e.code)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                detected_ip = "198.84.201.214"
                try:
                    with urllib.request.urlopen("https://api.ipify.org", context=SSL_CTX, timeout=2) as ip_res:
                        detected_ip = ip_res.read().decode().strip()
                except Exception:
                    pass

                err_payload = {
                    'error': str(e),
                    'code': e.code,
                    'message': 'Supercell API 403 Forbidden: IP address mismatch.',
                    'currentIp': detected_ip,
                    'tokenWhitelistedIp': '99.239.39.175',
                    'fix': f'Add {detected_ip} to your key on developer.clashroyale.com'
                }
                self.wfile.write(json.dumps(err_payload).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
            return

        super().do_GET()

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    port = PORT
    while port < PORT + 10:
        try:
            with socketserver.TCPServer(('', port), NexusHandler) as httpd:
                print("========================================================")
                print(f"  👑 NEXUS ROYALE 2030 IS ONLINE!")
                print(f"  🚀 Open: http://localhost:{port}")
                print(f"  🔑 Supercell API: Active (IP: 99.239.39.175)")
                print("========================================================")
                httpd.serve_forever()
                break
        except OSError:
            port += 1

if __name__ == '__main__':
    run_server()
