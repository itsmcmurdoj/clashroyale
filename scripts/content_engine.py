#!/usr/bin/env python3
"""
Nexus Royale — Automated Social Media Content Engine
Generates daily minimalist, esports-grade social media posts featuring official Clash Royale
card portraits, 2026 slot badges (Evo/Hero/Wild), and Supercell Fan Content policy compliance.

Outputs 1080x1080 graphics and drafts captions for Socials/queue/
"""

import json
import os
import sys
from datetime import datetime, timezone
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SOCIALS_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "Socials"))
QUEUE_DIR = os.path.join(SOCIALS_DIR, "queue")
QUEUE_FILE = os.path.join(SOCIALS_DIR, "content_queue.json")
CARDS_DIR = os.path.join(SOCIALS_DIR, "assets", "cards")

os.makedirs(QUEUE_DIR, exist_ok=True)
os.makedirs(CARDS_DIR, exist_ok=True)

FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"

def get_font(size, bold=False):
    index = 1 if bold else 0
    try:
        return ImageFont.truetype(FONT_PATH, size, index=index)
    except Exception:
        return ImageFont.load_default()

def create_base_canvas():
    return Image.new("RGB", (1080, 1080), color="#090d16")

def draw_standard_header(draw, category, headline):
    # Top Brand Mark
    draw.text((70, 55), "NEXUS ", font=get_font(22, bold=True), fill="#ffffff")
    bbox = draw.textbbox((70, 55), "NEXUS ", font=get_font(22, bold=True))
    draw.text((bbox[2], 55), "ROYALE", font=get_font(22, bold=True), fill="#d8b878")
    
    # Category Kicker
    draw.text((70, 100), category.upper(), font=get_font(16, bold=True), fill="#26ece8")
    
    # Headline
    draw.text((70, 130), headline.upper(), font=get_font(44, bold=True), fill="#ffffff", spacing=6)

def draw_standard_footer(draw):
    draw.line([(70, 1000), (1010, 1000)], fill="#1e293b", width=1)
    draw.text((70, 1018), "nexusroyale.online", font=get_font(18, bold=False), fill="#64748b")
    draw.text((360, 1018), "Unofficial Supercell Fan Content • supercell.com/fan-content-policy", font=get_font(13, bold=False), fill="#475569")
    draw.text((820, 1018), "CODE: NEXUS", font=get_font(18, bold=True), fill="#26ece8")

def paste_card(canvas, card_filename, pos, size=(175, 257)):
    fp = os.path.join(CARDS_DIR, card_filename)
    if os.path.exists(fp):
        try:
            c = Image.open(fp).convert("RGBA")
            c = c.resize(size, Image.Resampling.LANCZOS)
            canvas.paste(c, pos, c)
            return True
        except Exception as e:
            print(f"Error pasting {card_filename}: {e}")
    return False

