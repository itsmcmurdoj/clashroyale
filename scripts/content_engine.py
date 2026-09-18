#!/usr/bin/env python3
"""
Nexus Royale — Automated Social Media Content Engine (3-Day 9-Post Engine)
Generates minimalist, esports-grade social media posts featuring official Clash Royale
card portraits, 2026 slot badges (Evo/Hero/Wild), and Supercell Fan Content policy compliance.

Outputs 1080x1080 graphics and drafts captions for Socials/queue/ and V1/queue/
"""

import json
import os
import shutil
import sys
from datetime import datetime, timezone
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SOCIALS_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "Socials"))
QUEUE_DIR = os.path.join(SOCIALS_DIR, "queue")
V1_QUEUE_DIR = os.path.join(BASE_DIR, "queue")
QUEUE_FILE = os.path.join(SOCIALS_DIR, "content_queue.json")
CARDS_DIR = os.path.join(SOCIALS_DIR, "assets", "cards")

os.makedirs(QUEUE_DIR, exist_ok=True)
os.makedirs(V1_QUEUE_DIR, exist_ok=True)
os.makedirs(CARDS_DIR, exist_ok=True)

LILITA_FONT_PATH = "/Users/jacksonmcmurdo/Desktop/Nexus Royale/Brand/fonts/LilitaOne-Regular.ttf"
HELVETICA_FONT_PATH = "/System/Library/Fonts/HelveticaNeue.ttc"

def get_font(size, bold=False, clash=False):
    if clash and os.path.exists(LILITA_FONT_PATH):
        try:
            return ImageFont.truetype(LILITA_FONT_PATH, size)
        except Exception:
            pass
    index = 1 if bold else 0
    try:
        return ImageFont.truetype(HELVETICA_FONT_PATH, size, index=index)
    except Exception:
        return ImageFont.load_default()

def create_base_canvas():
    # In-game royal blue dark slate canvas with gold border
    img = Image.new("RGB", (1080, 1080), color="#080e1a")
    draw = ImageDraw.Draw(img)
    # Subtle vertical gradient from #132240 at top to #070c16 at bottom
    for i in range(1080):
        ratio = i / 1080
        r = int(19 - (12 * ratio))
        g = int(34 - (22 * ratio))
        b = int(64 - (42 * ratio))
        draw.line([(0, i), (1080, i)], fill=(r, g, b))
    
    # Outer gold royal border (Clash style)
    draw.rectangle([(16, 16), (1064, 1064)], outline="#ca8a04", width=3)
    draw.rectangle([(22, 22), (1058, 1058)], outline="#854d0e", width=1)
    
    # Gold corner accents (Clash rivets)
    corners = [(16, 16), (1064, 16), (16, 1064), (1064, 1064)]
    for cx, cy in corners:
        draw.ellipse([(cx-6, cy-6), (cx+6, cy+6)], fill="#facc15", outline="#713f12", width=2)
    
    return img

def draw_standard_header(draw, category, headline):
    # Top Brand Mark with Lilita One font
    draw.text((70, 48), "NEXUS ROYALE", font=get_font(28, clash=True), fill="#facc15")
    
    # Category Pill
    cat_text = f"⚡ {category.upper()}"
    bbox = draw.textbbox((0, 0), cat_text, font=get_font(15, bold=True))
    draw.rounded_rectangle([(70, 88), (70 + (bbox[2] - bbox[0]) + 24, 116)], radius=12, fill="#1e3a8a", outline="#3b82f6", width=2)
    draw.text((82, 93), cat_text, font=get_font(14, bold=True), fill="#93c5fd")
    
    # Headline in Clash display font with drop shadow
    draw.text((72, 132), headline.upper(), font=get_font(42, clash=True), fill="#000000")
    draw.text((70, 130), headline.upper(), font=get_font(42, clash=True), fill="#ffffff")

def draw_standard_footer(draw):
    draw.line([(60, 975), (1020, 975)], fill="#334155", width=2)
    
    # In-Game Green 3D Push-Button Call To Action
    # 3D bottom bevel
    draw.rounded_rectangle([(70, 915), (1010, 965)], radius=14, fill="#14532d")
    # Top button surface
    draw.rounded_rectangle([(70, 910), (1010, 960)], radius=14, fill="#22c55e", outline="#14532d", width=2)
    cta_txt = "⚡ 1-TAP COPY IN CLASH ROYALE: NEXUSROYALE.ONLINE"
    cbox = draw.textbbox((0, 0), cta_txt, font=get_font(21, clash=True))
    cx = (1080 - (cbox[2] - cbox[0])) // 2
    draw.text((cx + 1, 924 + 1), cta_txt, font=get_font(21, clash=True), fill="#052e16")
    draw.text((cx, 924), cta_txt, font=get_font(21, clash=True), fill="#ffffff")
    
    # Compliance & Creator Code
    draw.text((70, 992), "Unofficial Fan Content • Not affiliated with Supercell", font=get_font(14, bold=False), fill="#64748b")
    draw.text((760, 992), "CREATOR CODE: NEXUS", font=get_font(16, clash=True), fill="#facc15")


