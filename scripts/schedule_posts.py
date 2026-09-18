#!/usr/bin/env python3
"""
Nexus Royale — Buffer Scheduling Orchestrator
Schedules the 3-day 9-post campaign directly via the Buffer MCP protocol.
"""

import json
import os
import ssl
import sys
import time
import urllib.request
from datetime import datetime

TOKEN_FILE = os.path.expanduser("~/.gemini/antigravity/mcp_oauth_tokens.json")
QUEUE_FILE = os.path.join(os.path.dirname(__file__), "..", "..", "Socials", "content_queue.json")
CHANNEL_ID = "6aac7d9dea19ca0bde711d60" # nexusroyale.online (Instagram Business)
ORG_ID = "6aac7d8affe27497368b98c8"
MCP_URL = "https://mcp.buffer.com/mcp"
AUTH_URL = "https://auth.buffer.com/token"

def get_tokens():
    with open(TOKEN_FILE, "r") as f:
        data = json.load(f)
    return data.get(MCP_URL, {})

def save_tokens(token_data):
    with open(TOKEN_FILE, "r") as f:
        data = json.load(f)
    data[MCP_URL] = token_data
    with open(TOKEN_FILE, "w") as f:
        json.dump(data, f, indent=2)

def refresh_access_token():
    tdata = get_tokens()
    refresh_token = tdata.get("token", {}).get("refresh_token")
    client_id = tdata.get("client_id")
    print("Refreshing access token...")
    body = f"grant_type=refresh_token&refresh_token={refresh_token}&client_id={client_id}".encode("utf-8")
    req = urllib.request.Request(
        AUTH_URL,
        data=body,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST"
    )
    ctx = ssl._create_unverified_context()
    with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        new_token = {
            "client_id": client_id,
            "token": {
                "access_token": res["access_token"],
                "token_type": "Bearer",
                "refresh_token": res["refresh_token"],
                "expiry": datetime.now().isoformat()
            },
            "token_url": AUTH_URL
        }
        save_tokens(new_token)
        print(f"Token refreshed successfully! New access token starts with: {res['access_token'][:8]}...")
        return res["access_token"]

def call_mcp(method, name, arguments, retried=False):
    tdata = get_tokens()
    access_token = tdata.get("token", {}).get("access_token")
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream"
    }
    payload = {
        "jsonrpc": "2.0",
        "id": int(time.time()),
        "method": method,
        "params": {
            "name": name,
            "arguments": arguments
        }
    }
    ctx = ssl._create_unverified_context()
    req = urllib.request.Request(
        MCP_URL,
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST"
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=45) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if "error" in data:
                err_msg = str(data["error"])
                if ("Unauthorized" in err_msg or "401" in err_msg) and not retried:
                    refresh_access_token()
                    return call_mcp(method, name, arguments, retried=True)
                raise Exception(f"MCP error: {data['error']}")
            return data.get("result", {})
    except urllib.error.HTTPError as e:
        if (e.code == 401 or e.code == 403) and not retried:
            refresh_access_token()
            return call_mcp(method, name, arguments, retried=True)
        body = e.read().decode("utf-8", errors="ignore")
        raise Exception(f"HTTP {e.code}: {body}")

def schedule_all_posts():
    with open(QUEUE_FILE, "r") as f:
        queue_data = json.load(f)
        
    posts = queue_data.get("posts", [])
    print(f"Loaded {len(posts)} posts from queue manifest.")
    
    # Pre-calculated schedule for Friday, Saturday, Sunday
    # 3 posts per day at 11:00 AM EDT, 3:30 PM EDT, 8:00 PM EDT
    due_times = [
        "2026-09-18T11:00:00-04:00",
        "2026-09-18T15:30:00-04:00",
        "2026-09-18T20:00:00-04:00",
        "2026-09-19T11:00:00-04:00",
        "2026-09-19T15:30:00-04:00",
        "2026-09-19T20:00:00-04:00",
        "2026-09-20T11:00:00-04:00",
        "2026-09-20T15:30:00-04:00",
        "2026-09-20T20:00:00-04:00",
    ]
    
    scheduled_results = []
    
    for idx, p in enumerate(posts):
        due_at = due_times[idx]
        img_name = os.path.basename(p["image"])
        img_url = f"https://nexusroyale.online/queue/{img_name}"
        title = p["title"]
        caption = p["caption"]
        
        print(f"\n[{idx+1}/9] Scheduling '{title}'...")
        print(f"  Due At: {due_at}")
        print(f"  Asset:  {img_url}")
        
        args = {
            "channelId": CHANNEL_ID,
            "schedulingType": "automatic",
            "mode": "customScheduled",
            "dueAt": due_at,
            "text": caption,
            "metadata": {
                "instagram": {
                    "type": "post",
                    "shouldShareToFeed": True
                }
            },
            "assets": [
                {
                    "image": {
                        "url": img_url,
                        "metadata": {
                            "altText": title
                        }
                    }
                }
            ]
        }
        
        try:
            res = call_mcp("tools/call", "create_post", args)
            content = res.get("content", [])
            post_info = {}
            for c in content:
                txt = c.get("text", "")
                try:
                    parsed = json.loads(txt)
                    if "id" in parsed:
                        post_info = parsed
                except Exception:
                    pass
                    
            print(f"  ✅ SUCCESS: Post ID: {post_info.get('id', 'Created')} | Status: {post_info.get('status', 'scheduled')}")
            scheduled_results.append({
                "index": idx + 1,
                "id": post_info.get("id"),
                "title": title,
                "dueAt": due_at,
                "status": post_info.get("status", "scheduled"),
                "imageUrl": img_url
            })
        except Exception as e:
            print(f"  ❌ ERROR scheduling post {idx+1}: {e}")
            
        time.sleep(2) # rate limit politeness
        
    print("\n" + "="*60)
    print("ALL 9 POSTS PROCESSED!")
    print(json.dumps(scheduled_results, indent=2))
    
    # Save schedule report
    report_file = os.path.join(os.path.dirname(__file__), "..", "..", "Socials", "schedule_report.json")
    with open(report_file, "w") as f:
        json.dump(scheduled_results, f, indent=2)
    print(f"Report saved to {report_file}")

if __name__ == "__main__":
    schedule_all_posts()