# -------------------------------------------------------------
# 1. Meta Deck Spotlight Post (8-Card Grid)
# -------------------------------------------------------------
def generate_meta_spotlight():
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_standard_header(draw, "01 / DAILY META DECK SPOTLIGHT", "HERO ICE WIZARD PEKKA CONTROL")

    # Stat Banner
    draw.rectangle([70, 240, 1010, 345], fill="#111827", outline="#1e293b", width=1)
    draw.text((95, 255), "GLOBAL LEADERBOARD: #1 ULTIMATE CHAMPION", font=get_font(15, bold=True), fill="#d8b878")
    
    draw.text((95, 280), "58.6% WIN RATE", font=get_font(46, bold=True), fill="#10b981")
    draw.text((510, 290), "PILOT: MOHAMED LIGHT", font=get_font(18, bold=True), fill="#ffffff")
    draw.text((510, 316), "AVG ELIXIR: 3.6 • USE RATE: 11.4%", font=get_font(16, bold=False), fill="#94a3b8")

    # 8-Card Grid
    row1 = [
        ("pekka_evo.png", "EVO SLOT", "#c084fc"),
        ("ice-wizard_hero.png", "HERO SLOT", "#eab308"),
        ("knight_hero.png", "WILD SLOT", "#06b6d4"),
        ("baby-dragon.png", "SUPPORT", "#94a3b8")
    ]
    
    row2 = [
        ("bandit.png", "MINI TANK", "#94a3b8"),
        ("electro-spirit.png", "CYCLE", "#94a3b8"),
        ("poison.png", "BIG SPELL", "#94a3b8"),
        ("zap.png", "RESET", "#94a3b8")
    ]

    card_w, card_h = 195, 287
    xs = [70, 320, 570, 815]
    
    # Row 1
    y1 = 365
    for i, (fn, tag, col) in enumerate(row1):
        x = xs[i]
        paste_card(img, fn, (x, y1), size=(card_w, card_h))
        # Draw slot badge above card
        draw.rectangle([x, y1 + card_h - 26, x + card_w, y1 + card_h], fill="#0f172a")
        draw.text((x + 10, y1 + card_h - 22), tag, font=get_font(13, bold=True), fill=col)

    # Row 2
    y2 = 680
    for i, (fn, tag, col) in enumerate(row2):
        x = xs[i]
        paste_card(img, fn, (x, y2), size=(card_w, card_h))
        draw.rectangle([x, y2 + card_h - 26, x + card_w, y2 + card_h], fill="#0f172a")
        draw.text((x + 10, y2 + card_h - 22), tag, font=get_font(13, bold=True), fill=col)

    draw_standard_footer(draw)
    
    out_file = os.path.join(QUEUE_DIR, "post_1_meta_deck.jpg")
    img.save(out_file, quality=95)
    
    caption = (
        "👑 S+ TIER SPOTLIGHT: Hero Ice Wizard PEKKA Control\n\n"
        "Mohamed Light's signature Season 87 deck holds an overwhelming 58.6% win rate on the global Ultimate Champion leaderboard.\n\n"
        "Key 2026 Slot Alignment:\n"
        "🟣 Evo Slot: P.E.K.K.A (Sustained frontline heal)\n"
        "🟡 Hero Slot: Hero Ice Wizard (1-Elixir Frost Surge freeze)\n"
        "🔵 Wild Slot: Knight (Iron Bulwark 70% damage reduction)\n\n"
        "Full 8 Cards: Ice Wizard, PEKKA, Knight, Zap, Poison, Electro Spirit, Bandit, Baby Dragon.\n\n"
        "⚔️ 1-Tap Copy this deck directly into your Clash Royale app at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #ClashRoyaleMeta #MohamedLight #PEKKA #NexusRoyale #Esports #ClashRoyaleDeck #CRL"
    )
    
    return {
        "id": "meta_spotlight_icewiz",
        "title": "Daily Meta Deck: Hero Ice Wizard PEKKA Control",
        "type": "Meta Spotlight",
        "image": "queue/post_1_meta_deck.jpg",
        "caption": caption,
        "status": "Ready to Post"
    }

# -------------------------------------------------------------
# 2. Balance Shifts Post (Real Card Portraits + Delta Badges)
# -------------------------------------------------------------
def generate_balance_shifts():
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_standard_header(draw, "02 / LIVE BALANCE INTELLIGENCE", "EMERGENCY BALANCE TELEMETRY")

    shifts = [
        ("ice-wizard_hero.png", "HERO ICE WIZARD", "NERF", "-29%", "Freeze Duration: 7.0s ➔ 5.0s", "Frost Surge no longer halts entire 7-elixir pushes single-handedly.", "#ef4444"),
        ("giant.png", "MINION GIANT", "NERF", "-11%", "Tower DPS: 189 ➔ 168 damage", "Reduces tower melt speed while preserving frontline tank HP.", "#ef4444"),
        ("goblinstein.png", "GOBLINSTEIN", "NERF", "-13%", "Tether Duration: 4.0s ➔ 3.5s", "Tones down lightning chain lock duration on defense.", "#ef4444"),
        ("fire-spirit.png", "FIRE SPIRIT", "BUFF", "+4%", "Splash Damage: 207 ➔ 215", "Guarantees complete one-shot wipe on evolved goblin swarms.", "#10b981")
    ]

    y = 250
    cw, ch = 95, 140
    for fn, name, btype, pct, stat, note, col in shifts:
        draw.rectangle([70, y, 1010, y + 160], fill="#111827", outline="#1e293b", width=1)
        paste_card(img, fn, (90, y + 10), size=(cw, ch))
        
        # Name and Delta Pill
        draw.text((210, y + 20), name, font=get_font(22, bold=True), fill="#ffffff")
        pill_text = f"{btype}: {pct}"
        pbbox = draw.textbbox((760, y + 20), pill_text, font=get_font(16, bold=True))
        draw.rectangle([pbbox[0]-12, y+16, pbbox[2]+12, y+44], fill=col)
        draw.text((760, y + 20), pill_text, font=get_font(16, bold=True), fill="#ffffff")
        
        # Stat breakdown & note
        draw.text((210, y + 62), stat, font=get_font(18, bold=True), fill="#e2e8f0")
        draw.text((210, y + 100), note, font=get_font(15, bold=False), fill="#94a3b8")
        y += 182

    draw_standard_footer(draw)
    
    out_file = os.path.join(QUEUE_DIR, "post_2_balance_shifts.jpg")
    img.save(out_file, quality=95)
    
    caption = (
        "⚡ BREAKING SUPERCELL TELEMETRY: September 16th Emergency Balance Update\n\n"
        "Supercell just pushed a mid-season balance patch directly affecting Hero and Evolution interactions:\n\n"
        "🔻 Hero Ice Wizard: Freeze duration cut from 7s to 5s (-29%). Still S-tier, but counter-play timing is significantly more forgiving.\n"
        "🔻 Minion Giant: Damage reduced from 189 to 168 (-11%).\n"
        "🔻 Goblinstein: Tether ability duration reduced from 4s to 3.5s (-13%).\n"
        "🔺 Fire Spirit: Damage buffed to 215 (+4%), making it one-shot higher-level swarm troops.\n\n"
        "See full real-time deck win-rate shifts and counter analytics at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #ClashRoyaleUpdate #BalanceChanges #Supercell #NexusRoyale #ClashRoyaleNews #Gaming"
    )
    
    return {
        "id": "balance_shifts_sept16",
        "title": "Emergency Balance Update Breakdown",
        "type": "Balance Intelligence",
        "image": "queue/post_2_balance_shifts.jpg",
        "caption": caption,
        "status": "Ready to Post"
    }