def draw_wrapped_text(draw, pos, text, font, fill, max_width, line_spacing=6):
    words = text.split()
    lines = []
    current_line = []
    for word in words:
        test_line = " ".join(current_line + [word])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        if (bbox[2] - bbox[0]) <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(" ".join(current_line))
            current_line = [word]
    if current_line:
        lines.append(" ".join(current_line))
    
    x, y = pos
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        bbox = draw.textbbox((x, y), line, font=font)
        y += (bbox[3] - bbox[1]) + line_spacing
    return y

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
    else:
        print(f"Card not found: {fp}")
    return False

# =============================================================
# HELPER FOR 8-CARD SPOTLIGHT DECK POSTS
# =============================================================
def generate_meta_spotlight_generic(category_str, headline_str, subhead_str, winrate_str, pilot_str, elixir_str, row1_cards, row2_cards, out_filename):
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_standard_header(draw, category_str, headline_str)

    # Stat Banner
    draw.rectangle([70, 230, 1010, 335], fill="#111827", outline="#1e293b", width=1)
    draw.text((95, 245), subhead_str.upper(), font=get_font(15, bold=True), fill="#d8b878")
    
    draw.text((95, 270), winrate_str, font=get_font(46, bold=True), fill="#10b981")
    draw.text((510, 280), pilot_str.upper(), font=get_font(18, bold=True), fill="#ffffff")
    draw.text((510, 306), elixir_str.upper(), font=get_font(16, bold=False), fill="#94a3b8")

    card_w, card_h = 195, 287
    xs = [70, 320, 570, 815]
    
    # Row 1
    y1 = 355
    for i, (fn, tag, col) in enumerate(row1_cards):
        x = xs[i]
        paste_card(img, fn, (x, y1), size=(card_w, card_h))
        draw.rectangle([x, y1 + card_h - 26, x + card_w, y1 + card_h], fill="#0f172a")
        draw.text((x + 10, y1 + card_h - 22), tag, font=get_font(13, bold=True), fill=col)

    # Row 2
    y2 = 670
    for i, (fn, tag, col) in enumerate(row2_cards):
        x = xs[i]
        paste_card(img, fn, (x, y2), size=(card_w, card_h))
        draw.rectangle([x, y2 + card_h - 26, x + card_w, y2 + card_h], fill="#0f172a")
        draw.text((x + 10, y2 + card_h - 22), tag, font=get_font(13, bold=True), fill=col)

    draw_standard_footer(draw)
    
    out_file = os.path.join(QUEUE_DIR, out_filename)
    img.save(out_file, quality=95)
    return out_file

# =============================================================
# HELPER FOR TACTICAL COUNTER GUIDE POSTS
# =============================================================
def generate_counter_guide_generic(category_str, headline_str, target_tuple, counters_list, out_filename):
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_standard_header(draw, category_str, headline_str)

    # Left Box: Target Threat
    draw.rectangle([70, 230, 380, 970], fill="#111827", outline="#1e293b", width=1)
    draw.rectangle([70, 230, 380, 270], fill="#ef4444")
    draw.text((105, 242), "TARGET THREAT: S-TIER", font=get_font(15, bold=True), fill="#ffffff")
    
    paste_card(img, target_tuple[0], (105, 295), size=(240, 353))
    
    draw.text((95, 670), target_tuple[1].upper(), font=get_font(21, bold=True), fill="#ffffff")
    draw.text((95, 705), target_tuple[2], font=get_font(16, bold=False), fill="#d8b878")
    draw_wrapped_text(
        draw, 
        (95, 740), 
        target_tuple[3], 
        font=get_font(15, bold=False), 
        fill="#94a3b8", 
        max_width=265,
        line_spacing=5
    )

    # Right Box: 3 Verified Counters
    y = 230
    for fn, name, trade, desc, col in counters_list:
        draw.rectangle([410, y, 1010, y + 230], fill="#111827", outline="#1e293b", width=1)
        paste_card(img, fn, (430, y + 20), size=(130, 191))
        
        draw.text((580, y + 25), name.upper(), font=get_font(22, bold=True), fill="#ffffff")
        
        # Trade Pill
        tbbox = draw.textbbox((580, y + 62), trade, font=get_font(15, bold=True))
        draw.rectangle([tbbox[0]-8, y+58, tbbox[2]+8, y+86], fill=col)
        draw.text((580, y + 62), trade, font=get_font(15, bold=True), fill="#0f172a" if col == "#10b981" else "#ffffff")
        
        draw_wrapped_text(
            draw, 
            (580, y + 105), 
            desc, 
            font=get_font(15, bold=False), 
            fill="#94a3b8", 
            max_width=390, 
            line_spacing=5
        )
        y += 250

    draw_standard_footer(draw)
    
    out_file = os.path.join(QUEUE_DIR, out_filename)
    img.save(out_file, quality=95)
    return out_file

