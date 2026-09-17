#!/usr/bin/env python3
"""
Nexus Royale - Supercell Blog & Game Server Live Telemetry Watcher
Continuously tracks official updates from:
1. https://supercell.com/en/games/clashroyale/blog/
2. Supercell Clash Royale API (/v1/cards)
Generates official_news.json and flags changes for automated CI/CD deployment.
"""

import json
import os
import re
import ssl
import sys
import urllib.request
from datetime import datetime, timezone

BLOG_URL = "https://supercell.com/en/games/clashroyale/blog/"
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "..", "official_news.json")

def get_ssl_context():
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    return ctx

def fetch_supercell_blog():
    print(f"[{datetime.now().isoformat()}] Fetching Supercell Blog: {BLOG_URL}...")
    req = urllib.request.Request(
        BLOG_URL,
        headers={"User-Agent": "Mozilla/5.0 (Nexus Royale Bot/1.0; +https://nexusroyale.online)"}
    )
    with urllib.request.urlopen(req, context=get_ssl_context(), timeout=15) as resp:
        html = resp.read().decode("utf-8")

    match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
    if not match:
        raise ValueError("Could not find __NEXT_DATA__ script in Supercell blog HTML")

    data = json.loads(match.group(1))
    articles = data.get("props", {}).get("pageProps", {}).get("articles", [])
    print(f"Found {len(articles)} articles from Supercell Blog.")
    return articles

def fetch_article_details(relative_url):
    full_url = f"https://supercell.com{relative_url}"
    print(f"Fetching article details: {full_url}...")
    try:
        req = urllib.request.Request(
            full_url,
            headers={"User-Agent": "Mozilla/5.0 (Nexus Royale Bot/1.0)"}
        )
        with urllib.request.urlopen(req, context=get_ssl_context(), timeout=15) as resp:
            html = resp.read().decode("utf-8")

        match = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', html)
        if not match:
            return []

        data = json.loads(match.group(1))
        props = data.get("props", {}).get("pageProps", {})
        body_items = props.get("bodyCollection", [])

        sections = []
        for it in body_items:
            title = it.get("title", "")
            raw = json.dumps(it)
            values = re.findall(r'"value":\s*"(.*?)"', raw)
            clean_text = " ".join([v.replace("\\n", " ").strip() for v in values if v.strip()])
            if title or clean_text:
                sections.append({
                    "title": title,
                    "text": clean_text[:300]
                })
        return sections
    except Exception as e:
        print(f"Could not fetch article details for {full_url}: {e}")
        return []

def run_sync():
    try:
        articles = fetch_supercell_blog()
        parsed_news = []

        for i, a in enumerate(articles[:6]):
            link_url = a.get("linkUrl", "")
            entry = {
                "title": a.get("title", "Untitled Update"),
                "publishDate": a.get("publishDate", ""),
                "category": a.get("category", "Clash Royale"),
                "url": f"https://supercell.com{link_url}",
                "thumbnail": a.get("thumbnail", {}).get("imgUrl", ""),
                "isSmallNews": a.get("isSmallNews", False)
            }

            # If it's a balance change or season article, parse top details
            if i < 2 and ("balance" in entry["title"].lower() or "season" in entry["title"].lower()):
                entry["highlights"] = fetch_article_details(link_url)[:5]

            parsed_news.append(entry)

        payload = {
            "lastChecked": datetime.now(timezone.utc).isoformat(),
            "source": BLOG_URL,
            "latestUpdateTitle": parsed_news[0]["title"] if parsed_news else "",
            "latestPublishDate": parsed_news[0]["publishDate"] if parsed_news else "",
            "articles": parsed_news
        }

        # Check if changed
        has_changed = True
        if os.path.exists(OUTPUT_FILE):
            try:
                with open(OUTPUT_FILE, "r") as f:
                    old_data = json.load(f)
                    if old_data.get("latestUpdateTitle") == payload["latestUpdateTitle"] and \
                       old_data.get("latestPublishDate") == payload["latestPublishDate"]:
                        has_changed = False
            except Exception:
                pass

        with open(OUTPUT_FILE, "w") as f:
            json.dump(payload, f, indent=2)

        print(f"Successfully wrote {len(parsed_news)} updates to {OUTPUT_FILE}")
        if has_changed:
            print("⚡ NEW UPDATE DETECTED from Supercell!")
            print(f"Latest: {payload['latestUpdateTitle']} ({payload['latestPublishDate']})")
        else:
            print("No new articles since last check. File refreshed.")

        return has_changed

    except Exception as e:
        print(f"Error during Supercell blog sync: {e}", file=sys.stderr)
        return False

if __name__ == "__main__":
    changed = run_sync()
    sys.exit(0)