# -------------------------------------------------------------
# 3. Counter This Card Post (Target vs Counters)
# -------------------------------------------------------------
def generate_counter_guide():
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_standard_header(draw, "03 / TACTICAL COUNTER-PLAY", "HOW TO COUNTER HERO ICE WIZARD")

    # Left Box: Target Threat
    draw.rectangle([70, 240, 380, 970], fill="#111827", outline="#1e293b", width=1)
    draw.rectangle([70, 240, 380, 280], fill="#ef4444")
    draw.text((105, 252), "TARGET THREAT: S-TIER", font=get_font(15, bold=True), fill="#ffffff")
    
    paste_card(img, "ice-wizard_hero.png", (105, 305), size=(240, 353))
    
    draw.text((95, 680), "HERO ICE WIZARD", font=get_font(22, bold=True), fill="#ffffff")
    draw.text((95, 715), "Cost: 3⚡ + 1⚡ Ability", font=get_font(16, bold=False), fill="#d8b878")
    draw.text((95, 750), "Frost Surge 5s freeze stops\nall incoming tank momentum.\nRequires precise positive\nelixir trades.", font=get_font(15, bold=False), fill="#94a3b8", spacing=6)

    # Right Box: 3 Verified Counters
    counters = [
        ("poison.png", "POISON SPELL", "+0 ELIXIR TRADE", "Drop Poison instantly on deployment. Consistent area DPS denies Frost Surge value and clips support units.", "#06b6d4"),
        ("guards.png", "SPLIT GUARDS", "+1 ELIXIR TRADE", "Deploy Guards centered split-lane. Shields absorb freeze blast; dual lanes avoid cluster wipe.", "#10b981"),
        ("bandit.png", "BOSS BANDIT DASH", "+0 ELIXIR TRADE", "Bandit's invulnerable dash frames ignore the Frost Surge freeze zone entirely and assassinate him.", "#06b6d4")
    ]

    y = 240
    for fn, name, trade, desc, col in counters:
        draw.rectangle([410, y, 1010, y + 230], fill="#111827", outline="#1e293b", width=1)
        paste_card(img, fn, (430, y + 20), size=(130, 191))
        
        draw.text((580, y + 25), name, font=get_font(22, bold=True), fill="#ffffff")
        
        # Trade Pill
        tbbox = draw.textbbox((580, y + 62), trade, font=get_font(15, bold=True))
        draw.rectangle([tbbox[0]-8, y+58, tbbox[2]+8, y+86], fill=col)
        draw.text((580, y + 62), trade, font=get_font(15, bold=True), fill="#0f172a" if col == "#10b981" else "#ffffff")
        
        # Desc
        draw.text((580, y + 105), desc, font=get_font(15, bold=False), fill="#94a3b8", spacing=6)
        y += 250

    draw_standard_footer(draw)
    
    out_file = os.path.join(QUEUE_DIR, "post_3_counter_play.jpg")
    img.save(out_file, quality=95)
    
    caption = (
        "🧠 TACTICAL DECODE: How to Counter Hero Ice Wizard (Season 87)\n\n"
        "Struggling against the 1-Elixir Frost Surge freeze in Grand Challenges? Here are the 3 math-verified counter trades:\n\n"
        "1. POISON SPELL (+0 Trade): Consistent area denial. Eliminates Ice Wizard while clipping supporting units.\n"
        "2. SPLIT SURROUND (+1 to +2 Trade): Guards or Goblins placed centered split-lane force the freeze to waste on single targets.\n"
        "3. BOSS BANDIT DASH (+0 Trade): Bandit's invulnerability frames dash straight through the freeze effect directly onto him.\n\n"
        "Simulate any matchup with our Combat Simulator at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #ClashRoyaleStrategy #ClashRoyaleTips #NexusRoyale #MobileEsports #ClashRoyaleCoaching"
    )
    
    return {
        "id": "counter_hero_icewiz",
        "title": "Tactical Guide: Counter Hero Ice Wizard",
        "type": "Strategy Guide",
        "image": "queue/post_3_counter_play.jpg",
        "caption": caption,
        "status": "Ready to Post"
    }