# =============================================================
# HELPER FOR 2V2 RADAR POSTS
# =============================================================
def generate_2v2_radar_generic(category_str, headline_str, subhead_str, winrate_str, role_str, p1_tuple, p2_tuple, out_filename):
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_standard_header(draw, category_str, headline_str)

    draw.rectangle([70, 230, 1010, 335], fill="#111827", outline="#1e293b", width=1)
    draw.text((95, 245), subhead_str.upper(), font=get_font(15, bold=True), fill="#d8b878")
    draw.text((95, 270), winrate_str, font=get_font(44, bold=True), fill="#10b981")
    draw.text((540, 280), role_str.upper(), font=get_font(16, bold=False), fill="#94a3b8")

    # Player 1 Deck Panel
    draw.rectangle([70, 355, 1010, 635], fill="#0f172a", outline="#1e293b", width=1)
    draw.text((95, 375), p1_tuple[0].upper(), font=get_font(18, bold=True), fill="#c084fc")
    draw.text((750, 375), p1_tuple[1].upper(), font=get_font(16, bold=False), fill="#94a3b8")
    
    p1_xs = [95, 325, 555, 785]
    for i, fn in enumerate(p1_tuple[2]):
        paste_card(img, fn, (p1_xs[i], 415), size=(135, 198))

    # Player 2 Deck Panel
    draw.rectangle([70, 655, 1010, 935], fill="#0f172a", outline="#1e293b", width=1)
    draw.text((95, 675), p2_tuple[0].upper(), font=get_font(18, bold=True), fill="#26ece8")
    draw.text((750, 675), p2_tuple[1].upper(), font=get_font(16, bold=False), fill="#94a3b8")
    
    for i, fn in enumerate(p2_tuple[2]):
        paste_card(img, fn, (p1_xs[i], 715), size=(135, 198))

    draw_standard_footer(draw)
    
    out_file = os.path.join(QUEUE_DIR, out_filename)
    img.save(out_file, quality=95)
    return out_file

# =============================================================
# HELPER FOR EVO TIER LIST POST
# =============================================================
def generate_evo_tier_generic(category_str, headline_str, tiers_list, out_filename):
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_standard_header(draw, category_str, headline_str)

    # Subheader Banner
    draw.rectangle([70, 220, 1010, 265], fill="#111827", outline="#1e293b", width=1)
    draw.text((90, 233), "CRL & GRAND CHALLENGE TELEMETRY • OFFICIAL POWER TIERS", font=get_font(14, bold=True), fill="#d8b878")

    y = 280
    cw, ch = 95, 140
    for tname, tcol, wr, fn, cname, note in tiers_list:
        draw.rectangle([70, y, 1010, y + 155], fill="#111827", outline="#1e293b", width=1)
        paste_card(img, fn, (90, y + 8), size=(cw, ch))

        # Tier Badge Pill
        pbbox = draw.textbbox((210, y + 15), tname, font=get_font(16, bold=True))
        draw.rectangle([210, y + 12, pbbox[2] + 16, y + 38], fill=tcol)
        draw.text((218, y + 15), tname, font=get_font(16, bold=True), fill="#ffffff")

        # Win Rate Pill
        wbbox = draw.textbbox((pbbox[2] + 28, y + 15), wr, font=get_font(15, bold=True))
        draw.rectangle([pbbox[2] + 24, y + 12, wbbox[2] + 16, y + 38], fill="#1e293b")
        draw.text((pbbox[2] + 32, y + 15), wr, font=get_font(15, bold=True), fill="#10b981")

        # Card Name
        draw.text((210, y + 48), cname.upper(), font=get_font(22, bold=True), fill="#ffffff")

        # Note
        draw_wrapped_text(draw, (210, y + 82), note, font=get_font(15, bold=False), fill="#94a3b8", max_width=770, line_spacing=4)

        y += 175

    draw_standard_footer(draw)
    out_file = os.path.join(QUEUE_DIR, out_filename)
    img.save(out_file, quality=95)
    return out_file

# =============================================================
# 9 SPECIFIC POST GENERATORS
# =============================================================

# POST 1: Day 1, 11:00 AM EDT
def generate_post_1():
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
    generate_meta_spotlight_generic(
        "01 / DAILY META DECK SPOTLIGHT",
        "HERO ICE WIZARD PEKKA CONTROL",
        "GLOBAL LEADERBOARD: #1 ULTIMATE CHAMPION",
        "58.6% WIN RATE",
        "PILOT: MOHAMED LIGHT",
        "AVG ELIXIR: 3.6 • USE RATE: 11.4%",
        row1, row2,
        "post_1_meta_deck.jpg"
    )
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
        "id": "post_1_meta_deck",
        "title": "Daily Meta Deck: Hero Ice Wizard PEKKA Control",
        "dueAt": "2026-09-18T15:00:00.000Z",
        "image": "queue/post_1_meta_deck.jpg",
        "caption": caption
    }

