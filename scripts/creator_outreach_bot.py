#!/usr/bin/env python3
"""
Nexus Royale — Creator Outreach & Pipeline Automation Bot
Manages creator leads, generates personalized DMs & emails, and tracks pipeline status.
"""

import argparse
import json
import os
import sys
from datetime import datetime, timezone

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_FILE = os.path.join(BASE_DIR, "scripts", "creators_leads.json")

# Sample starter leads for Clash Royale creators
DEFAULT_LEADS = [
    {
        "id": "ian77",
        "name": "Ian77",
        "platform": "YouTube",
        "handle": "@Ian77CR",
        "subscribers": "450K",
        "email": "ian77business@gmail.com",
        "recent_topic": "Top 1 Ladder Hog EQ Cycle",
        "status": "ready_to_contact",
        "contact_date": None,
        "notes": "Fast-paced top ladder specialist. High viewer demand for deck links."
    },
    {
        "id": "sirtag",
        "name": "SirTagCR",
        "platform": "YouTube",
        "handle": "@SirTagCR",
        "subscribers": "600K",
        "email": "sirtagbusiness@gmail.com",
        "recent_topic": "New Broken Evolution PEKKA Deck",
        "status": "ready_to_contact",
        "contact_date": None,
        "notes": "Always showcases wacky and meta decks. Perfect for 1-tap deck copy tool."
    },
    {
        "id": "juicyj",
        "name": "Juicy J",
        "platform": "YouTube",
        "handle": "@JuicyJCR",
        "subscribers": "180K",
        "email": "juicyjcr@gmail.com",
        "recent_topic": "Ultimate Champion Miner Poison Control",
        "status": "ready_to_contact",
        "contact_date": None,
        "notes": "Highly engaged competitive community, answers DMs."
    },
    {
        "id": "remieli",
        "name": "RemiEli",
        "platform": "Twitch / YouTube",
        "handle": "@RemiEli",
        "subscribers": "95K",
        "email": "remielicr@gmail.com",
        "recent_topic": "Magic Archer Tornado 2.9 Cycle",
        "status": "ready_to_contact",
        "contact_date": None,
        "notes": "Signature deck specialist. Ideal candidate for dedicated creator page."
    },
    {
        "id": "clash_with_shane",
        "name": "Shane",
        "platform": "YouTube",
        "handle": "@ClashWithShane",
        "subscribers": "320K",
        "email": "shanebusiness@gmail.com",
        "recent_topic": "Goblinstein Bridge Spam Meta",
        "status": "ready_to_contact",
        "contact_date": None,
        "notes": "Daily deck videos, extensive viewer requests for deck links in comments."
    }
]

def load_leads():
    if not os.path.exists(DATA_FILE):
        save_leads(DEFAULT_LEADS)
        return DEFAULT_LEADS
    try:
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading leads file: {e}")
        return DEFAULT_LEADS

def save_leads(leads):
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w") as f:
        json.dump(leads, f, indent=2)

def generate_messages(creator):
    name = creator.get("name", "Creator")
    topic = creator.get("recent_topic", "your recent deck guide")
    platform = creator.get("platform", "YouTube")

    dm_text = (
        f"Hey {name}! Big fan of your content on {platform} — loved your coverage on {topic}!\n\n"
        f"I noticed your viewers constantly ask for deck links in the comments. I built nexusroyale.online — "
        f"it's a free competitive platform that generates 1-tap universal deep links so your viewers can copy "
        f"your exact deck straight into Clash Royale on mobile.\n\n"
        f"I'd love to set up a free custom deck page for your channel (nexusroyale.online/@{creator.get('id', 'creator')}) "
        f"featuring your signature builds and channel link. Zero cost, no catch — just wanted to help your viewers!\n\n"
        f"Would you be open to checking out a quick preview?"
    )

    email_subject = f"Free 1-tap deck copy tool for {name}'s Clash Royale viewers"
    email_body = (
        f"Hi {name},\n\n"
        f"Huge fan of your Clash Royale content — especially your recent video on {topic}.\n\n"
        f"I'm Jackson, founder of Nexus Royale (https://nexusroyale.online), an esports competitive platform. "
        f"One of our core tools is our 1-tap deep link engine, allowing mobile viewers to copy any Clash Royale "
        f"deck directly into the game with a single tap (no searching for cards manually).\n\n"
        f"I would love to set up a free dedicated creator page for your channel (nexusroyale.online/@{creator.get('id', 'creator')}) where:\n"
        f"1. Your viewers can 1-tap copy all your featured video decks.\n"
        f"2. Your channel and stream links are pinned at the top.\n"
        f"3. Your Supercell Creator Code is highlighted whenever a viewer copies a deck.\n\n"
        f"You can test how the 1-tap deck copy works on live decks here: https://nexusroyale.online\n\n"
        f"If you'd like to test a custom page, reply to this email with 2-3 of your current favorite decks "
        f"and I'll have a private link live for you within 24 hours.\n\n"
        f"Best regards,\n"
        f"Jackson McMurdo\n"
        f"Nexus Royale • https://nexusroyale.online"
    )

    follow_up_dm = (
        f"Hey {name}! Just following up on this in case it got buried under your DMs. "
        f"Already drafted a preview layout for {topic} — happy to send over the link whenever you have 30 seconds!"
    )

    return {
        "dm": dm_text,
        "email_subject": email_subject,
        "email_body": email_body,
        "follow_up": follow_up_dm
    }