# -------------------------------------------------------------
# 4. 2v2 Competitive Radar (Duo Decks & Synergies)
# -------------------------------------------------------------
def generate_2v2_radar():
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_standard_header(draw, "04 / 2V2 COMPETITIVE LEAGUE", "TOP 10K SYNERGY: PEKKA + GRAVEYARD")

    draw.rectangle([70, 240, 1010, 340], fill="#111827", outline="#1e293b", width=1)
    draw.text((95, 255), "GLOBAL 2V2 LEAGUE • TOP 500 SYNERGY SCORE", font=get_font(15, bold=True), fill="#d8b878")
    draw.text((95, 280), "62.4% DUO WIN RATE", font=get_font(44, bold=True), fill="#10b981")
    draw.text((580, 290), "DUO COMBO: TANK ANCHOR + SPELL PRESSURE", font=get_font(16, bold=False), fill="#94a3b8")

    # Player 1 Deck Panel
    draw.rectangle([70, 360, 1010, 640], fill="#0f172a", outline="#1e293b", width=1)
    draw.text((95, 380), "PLAYER 1 / TANK & EVOLUTION ANCHOR", font=get_font(18, bold=True), fill="#c084fc")
    draw.text((750, 380), "AVG ELIXIR: 3.8", font=get_font(16, bold=False), fill="#94a3b8")
    
    p1_cards = ["pekka_evo.png", "executioner.png", "knight_hero.png", "zap.png"]
    p1_xs = [95, 325, 555, 785]
    for i, fn in enumerate(p1_cards):
        paste_card(img, fn, (p1_xs[i], 420), size=(135, 198))

    # Player 2 Deck Panel
    draw.rectangle([70, 660, 1010, 940], fill="#0f172a", outline="#1e293b", width=1)
    draw.text((95, 680), "PLAYER 2 / SPELL PRESSURE & CONTROL", font=get_font(18, bold=True), fill="#26ece8")
    draw.text((750, 680), "AVG ELIXIR: 3.3", font=get_font(16, bold=False), fill="#94a3b8")
    
    p2_cards = ["graveyard.png", "tornado.png", "baby-dragon.png", "poison.png"]
    for i, fn in enumerate(p2_cards):
        paste_card(img, fn, (p1_xs[i], 720), size=(135, 198))

    draw_standard_footer(draw)
    
    out_file = os.path.join(QUEUE_DIR, "post_4_2v2_radar.jpg")
    img.save(out_file, quality=95)
    
    caption = (
        "⚡ 2V2 RADAR: The #1 Duo Combo Dominating Competitive League (62.4% WR)\n\n"
        "In 2v2 Competitive League, single-lane beatdown fails against double spells. The top 10K meta is dominated by the PEKKA Anchor + Graveyard Dual Pressure system:\n\n"
        "Player 1: High DPS Tank Buster (Evo PEKKA + Hero Knight)\n"
        "Player 2: Continuous Spell Pressure (Graveyard + Poison + Tornado)\n\n"
        "Tornado groups enemy defenders directly into Player 1's Executioner axe line, creating unbeatable counter-pushes.\n\n"
        "Inspect your own 2v2 League rating and rank predictions live at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #ClashRoyale2v2 #2v2League #NexusRoyale #ClashRoyaleCommunity #Supercell"
    )
    
    return {
        "id": "radar_2v2_pekka_gy",
        "title": "2v2 Radar: PEKKA + Graveyard Duo Combo",
        "type": "2v2 Radar",
        "image": "queue/post_4_2v2_radar.jpg",
        "caption": caption,
        "status": "Ready to Post"
    }

def main():
    print(f"[{datetime.now().isoformat()}] Running Nexus Royale Content Engine...")
    
    posts = [
        generate_meta_spotlight(),
        generate_balance_shifts(),
        generate_counter_guide(),
        generate_2v2_radar()
    ]
    
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "totalPosts": len(posts),
        "posts": posts
    }
    
    with open(QUEUE_FILE, "w") as f:
        json.dump(payload, f, indent=2)
        
    print(f"Successfully generated {len(posts)} daily posts into {QUEUE_DIR}")
    print(f"Queue index written to {QUEUE_FILE}")

if __name__ == "__main__":
    main()