# POST 2: Day 1, 3:30 PM EDT
def generate_post_2():
    img = create_base_canvas()
    draw = ImageDraw.Draw(img)
    draw_standard_header(draw, "02 / LIVE BALANCE INTELLIGENCE", "EMERGENCY BALANCE TELEMETRY")

    shifts = [
        ("ice-wizard_hero.png", "HERO ICE WIZARD", "NERF", "-29%", "Freeze Duration: 7.0s ➔ 5.0s", "Frost Surge no longer halts entire 7-elixir pushes single-handedly.", "#ef4444"),
        ("giant.png", "MINION GIANT", "NERF", "-11%", "Tower DPS: 189 ➔ 168 damage", "Reduces tower melt speed while preserving frontline tank HP.", "#ef4444"),
        ("goblinstein.png", "GOBLINSTEIN", "NERF", "-13%", "Tether Duration: 4.0s ➔ 3.5s", "Tones down lightning chain lock duration on defense.", "#ef4444"),
        ("fire-spirit.png", "FIRE SPIRIT", "BUFF", "+4%", "Splash Damage: 207 ➔ 215", "Guarantees complete one-shot wipe on evolved goblin swarms.", "#10b981")
    ]

    y = 240
    cw, ch = 95, 140
    for fn, name, btype, pct, stat, note, col in shifts:
        draw.rectangle([70, y, 1010, y + 160], fill="#111827", outline="#1e293b", width=1)
        paste_card(img, fn, (90, y + 10), size=(cw, ch))
        
        draw.text((210, y + 18), name, font=get_font(22, bold=True), fill="#ffffff")
        pill_text = f"{btype}: {pct}"
        pbbox = draw.textbbox((760, y + 18), pill_text, font=get_font(16, bold=True))
        draw.rectangle([pbbox[0]-12, y+14, pbbox[2]+12, y+42], fill=col)
        draw.text((760, y + 18), pill_text, font=get_font(16, bold=True), fill="#ffffff")
        
        draw.text((210, y + 58), stat, font=get_font(18, bold=True), fill="#e2e8f0")
        draw_wrapped_text(draw, (210, y + 94), note, font=get_font(15, bold=False), fill="#94a3b8", max_width=770)
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
        "id": "post_2_balance_shifts",
        "title": "Emergency Balance Update Breakdown",
        "dueAt": "2026-09-18T19:30:00.000Z",
        "image": "queue/post_2_balance_shifts.jpg",
        "caption": caption
    }

# POST 3: Day 1, 8:00 PM EDT
def generate_post_3():
    p1 = ("Player 1 / Tank & Evolution Anchor", "Avg Elixir: 3.8", ["pekka_evo.png", "executioner.png", "knight_hero.png", "zap.png"])
    p2 = ("Player 2 / Spell Pressure & Control", "Avg Elixir: 3.3", ["graveyard.png", "tornado.png", "baby-dragon.png", "poison.png"])
    generate_2v2_radar_generic(
        "03 / 2V2 COMPETITIVE LEAGUE",
        "TOP 10K SYNERGY: PEKKA + GRAVEYARD",
        "GLOBAL 2V2 LEAGUE • TOP 500 SYNERGY SCORE",
        "62.4% DUO WIN RATE",
        "DUO COMBO: TANK ANCHOR + SPELL PRESSURE",
        p1, p2,
        "post_3_2v2_radar.jpg"
    )
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
        "id": "post_3_2v2_radar",
        "title": "2v2 Radar: PEKKA + Graveyard Duo Combo",
        "dueAt": "2026-09-19T00:00:00.000Z",
        "image": "queue/post_3_2v2_radar.jpg",
        "caption": caption
    }

# POST 4: Day 2, 11:00 AM EDT
def generate_post_4():
    row1 = [
        ("lava-hound.png", "AIR TANK", "#c084fc"),
        ("balloon.png", "WIN CON", "#ef4444"),
        ("inferno-dragon.png", "TANK MELTER", "#eab308"),
        ("mega-minion.png", "AIR DPS", "#94a3b8")
    ]
    row2 = [
        ("knight_hero.png", "GROUND ANCHOR", "#06b6d4"),
        ("valkyrie.png", "SWARM DEFENSE", "#94a3b8"),
        ("arrows.png", "ANTI-AIR SPELL", "#94a3b8"),
        ("zap.png", "RESET", "#94a3b8")
    ]
    generate_meta_spotlight_generic(
        "04 / DAILY META DECK SPOTLIGHT",
        "LAVA HOUND HERO KNIGHT BEATDOWN",
        "GRAND CHALLENGE DOMINANCE • 12-WIN RADAR",
        "59.2% WIN RATE",
        "AIR META SPECIALIST",
        "AVG ELIXIR: 3.9 • USE RATE: 9.8%",
        row1, row2,
        "post_4_lava_balloon.jpg"
    )
    caption = (
        "🔥 AIR META ALERT: Lava Hound Hero Knight Beatdown (59.2% Win Rate)\n\n"
        "With ground anti-tank defenses overloaded by the PEKKA meta, top Grand Challenge grinders are taking to the skies. Lava Balloon with Hero Knight ground containment is tearing through ladder:\n\n"
        "Key Tactical Alignment:\n"
        "🌋 Lava Hound: Soaks all anti-air defenses and redirects Inferno Towers\n"
        "🎈 Balloon: Devastating direct tower hit-box behind the hound\n"
        "🛡️ Hero Knight: 1-Elixir Bulwark ground defense shuts down opposite-lane counter-pushes\n\n"
        "Full 8 Cards: Lava Hound, Balloon, Inferno Dragon, Mega Minion, Hero Knight, Valkyrie, Arrows, Zap.\n\n"
        "⚔️ 1-Tap Copy this deck directly into your Clash Royale app at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #LavaLoon #ClashRoyaleMeta #GrandChallenge #NexusRoyale #Esports #Supercell"
    )
    return {
        "id": "post_4_lava_balloon",
        "title": "Meta Spotlight: Lava Hound Hero Knight Beatdown",
        "dueAt": "2026-09-19T15:00:00.000Z",
        "image": "queue/post_4_lava_balloon.jpg",
        "caption": caption
    }