def cmd_list(leads):
    print("\n" + "="*70)
    print(f"🎯 NEXUS ROYALE CREATOR PIPELINE ({len(leads)} LEADS)")
    print("="*70)
    for idx, c in enumerate(leads, 1):
        status_symbol = "⏳" if c.get("status") == "ready_to_contact" else "📨" if c.get("status") == "contacted" else "🤝"
        print(f"[{idx}] {status_symbol} {c['name']} ({c['platform']} • {c['subscribers']})")
        print(f"    Handle: {c['handle']} | Email: {c.get('email', 'N/A')}")
        print(f"    Topic: {c.get('recent_topic', 'N/A')} | Status: {c.get('status', 'unknown')}")
        if c.get("notes"):
            print(f"    Notes: {c['notes']}")
        print("-" * 70)

def cmd_generate(leads, creator_id=None):
    targets = leads
    if creator_id:
        targets = [c for c in leads if c["id"].lower() == creator_id.lower() or c["name"].lower() == creator_id.lower()]
        if not targets:
            print(f"❌ Creator '{creator_id}' not found.")
            return

    print("\n" + "="*80)
    print("📋 AUTONOMOUS CREATOR OUTREACH PACK (READY TO COPY & SEND)")
    print("="*80)
    for c in targets:
        msgs = generate_messages(c)
        print(f"\n>>> TARGET: {c['name']} ({c['platform']} • {c['subscribers']}) <<<")
        print(f"Target Handle: {c['handle']} | Email: {c.get('email', 'N/A')}\n")
        print("--- [1] INSTAGRAM / TWITTER / DISCORD DM ---")
        print(msgs["dm"])
        print("\n--- [2] EMAIL PITCH ---")
        print(f"Subject: {msgs['email_subject']}\n")
        print(msgs["email_body"])
        print("\n--- [3] 48-HOUR FOLLOW-UP DM ---")
        print(msgs["follow_up"])
        print("\n" + "="*80)

def main():
    parser = argparse.ArgumentParser(description="Nexus Royale Creator Outreach Bot")
    parser.add_argument("--list", action="store_true", help="List all creator leads and status")
    parser.add_argument("--generate", nargs="?", const="all", help="Generate customized outreach copy for a creator or 'all'")
    parser.add_argument("--status", nargs=2, metavar=("CREATOR_ID", "NEW_STATUS"), help="Update creator status (e.g. --status ian77 contacted)")
    parser.add_argument("--add", nargs=5, metavar=("ID", "NAME", "PLATFORM", "HANDLE", "SUBS"), help="Add a new lead: id name platform handle subs")

    args = parser.parse_args()
    leads = load_leads()

    if args.status:
        cid, nstatus = args.status
        found = False
        for c in leads:
            if c["id"].lower() == cid.lower() or c["name"].lower() == cid.lower():
                c["status"] = nstatus
                c["contact_date"] = datetime.now(timezone.utc).isoformat()
                found = True
                print(f"✅ Updated {c['name']} status to '{nstatus}'.")
                break
        if found:
            save_leads(leads)
        else:
            print(f"❌ Creator '{cid}' not found.")
        return

    if args.add:
        cid, name, platform, handle, subs = args.add
        new_lead = {
            "id": cid,
            "name": name,
            "platform": platform,
            "handle": handle,
            "subscribers": subs,
            "email": "",
            "recent_topic": "Current Season Meta",
            "status": "ready_to_contact",
            "contact_date": None,
            "notes": "Added via CLI"
        }
        leads.append(new_lead)
        save_leads(leads)
        print(f"✅ Added {name} to outreach leads.")
        return

    if args.generate:
        target = None if args.generate == "all" else args.generate
        cmd_generate(leads, target)
        return

    # Default to list
    cmd_list(leads)
    print("\nTip: Run `python3 scripts/creator_outreach_bot.py --generate all` to output personalized pitches!")

if __name__ == "__main__":
    main()