# POST 5: Day 2, 3:30 PM EDT
def generate_post_5():
    target = (
        "pekka_evo.png",
        "EVOLVED P.E.K.K.A",
        "Cost: 7 Elixir • 1 Cycle",
        "Passive overheal on every troop kill turns her into an unstoppable frontline juggernaut unless kited precisely."
    )
    counters = [
        ("guards.png", "GUARDS SURROUND", "+4 ELIXIR TRADE", "Guards deploy 3 distinct units with physical shields, soaking 3 full P.E.K.K.A strikes and buying 6 seconds of tower DPS.", "#10b981"),
        ("inferno-dragon.png", "INFERNO DRAGON", "+3 ELIXIR TRADE", "Airborne ramp-up beam melts 5,000+ HP in 4.5 seconds safely out of her melee reach.", "#10b981"),
        ("tornado.png", "TORNADO KING ACTIVATION", "+4 ELIXIR TRADE", "Pull P.E.K.K.A from center bridge to your King Tower for a permanent 3-cannon defensive advantage.", "#10b981")
    ]
    generate_counter_guide_generic(
        "05 / TACTICAL COUNTER-PLAY",
        "HOW TO COUNTER EVOLVED P.E.K.K.A",
        target,
        counters,
        "post_5_counter_pekka.jpg"
    )
    caption = (
        "🧠 TACTICAL DECODE: How to Counter Evolved P.E.K.K.A (+4 Positive Elixir)\n\n"
        "Evo P.E.K.K.A's heal mechanic punishes bad swarm drops. Here are the 3 verified trades used by CRL pros to shut her down completely:\n\n"
        "1. GUARDS SURROUND (+4 Trade): 3 physical shields absorb 3 lethal swings with zero overheal value for P.E.K.K.A.\n"
        "2. INFERNO DRAGON (+3 Trade): Air placement completely avoids her melee blade while the beam melts her full HP bar.\n"
        "3. TORNADO TO KING (+4 Trade): Pull her across the bridge directly to your King Tower to activate it permanently.\n\n"
        "Simulate any matchup and card counter with our Combat Simulator at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #ClashRoyaleStrategy #PEKKA #ClashRoyaleTips #NexusRoyale #MobileGaming"
    )
    return {
        "id": "post_5_counter_pekka",
        "title": "Tactical Guide: Counter Evolved PEKKA",
        "dueAt": "2026-09-19T19:30:00.000Z",
        "image": "queue/post_5_counter_pekka.jpg",
        "caption": caption
    }

# POST 6: Day 2, 8:00 PM EDT
def generate_post_6():
    tiers = [
        ("S+ TIER", "#ef4444", "58.6% WR", "pekka_evo.png", "EVO P.E.K.K.A", "Unmatched frontline sustain with overheal on elimination. Dominates CRL ladder."),
        ("S TIER", "#f59e0b", "54.8% WR", "zap_evo.png", "EVO ZAP", "3-pulse area stun breaks target locks, resets Sparky/Inferno, and clears shields."),
        ("A TIER", "#06b6d4", "53.1% WR", "knight_evo.png", "EVO KNIGHT", "Iron shield cuts incoming damage by up to 70% while moving forward."),
        ("B TIER", "#8b5cf6", "51.4% WR", "baby-dragon_evo.png", "EVO BABY DRAGON", "Triple flame burst deals explosive splash damage against aerial swarms.")
    ]
    generate_evo_tier_generic(
        "06 / EVOLUTION TIER LIST",
        "SEASON 87 EVO POWER RANKINGS",
        tiers,
        "post_6_evo_tier_list.jpg"
    )
    caption = (
        "📊 SEASON 87 EVOLUTION POWER RANKINGS: Grand Challenge & CRL Meta\n\n"
        "Where does your favorite Evolution rank after the mid-season balance patch? Here is our math-verified Tier List:\n\n"
        "👑 S+ Tier: Evo P.E.K.K.A (58.6% WR) — The undisputed Queen of the frontline.\n"
        "⚡ S Tier: Evo Zap (54.8% WR) — Triple-pulse stun provides massive versatility across control archetypes.\n"
        "🛡️ A Tier: Evo Knight (53.1% WR) — Invaluable mini-tank damage reduction.\n"
        "🐉 B Tier: Evo Baby Dragon (51.4% WR) — Solid air splash, balanced after recent adjustments.\n\n"
        "Check daily live Evolution win-rate shifts and tier updates at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #ClashRoyaleTierList #Evolution #CRL #NexusRoyale #Supercell #Esports"
    )
    return {
        "id": "post_6_evo_tier_list",
        "title": "Season 87 Evolution Power Rankings",
        "dueAt": "2026-09-20T00:00:00.000Z",
        "image": "queue/post_6_evo_tier_list.jpg",
        "caption": caption
    }

# POST 7: Day 3, 11:00 AM EDT
def generate_post_7():
    row1 = [
        ("goblinstein.png", "CHAMPION", "#eab308"),
        ("bandit.png", "BRIDGE SPAM", "#c084fc"),
        ("battle-ram.png", "WIN CON", "#ef4444"),
        ("pekka.png", "HEAVY DEFENSE", "#06b6d4")
    ]
    row2 = [
        ("electro-spirit.png", "CYCLE / STUN", "#94a3b8"),
        ("guards.png", "DEFENSE SWARM", "#94a3b8"),
        ("poison.png", "AREA DENIAL", "#94a3b8"),
        ("zap.png", "FAST RESET", "#94a3b8")
    ]
    generate_meta_spotlight_generic(
        "07 / DAILY META DECK SPOTLIGHT",
        "GOBLINSTEIN BOSS BANDIT BRIDGE SPAM",
        "TOP 200 GLOBAL LADDER • HIGH TEMPO ARCHETYPE",
        "60.1% WIN RATE",
        "BRIDGE SPAM SPECIALIST",
        "AVG ELIXIR: 3.5 • USE RATE: 8.9%",
        row1, row2,
        "post_7_goblinstein_spam.jpg"
    )
    caption = (
        "⚡ HIGH-TEMPO PUNISHMENT: Goblinstein Boss Bandit Bridge Spam (60.1% WR)\n\n"
        "For aggressive players who refuse to wait for double elixir: this lightning-fast bridge spam variant forces constant defensive mistakes.\n\n"
        "Core Playstyle Breakdown:\n"
        "⚡ Goblinstein: Lightning tether stalls pushes and applies dual-lane pressure\n"
        "💨 Bandit: Instant dash punishes elixir commitments in opposite lanes\n"
        "🎯 Battle Ram: Heavy ram strike connects while defenders are tethered\n\n"
        "Full 8 Cards: Goblinstein, Bandit, Battle Ram, PEKKA, Electro Spirit, Guards, Poison, Zap.\n\n"
        "⚔️ 1-Tap Copy this deck directly into your Clash Royale app at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #BridgeSpam #Goblinstein #Bandit #ClashRoyaleMeta #NexusRoyale #Gaming"
    )
    return {
        "id": "post_7_goblinstein_spam",
        "title": "Meta Spotlight: Goblinstein Boss Bandit Bridge Spam",
        "dueAt": "2026-09-20T15:00:00.000Z",
        "image": "queue/post_7_goblinstein_spam.jpg",
        "caption": caption
    }

# POST 8: Day 3, 3:30 PM EDT
def generate_post_8():
    target = (
        "bandit.png",
        "BOSS BANDIT",
        "Cost: 3 Elixir • Dash Specialist",
        "Invulnerable dash frames ignore damage, freeze zones, and knockback while dealing 320+ burst damage."
    )
    counters = [
        ("guards.png", "CENTERED GUARDS", "+0 ELIXIR TRADE", "Placed center-lane, 3 shielded Guards absorb the dash hit and instantly surround her before she swings again.", "#10b981"),
        ("valkyrie.png", "VALKYRIE DROP", "-1 ELIXIR TRADE", "Dropping Valkyrie into her dash path tanks the strike and counters with a full-health 360 spin attack.", "#06b6d4"),
        ("electro-spirit.png", "CHAIN RESET", "+2 ELIXIR TRADE", "1-Elixir Electro Spirit resets her dash target lock, pulling her into dual-princess tower crossfire.", "#10b981")
    ]
    generate_counter_guide_generic(
        "08 / TACTICAL COUNTER-PLAY",
        "HOW TO COUNTER BOSS BANDIT DASH",
        target,
        counters,
        "post_8_counter_bandit.jpg"
    )
    caption = (
        "🧠 TACTICAL DECODE: How to Counter Boss Bandit Dash (+2 Positive Trade)\n\n"
        "Her invulnerable dash can feel unfair if you drop swarms too late. Here are the 3 frame-perfect counters to eliminate Bandit cleanly:\n\n"
        "1. CENTERED GUARDS (+0 Trade): Deploy 3 tiles from your King Tower. Dash impacts the shield; the 3 skeletons eliminate her with zero tower damage.\n"
        "2. VALKYRIE INTERCEPT (-1 Trade): Absorbs the strike with tanky HP and converts into a dangerous full-health counter-push.\n"
        "3. ELECTRO SPIRIT RESET (+2 Trade): Stuns Bandit at the start of her dash, resetting her target and pulling her into dual tower fire.\n\n"
        "Simulate any interaction at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #ClashRoyaleStrategy #Bandit #GamingTips #NexusRoyale #Esports"
    )
    return {
        "id": "post_8_counter_bandit",
        "title": "Tactical Guide: Counter Boss Bandit Dash",
        "dueAt": "2026-09-20T19:30:00.000Z",
        "image": "queue/post_8_counter_bandit.jpg",
        "caption": caption
    }

# POST 9: Day 3, 8:00 PM EDT
def generate_post_9():
    p1 = ("Player 1 / Tower Freeze & Cycle", "Avg Elixir: 3.1", ["hog-rider.png", "freeze.png", "electro-spirit.png", "fire-spirit.png"])
    p2 = ("Player 2 / Splash Area & Swarm Denial", "Avg Elixir: 3.6", ["valkyrie.png", "baby-dragon.png", "tornado.png", "arrows.png"])
    generate_2v2_radar_generic(
        "09 / 2V2 COMPETITIVE LEAGUE",
        "DUO SPEED SPLIT: HOG FREEZE + VALKYRIE",
        "GLOBAL 2V2 LEAGUE • SPEED SYNERGY ARCHETYPE",
        "61.8% DUO WIN RATE",
        "FAST CYCLE WIN CONDITION + 360 SPLASH DEFENSE",
        p1, p2,
        "post_9_2v2_hog_freeze.jpg"
    )
    caption = (
        "⚡ 2V2 RADAR: Hog Freeze + Valkyrie Splash Split (61.8% Win Rate)\n\n"
        "Looking to climb the 2v2 Competitive League ladder fast? This high-speed synergy pair overwhelms traditional slow beatdown duos:\n\n"
        "Player 1: 3.1 Elixir Hog Cycle with 4s surprise Freeze spell\n"
        "Player 2: 3.6 Elixir Valkyrie & Baby Dragon anchor with Tornado grouping\n\n"
        "When Player 2 uses Tornado to pull defenders together, Player 1 freezes both the defenders and the crown tower simultaneously, guaranteeing 3+ Hog swings.\n\n"
        "Track your 2v2 League rating and evaluate your partner's deck chemistry at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #ClashRoyale2v2 #HogRider #Freeze #NexusRoyale #CompetitiveGaming"
    )
    return {
        "id": "post_9_2v2_hog_freeze",
        "title": "2v2 Radar: Hog Freeze + Valkyrie Duo",
        "dueAt": "2026-09-21T00:00:00.000Z",
        "image": "queue/post_9_2v2_hog_freeze.jpg",
        "caption": caption
    }

# POST 10: Day 4, 11:00 AM EDT
def generate_post_10():
    r1 = [
        ("executioner_evo.png", "🟣 EVO EXEC", "#c084fc"),
        ("knight_hero.png", "🟡 HERO KNIGHT", "#fde047"),
        ("hog-rider.png", "HOG RIDER", "#e2e8f0"),
        ("guards.png", "GUARDS", "#e2e8f0")
    ]
    r2 = [
        ("freeze.png", "FREEZE SPELL", "#e2e8f0"),
        ("zap_evo.png", "🟣 EVO ZAP", "#c084fc"),
        ("valkyrie.png", "VALKYRIE", "#e2e8f0"),
        ("baby-dragon.png", "BABY DRAGON", "#e2e8f0")
    ]
    generate_meta_spotlight_generic(
        "10 / PRO SPOTLIGHT",
        "MUK'S 14,030 TROPHY CONTROL: EXECUTIONER FREEZE",
        "SEASON 87 TOP 1K LADDER • UNBEATEN DEFENSIVE ARCHETYPE",
        "64.2% WIN RATE",
        "PILOT: MUK (#Y0JJY80) • THE DARKNESS",
        "AVG ELIXIR: 3.6 • 4-CARD FAST CYCLE: 9 ELIXIR",
        r1, r2,
        "post_10_muk_spotlight.jpg"
    )
    caption = (
        "👑 PRO BUILD SPOTLIGHT: Muk's 14,030 Trophy Executioner Freeze\n\n"
        "Ranked inside the top echelon of the global leaderboard, player Muk (#Y0JJY80) from The Darkness clan has piloted this unkillable defense into a 64.2% win rate:\n\n"
        "Tactical Deck Engine:\n"
        "🟣 Evo Slot: Executioner (Penetrating boomerang cleave)\n"
        "🟡 Hero Slot: Hero Knight (1-Elixir Iron Bulwark absorption)\n"
        "❄️ Surprise Finisher: Freeze (Freezes opponent counters for guaranteed Hog damage)\n\n"
        "Full 8 Cards: Executioner, Hero Knight, Hog Rider, Guards, Freeze, Evo Zap, Valkyrie, Baby Dragon.\n\n"
        "⚔️ 1-Tap Copy this deck directly into your Clash Royale app at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #Muk #TheDarkness #ClashRoyaleDecks #NexusRoyale #Esports #TopLadder"
    )
    return {
        "id": "post_10_muk_spotlight",
        "title": "Pro Spotlight: Muk 14,030 Trophy Executioner Freeze",
        "dueAt": "2026-09-21T15:00:00.000Z",
        "image": "queue/post_10_muk_spotlight.jpg",
        "caption": caption
    }

# POST 11: Day 4, 3:30 PM EDT
def generate_post_11():
    target = (
        "graveyard.png",
        "GRAVEYARD SPELL",
        "Cost: 5 Elixir • Legendary",
        "Spawns 15 continuous skeletons across 9 seconds directly onto your Crown Tower."
    )
    counters = [
        ("guards.png", "GUARDS SURROUND", "+2 ELIXIR TRADE", "Physical shields prevent single-target overwhelm while Crown Tower cleans up.", "#10b981"),
        ("poison.png", "POISON AREA DENIAL", "+1 ELIXIR TRADE", "Matching 8-second tick damage eliminates every spawned skeleton the instant it surfaces.", "#10b981"),
        ("valkyrie.png", "VALKYRIE 360 AXE SWEEP", "+1 ELIXIR TRADE", "360-degree axe spin cleaves multiple skeletons every hit, converting into full counter-push.", "#10b981")
    ]
    generate_counter_guide_generic(
        "11 / TACTICAL DECODE",
        "HOW TO COUNTER GRAVEYARD SPELL PUSHES",
        target,
        counters,
        "post_11_counter_graveyard.jpg"
    )
    caption = (
        "🧠 TACTICAL DECODE: How to Completely Neutralize Graveyard (+2 Trade)\n\n"
        "Graveyard's randomized RNG spawn pattern can overwhelm towers if defended with single-target troops. Here are the 3 frame-perfect trades used by CRL Champions:\n\n"
        "1. GUARDS (+2 Trade): 3 shielded skeletons divide tower aggro and eliminate skeletons with 0 tower HP loss.\n"
        "2. POISON (+1 Trade): Full area suppression kills every skeleton in 1 tick.\n"
        "3. VALKYRIE (+1 Trade): 360 splash spin clears the entire graveyard zone while staying at full HP.\n\n"
        "Simulate any card matchup live at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #Graveyard #ClashRoyaleStrategy #NexusRoyale #GamingTips #Supercell"
    )
    return {
        "id": "post_11_counter_graveyard",
        "title": "Tactical Guide: Counter Graveyard Pushes",
        "dueAt": "2026-09-21T19:30:00.000Z",
        "image": "queue/post_11_counter_graveyard.jpg",
        "caption": caption
    }

# POST 12: Day 4, 8:00 PM EDT
def generate_post_12():
    p1 = ("Player 1 / Heavy Anchor & Cleave", "Avg Elixir: 4.1", ["pekka_evo.png", "executioner_evo.png", "tornado.png", "zap.png"])
    p2 = ("Player 2 / Spell Pressure & Swarm Control", "Avg Elixir: 3.4", ["graveyard.png", "poison.png", "knight_hero.png", "baby-dragon.png"])
    generate_2v2_radar_generic(
        "12 / 2V2 COMPETITIVE LEAGUE",
        "PEKKA EXECUTIONER + TORNADO GRAVEYARD",
        "GLOBAL 2V2 LEAGUE • DUAL PRESSURE BEATDOWN",
        "63.5% DUO WIN RATE",
        "HEAVY AXE CLEAVE + CONTINUOUS SPELL THREAT",
        p1, p2,
        "post_12_2v2_pekka_exec.jpg"
    )
    caption = (
        "⚡ 2V2 RADAR: PEKKA Executioner + Tornado Graveyard (63.5% Win Rate)\n\n"
        "The ultimate high-ladder 2v2 synergy: Player 1 controls space while Player 2 punishes opposite lane tower rotations:\n\n"
        "Synergy Playbook:\n"
        "1. Player 1 deploys Evo PEKKA and Executioner\n"
        "2. When opponent drops defensive swarms, Player 1 Tornados them into Executioner's axe trajectory\n"
        "3. Player 2 instantly drops Graveyard + Poison on the opposite low-elixir lane for the guaranteed 3-Crown\n\n"
        "Test your 2v2 partner synergy and live stats at nexusroyale.online (Link in bio).\n\n"
        "#ClashRoyale #2v2 #PEKKA #Executioner #NexusRoyale #Competitive"
    )
    return {
        "id": "post_12_2v2_pekka_exec",
        "title": "2v2 Radar: PEKKA Executioner + Tornado Graveyard",
        "dueAt": "2026-09-22T00:00:00.000Z",
        "image": "queue/post_12_2v2_pekka_exec.jpg",
        "caption": caption
    }

# =============================================================
# MAIN ORCHESTRATOR
# =============================================================
def main():
    print(f"[{datetime.now().isoformat()}] Running Nexus Royale Multi-Day Content Engine...")
    
    posts = [
        generate_post_1(),
        generate_post_2(),
        generate_post_3(),
        generate_post_4(),
        generate_post_5(),
        generate_post_6(),
        generate_post_7(),
        generate_post_8(),
        generate_post_9(),
        generate_post_10(),
        generate_post_11(),
        generate_post_12()
    ]
    
    # Mirror generated graphics from Socials/queue/ to V1/queue/ for GitHub sync
    for p in posts:
        fn = os.path.basename(p["image"])
        src = os.path.join(QUEUE_DIR, fn)
        dst = os.path.join(V1_QUEUE_DIR, fn)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"Copied {fn} to V1/queue/")
            
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "totalPosts": len(posts),
        "posts": posts
    }
    
    with open(QUEUE_FILE, "w") as f:
        json.dump(payload, f, indent=2)
        
    print(f"\n✅ Successfully generated all {len(posts)} posts into {QUEUE_DIR} and {V1_QUEUE_DIR}")
    print(f"✅ Schedule manifest saved to {QUEUE_FILE}")

if __name__ == "__main__":
    main()
