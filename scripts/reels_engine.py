#!/usr/bin/env python3
"""
Nexus Royale — Autonomous Instagram Reels Video Engine (9:16 Vertical Video)
Generates high-retention, broadcast-quality 1080x1920 MP4 Reels engineered specifically
to trigger Instagram's algorithm for cold non-follower reach, automated comment-to-DM
conversions, and massive traffic to nexusroyale.online.

Outputs:
  - 1080x1920 MP4 Video (H.264 / AAC, 30fps)
  - Instagram Reels Safe-Zone Compliant (unblocked by caption & UI buttons)
  - Synchronized Audio FX (Synthesized fanfares, card whooshes, and impact booms)
  - Viral Caption & Comment-to-DM Trigger Manifest
"""

import os
import sys
import math
import wave
import struct
import json
import time
import subprocess
from datetime import datetime, timezone
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PARENT_SOCIALS_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "Socials"))
OUTPUT_DIR = os.path.join(PARENT_SOCIALS_DIR, "reels")
V1_OUTPUT_DIR = os.path.join(BASE_DIR, "reels")
CARDS_DIR = os.path.join(BASE_DIR, "assets", "cards")
FONTS_DIR = os.path.join(BASE_DIR, "fonts")
LILITA_FONT_PATH = os.path.join(FONTS_DIR, "LilitaOne-Regular.ttf")

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(V1_OUTPUT_DIR, exist_ok=True)

FFMPEG_PATH = "/opt/homebrew/bin/ffmpeg" if os.path.exists("/opt/homebrew/bin/ffmpeg") else "ffmpeg"

def get_font(size, clash=True):
    if clash and os.path.exists(LILITA_FONT_PATH):
        try:
            return ImageFont.truetype(LILITA_FONT_PATH, size)
        except Exception:
            pass
    # Fallback system fonts
    for fpath in [
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
    ]:
        if os.path.exists(fpath):
            try:
                return ImageFont.truetype(fpath, size)
            except Exception:
                pass
    return ImageFont.load_default()

def synthesize_audio(duration, events, outfile):
    """Synthesizes rich stereo audio with fanfares, card drops, and impact booms."""
    sr = 44100
    n_samples = int(sr * duration)
    samples = [0.0] * n_samples

    for evt in events:
        etime = evt.get("time", 0.0)
        etype = evt.get("type", "pop")
        idx_start = int(etime * sr)
        
        if etype == "fanfare":
            # Royal Victory Chords: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
            chord_dur = 2.0
            for i in range(min(int(sr * chord_dur), n_samples - idx_start)):
                t = i / sr
                env = math.exp(-2.2 * t)
                v = (math.sin(2*math.pi*523.25*t) + 
                     math.sin(2*math.pi*659.25*t)*0.8 + 
                     math.sin(2*math.pi*783.99*t)*0.7 + 
                     math.sin(2*math.pi*1046.5*t)*0.5) / 3.0
                samples[idx_start + i] += v * env * 0.45

        elif etype == "card_drop":
            # Snappy card deployment whoosh & slap
            freq = evt.get("freq", 400)
            dur = 0.25
            for i in range(min(int(sr * dur), n_samples - idx_start)):
                t = i / sr
                env = math.exp(-14.0 * t)
                # Pitch sweep downwards
                sweep_freq = freq * (1.0 - t * 0.4)
                v = math.sin(2 * math.pi * sweep_freq * t)
                samples[idx_start + i] += v * env * 0.38

        elif etype == "impact":
            # Sub-bass rumble and high snap for CTA reveal
            dur = 1.8
            for i in range(min(int(sr * dur), n_samples - idx_start)):
                t = i / sr
                env = math.exp(-3.5 * t)
                sub = math.sin(2 * math.pi * 65.41 * t) # C2 sub
                mid = math.sin(2 * math.pi * 523.25 * t) * 0.4
                samples[idx_start + i] += (sub + mid) * env * 0.55

    # Write 16-bit stereo WAV
    with wave.open(outfile, 'w') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(sr)
        packed = []
        for s in samples:
            val = max(-1.0, min(1.0, s))
            s16 = int(val * 32767)
            packed.append(struct.pack('<hh', s16, s16))
        w.writeframes(b''.join(packed))

def create_background(frame_idx, total_frames):
    """Renders a dynamic, pulsing deep royal blue arena background with floating embers."""
    w, h = 1080, 1920
    img = Image.new("RGB", (w, h), color="#071530")
    draw = ImageDraw.Draw(img)

    # Vertical gradient with subtle breath animation
    pulse = math.sin(frame_idx * 0.08) * 6
    for y in range(0, h, 4):
        ratio = y / h
        r = int(max(0, min(255, 12 - (5 * ratio) + pulse * 0.5)))
        g = int(max(0, min(255, 34 - (18 * ratio) + pulse * 0.8)))
        b = int(max(0, min(255, 78 - (45 * ratio) + pulse * 1.5)))
        draw.rectangle([(0, y), (w, y+4)], fill=(r, g, b))

    # Royal gold border (Clash Royale in-game frame)
    draw.rectangle([(20, 20), (w-20, h-20)], outline="#ca8a04", width=4)
    draw.rectangle([(28, 28), (w-28, h-28)], outline="#854d0e", width=2)

    # Gold corner studs
    corners = [(24, 24), (w-24, 24), (24, h-24), (w-24, h-24)]
    for cx, cy in corners:
        draw.ellipse([(cx-10, cy-10), (cx+10, cy+10)], fill="#fde047", outline="#854d0e", width=3)

    return img

def render_meta_deck_reel(outfile_mp4):
    """
    Renders Reel 1: Mohamed Light's #1 Ultimate Champion Deck (58.6% Win Rate)
    15 Seconds @ 30 FPS = 450 Frames.
    """
    fps = 30
    duration = 15.0
    total_frames = int(fps * duration)
    temp_wav = "/tmp/reel1_sfx.wav"

    # Define Audio Events
    audio_events = [
        {"time": 0.1, "type": "fanfare"},
        {"time": 4.0, "type": "card_drop", "freq": 350},
        {"time": 4.5, "type": "card_drop", "freq": 390},
        {"time": 5.0, "type": "card_drop", "freq": 430},
        {"time": 5.5, "type": "card_drop", "freq": 470},
        {"time": 6.0, "type": "card_drop", "freq": 510},
        {"time": 6.5, "type": "card_drop", "freq": 550},
        {"time": 7.0, "type": "card_drop", "freq": 590},
        {"time": 7.5, "type": "card_drop", "freq": 640},
        {"time": 10.5, "type": "impact"},
    ]
    synthesize_audio(duration, audio_events, temp_wav)

    # Deck Card Data
    deck_cards = [
        {"name": "P.E.K.K.A", "file": "pekka_evo.png", "slot": "EVO SLOT", "slot_color": "#c084fc", "elixir": "7"},
        {"name": "Hero Ice Wizard", "file": "ice-wizard_hero.png", "slot": "HERO SLOT", "slot_color": "#fde047", "elixir": "3"},
        {"name": "Knight", "file": "knight.png", "slot": "WILD SLOT", "slot_color": "#38bdf8", "elixir": "3"},
        {"name": "Zap", "file": "zap.png", "slot": "SUPPORT", "slot_color": "#94a3b8", "elixir": "2"},
        {"name": "Poison", "file": "poison.png", "slot": "SUPPORT", "slot_color": "#94a3b8", "elixir": "4"},
        {"name": "Bandit", "file": "bandit.png", "slot": "SUPPORT", "slot_color": "#94a3b8", "elixir": "3"},
        {"name": "Baby Dragon", "file": "baby-dragon.png", "slot": "SUPPORT", "slot_color": "#94a3b8", "elixir": "4"},
        {"name": "Electro Spirit", "file": "electro-spirit.png", "slot": "CYCLE", "slot_color": "#94a3b8", "elixir": "1"}
    ]

    # Preload and resize card images
    card_imgs = []
    card_w, card_h = 200, 250
    for c in deck_cards:
        cpath = os.path.join(CARDS_DIR, c["file"])
        if os.path.exists(cpath):
            ci = Image.open(cpath).convert("RGBA").resize((card_w, card_h), Image.Resampling.LANCZOS)
        else:
            ci = Image.new("RGBA", (card_w, card_h), (30, 41, 59, 255))
        card_imgs.append(ci)

    # Launch FFMPEG Pipe
    cmd = [
        FFMPEG_PATH, "-y",
        "-f", "image2pipe", "-vcodec", "ppm", "-r", str(fps), "-i", "-",
        "-i", temp_wav,
        "-c:v", "libx264", "-preset", "fast", "-b:v", "4500k", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-shortest",
        outfile_mp4
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    print(f"🎬 Rendering Reel 1 ({total_frames} frames @ {fps}fps) -> {outfile_mp4}...")
    t0 = time.time()

    for f in range(total_frames):
        t = f / fps
        img = create_background(f, total_frames)
        draw = ImageDraw.Draw(img)

        # -------------------------------------------------------------
        # TOP HOOK BANNER (SAFE ZONE: y = 180 - 390)
        # -------------------------------------------------------------
        # Floating Crown & Header
        crown_scale = 1.0 + 0.05 * math.sin(f * 0.15)
        draw.text((540, 205), "👑 S+ TIER DECK SPOTLIGHT 👑", font=get_font(42, clash=True), fill="#fde047", anchor="mm")
        
        # Win-rate Telemetry Badge
        badge_w, badge_h = 760, 84
        bx0 = (1080 - badge_w) // 2
        by0 = 250
        # Glowing border
        glow_pulse = int(180 + 75 * math.sin(f * 0.2))
        draw.rounded_rectangle([(bx0-3, by0-3), (bx0+badge_w+3, by0+badge_h+3)], radius=18, outline=(34, 197, 94, glow_pulse), width=4)
        draw.rounded_rectangle([(bx0, by0), (bx0+badge_w, by0+badge_h)], radius=16, fill="#0c2314")
        draw.text((540, by0 + 42), "⚡ 58.6% WIN RATE • #1 ULTIMATE CHAMPION", font=get_font(34, clash=True), fill="#22c55e", anchor="mm")

        # Pilot Telemetry Subtitle
        draw.text((540, 370), "Piloted by Mohamed Light • Season 87 Meta", font=get_font(28, clash=False), fill="#cbd5e1", anchor="mm")

        # -------------------------------------------------------------
        # CENTER CARDS GRID (y = 430 - 1050)
        # -------------------------------------------------------------
        # 2 rows of 4 cards
        grid_start_x = 90
        grid_gap_x = 240
        grid_row_1_y = 440
        grid_row_2_y = 750

        for idx, c in enumerate(deck_cards):
            card_appearance_time = 3.5 + idx * 0.4
            if t < card_appearance_time:
                continue # not appeared yet

            row = idx // 4
            col = idx % 4
            target_x = grid_start_x + (col * grid_gap_x)
            target_y = grid_row_1_y if row == 0 else grid_row_2_y

            # Pop / Zoom In Animation
            progress = min(1.0, (t - card_appearance_time) / 0.25)
            bounce = 1.0 + 0.3 * math.sin(progress * math.pi) if progress < 1.0 else 1.0

            cur_w = int(card_w * bounce)
            cur_h = int(card_h * bounce)
            cur_x = target_x - (cur_w - card_w) // 2
            cur_y = target_y - (cur_h - card_h) // 2

            # Draw card slot plate
            draw.rounded_rectangle([(target_x-6, target_y-6), (target_x+card_w+6, target_y+card_h+42)], radius=14, fill="#0f172a", outline=c["slot_color"], width=3)

            # Paste card image
            cimg_resized = card_imgs[idx] if bounce == 1.0 else card_imgs[idx].resize((cur_w, cur_h), Image.Resampling.BILINEAR)
            img.paste(cimg_resized, (cur_x, cur_y), cimg_resized)

            # Draw Slot Badge & Name below card
            draw.rounded_rectangle([(target_x+4, target_y+card_h+4), (target_x+card_w-4, target_y+card_h+32)], radius=6, fill=c["slot_color"])
            draw.text((target_x + card_w//2, target_y + card_h + 18), c["slot"], font=get_font(18, clash=True), fill="#050e20", anchor="mm")

        # -------------------------------------------------------------
        # TACTICAL PRO TIP (y = 1110 - 1240)
        # -------------------------------------------------------------
        if t >= 8.5:
            tip_y = 1120
            draw.rounded_rectangle([(80, tip_y), (1000, tip_y + 110)], radius=18, fill="#132752", outline="#ca8a04", width=2)
            draw.text((540, tip_y + 35), "⚔️ PRO COMBO: HERO FREEZE + EVO HEAL", font=get_font(32, clash=True), fill="#fde047", anchor="mm")
            draw.text((540, tip_y + 75), "Use Frost Surge to freeze defenders while PEKKA heals to full HP.", font=get_font(23, clash=False), fill="#ffffff", anchor="mm")

        # -------------------------------------------------------------
        # VIRAL ALGORITHM TRIGGER: "COMMENT 'DECK'" (y = 1270 - 1560)
        # -------------------------------------------------------------
        if t >= 9.5:
            # Pulsing high-contrast viral sticker
            pulse_btn = 1.0 + 0.04 * math.sin(f * 0.25)
            btn_w = int(920 * pulse_btn)
            btn_h = int(170 * pulse_btn)
            btn_x = (1080 - btn_w) // 2
            btn_y = 1280 - (btn_h - 170) // 2

            # Neon gold/cyan 3D drop shadow
            draw.rounded_rectangle([(btn_x+6, btn_y+6), (btn_x+btn_w+6, btn_y+btn_h+6)], radius=24, fill="#040b17")
            # Glowing gradient button body
            draw.rounded_rectangle([(btn_x, btn_y), (btn_x+btn_w, btn_y+btn_h)], radius=22, fill="#fde047", outline="#ffffff", width=4)

            # Kinetic text inside the button
            draw.text((540, btn_y + 55), "👉 COMMENT \"DECK\" BELOW 👈", font=get_font(44, clash=True), fill="#1e1b4b", anchor="mm")
            draw.text((540, btn_y + 115), "⚡ Instant 1-Tap Copy Link sent to your DMs!", font=get_font(28, clash=True), fill="#431407", anchor="mm")

            # Follower incentive subtext
            draw.text((540, 1500), "Follow @nexusroyale.online for daily S+ Tier meta decks", font=get_font(26, clash=True), fill="#38bdf8", anchor="mm")

        # -------------------------------------------------------------
        # BOTTOM SAFE BRAND BAR (y = 1590 - 1690)
        # -------------------------------------------------------------
        bar_y = 1590
        draw.rounded_rectangle([(60, bar_y), (1020, bar_y + 80)], radius=16, fill="#0a1836", outline="#334155", width=2)
        draw.text((540, bar_y + 40), "🔗 nexusroyale.online  •  Creator Code: NEXUS", font=get_font(28, clash=True), fill="#fde047", anchor="mm")

        # Pipe frame PPM bytes directly to FFMPEG
        img.save(proc.stdin, 'PPM')

    proc.stdin.close()
    proc.wait()
    render_time = time.time() - t0
    fsize = os.path.getsize(outfile_mp4) / (1024 * 1024)
    print(f"✅ Reel 1 Render Complete! {fsize:.2f} MB in {render_time:.1f}s")
    if os.path.exists(temp_wav):
        os.remove(temp_wav)


def render_counter_guide_reel(outfile_mp4):
    """
    Renders Reel 2: How To Counter Evo PEKKA (+4 Positive Elixir Trade)
    15 Seconds @ 30 FPS = 450 Frames.
    """
    fps = 30
    duration = 15.0
    total_frames = int(fps * duration)
    temp_wav = "/tmp/reel2_sfx.wav"

    audio_events = [
        {"time": 0.1, "type": "fanfare"},
        {"time": 3.5, "type": "card_drop", "freq": 380},
        {"time": 6.5, "type": "card_drop", "freq": 440},
        {"time": 9.5, "type": "card_drop", "freq": 520},
        {"time": 11.0, "type": "impact"},
    ]
    synthesize_audio(duration, audio_events, temp_wav)

    cmd = [
        FFMPEG_PATH, "-y",
        "-f", "image2pipe", "-vcodec", "ppm", "-r", str(fps), "-i", "-",
        "-i", temp_wav,
        "-c:v", "libx264", "-preset", "fast", "-b:v", "4500k", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-shortest",
        outfile_mp4
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    print(f"🎬 Rendering Reel 2 ({total_frames} frames @ {fps}fps) -> {outfile_mp4}...")
    t0 = time.time()

    counters = [
        {"title": "1. GUARDS SURROUND", "trade": "+4 ELIXIR", "desc": "3 physical shields absorb 3 lethal swings with 0 heal value.", "card": "guards.png"},
        {"title": "2. INFERNO DRAGON", "trade": "+3 ELIXIR", "desc": "Air flight avoids all melee; beam incinerates full 5,000 HP.", "card": "inferno-dragon.png"},
        {"title": "3. TORNADO TO KING", "trade": "+4 ELIXIR", "desc": "Pull across bridge to permanently activate King Tower.", "card": "tornado.png"}
    ]

    counter_imgs = []
    for c in counters:
        cpath = os.path.join(CARDS_DIR, c["card"])
        if os.path.exists(cpath):
            ci = Image.open(cpath).convert("RGBA").resize((160, 200), Image.Resampling.LANCZOS)
        else:
            ci = Image.new("RGBA", (160, 200), (30, 41, 59, 255))
        counter_imgs.append(ci)

    pekka_img = None
    pekka_path = os.path.join(CARDS_DIR, "pekka_evo.png")
    if os.path.exists(pekka_path):
        pekka_img = Image.open(pekka_path).convert("RGBA").resize((220, 275), Image.Resampling.LANCZOS)

    for f in range(total_frames):
        t = f / fps
        img = create_background(f, total_frames)
        draw = ImageDraw.Draw(img)

        # -------------------------------------------------------------
        # TOP HOOK (y = 190 - 370)
        # -------------------------------------------------------------
        draw.text((540, 210), "⚡ HOW TO COUNTER EVO PEKKA ⚡", font=get_font(42, clash=True), fill="#ff2a70", anchor="mm")
        
        # Mistake Alert Banner
        draw.rounded_rectangle([(100, 260), (980, 340)], radius=16, fill="#3b0717", outline="#ef4444", width=3)
        draw.text((540, 300), "❌ THE MISTAKE: Never use squishy swarms! (She heals +12% HP)", font=get_font(26, clash=True), fill="#fca5a5", anchor="mm")

        # -------------------------------------------------------------
        # TARGET CARD SPOTLIGHT (y = 370 - 640)
        # -------------------------------------------------------------
        if pekka_img:
            img.paste(pekka_img, (430, 370), pekka_img)
        draw.text((540, 660), "P.E.K.K.A (7 Elixir) • Heavy Frontline Tank", font=get_font(26, clash=True), fill="#cbd5e1", anchor="mm")

        # -------------------------------------------------------------
        # 3 PRO COUNTER ROWS (y = 700 - 1240)
        # -------------------------------------------------------------
        row_y_starts = [710, 885, 1060]
        row_times = [3.0, 6.0, 9.0]

        for i, cdata in enumerate(counters):
            if t < row_times[i]:
                continue

            ry = row_y_starts[i]
            # Card image
            cimg = counter_imgs[i]
            img.paste(cimg, (80, ry), cimg)

            # Details card
            draw.rounded_rectangle([(260, ry+10), (1000, ry+170)], radius=14, fill="#0f172a", outline="#22c55e", width=2)
            draw.text((290, ry + 40), cdata["title"], font=get_font(32, clash=True), fill="#ffffff")
            
            # Green positive trade badge
            draw.rounded_rectangle([(820, ry + 25), (980, ry + 65)], radius=8, fill="#14532d")
            draw.text((900, ry + 45), cdata["trade"], font=get_font(22, clash=True), fill="#4ade80", anchor="mm")

            draw.text((290, ry + 95), cdata["desc"], font=get_font(22, clash=False), fill="#94a3b8")

        # -------------------------------------------------------------
        # CTA BANNER (y = 1270 - 1560)
        # -------------------------------------------------------------
        if t >= 10.0:
            pulse_btn = 1.0 + 0.04 * math.sin(f * 0.25)
            btn_w = int(920 * pulse_btn)
            btn_h = int(160 * pulse_btn)
            btn_x = (1080 - btn_w) // 2
            btn_y = 1280 - (btn_h - 160) // 2

            draw.rounded_rectangle([(btn_x+6, btn_y+6), (btn_x+btn_w+6, btn_y+btn_h+6)], radius=24, fill="#040b17")
            draw.rounded_rectangle([(btn_x, btn_y), (btn_x+btn_w, btn_y+btn_h)], radius=22, fill="#22c55e", outline="#ffffff", width=4)

            draw.text((540, btn_y + 50), "👉 COMMENT \"PEKKA\" BELOW 👈", font=get_font(42, clash=True), fill="#052e16", anchor="mm")
            draw.text((540, btn_y + 110), "Get the full Matchup Simulator Link in DMs!", font=get_font(28, clash=True), fill="#14532d", anchor="mm")

            draw.text((540, 1500), "Follow @nexusroyale.online for daily strategy decodes", font=get_font(26, clash=True), fill="#38bdf8", anchor="mm")

        # -------------------------------------------------------------
        # BOTTOM BRAND BAR
        # -------------------------------------------------------------
        bar_y = 1590
        draw.rounded_rectangle([(60, bar_y), (1020, bar_y + 80)], radius=16, fill="#0a1836", outline="#334155", width=2)
        draw.text((540, bar_y + 40), "🔗 nexusroyale.online  •  Creator Code: NEXUS", font=get_font(28, clash=True), fill="#fde047", anchor="mm")

        img.save(proc.stdin, 'PPM')

    proc.stdin.close()
    proc.wait()
    render_time = time.time() - t0
    fsize = os.path.getsize(outfile_mp4) / (1024 * 1024)
    print(f"✅ Reel 2 Render Complete! {fsize:.2f} MB in {render_time:.1f}s")
    if os.path.exists(temp_wav):
        os.remove(temp_wav)


def generate_all_reels():
    print("="*70)
    print("🚀 NEXUS ROYALE — AUTONOMOUS INSTAGRAM REELS VIDEO GENERATOR")
    print("="*70)

    reel_1_path = os.path.join(OUTPUT_DIR, "reel_1_meta_deck.mp4")
    reel_2_path = os.path.join(OUTPUT_DIR, "reel_2_counter_pekka.mp4")

    render_meta_deck_reel(reel_1_path)
    render_counter_guide_reel(reel_2_path)

    # Copy to V1/reels for web server access
    for r in [reel_1_path, reel_2_path]:
        shutil_dest = os.path.join(V1_OUTPUT_DIR, os.path.basename(r))
        import shutil
        shutil.copy2(r, shutil_dest)

    # Save Reel Manifest with viral captions & automated trigger tags
    manifest = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "totalReels": 2,
        "reels": [
            {
                "id": "reel_1_meta_deck",
                "videoFile": "reels/reel_1_meta_deck.mp4",
                "title": "S+ Tier Meta Deck: 58.6% Win Rate Mohamed Light PEKKA",
                "hook": "Mohamed Light's #1 Ultimate Champion Deck holds an overwhelming 58.6% win rate...",
                "commentTrigger": "DECK",
                "dmAutoReply": "Hey! 👑 Here is the direct 1-tap copy link for the 58.6% Win Rate PEKKA deck: https://nexusroyale.online?deck=mohamed_light&ref=ig_reels. Tap 'Copy to Clash Royale' and it will slot all 8 cards directly into your game!\n\nMake sure to follow @nexusroyale.online so you never miss tomorrow's top ladder deck! ⚔️",
                "caption": """👑 S+ TIER DECK REVEAL (58.6% Win Rate on Top 1 Ladder)

Mohamed Light's signature Season 87 deck is tearing through Ultimate Champion. 

Alignment Breakdown:
🟣 Evo Slot: P.E.K.K.A (Sustained frontline heal)
🟡 Hero Slot: Hero Ice Wizard (1-Elixir Frost Surge freeze)
🔵 Wild Slot: Knight (Iron Bulwark 70% damage reduction)

👉 COMMENT "DECK" BELOW and our bot will instantly DM you the direct 1-Tap Copy Link straight into Clash Royale!

Link in bio: nexusroyale.online
Support Code: NEXUS

Follow @nexusroyale.online for daily meta decks & live telemetry!

#ClashRoyale #ClashRoyaleReels #ClashRoyaleDeck #MohamedLight #PEKKA #Supercell #GamingReels #CRL #ClashRoyalePro #NexusRoyale"""
            },
            {
                "id": "reel_2_counter_pekka",
                "videoFile": "reels/reel_2_counter_pekka.mp4",
                "title": "Tactical Decode: How CRL Pros Counter Evo PEKKA (+4 Elixir)",
                "hook": "Evo PEKKA's heal punishes bad swarm drops. Here's how pros shut her down cleanly...",
                "commentTrigger": "PEKKA",
                "dmAutoReply": "Hey Chief! 👑 Here is the link to the Combat Simulator where you can test any card counter against Evo PEKKA: https://nexusroyale.online?tool=simulator&ref=ig_reels.\n\nFollow @nexusroyale.online for daily frame-by-frame strategy guides! ⚔️",
                "caption": """⚡ HOW TO COUNTER EVO PEKKA (+4 ELIXIR TRADE)

The biggest mistake players make: dropping squishy swarms. She heals +12% HP on every single kill!

Here are the 3 frame-perfect trades used by CRL pros:
1. Centered Guards (+4 Trade) — 3 physical shields absorb 3 swings with ZERO heal value.
2. Inferno Dragon (+3 Trade) — Air placement completely avoids her melee blade.
3. Tornado to King (+4 Trade) — Activates King Tower permanently.

👉 COMMENT "PEKKA" BELOW to get the free Combat Simulator link in your DMs!

Link in bio: nexusroyale.online
Support Code: NEXUS

Follow @nexusroyale.online for daily strategy guides!

#ClashRoyale #ClashRoyaleStrategy #ClashRoyaleTips #PEKKA #Supercell #GamingReels #ClashRoyaleReels #NexusRoyale #Esports"""
            }
        ]
    }

    manifest_file = os.path.join(OUTPUT_DIR, "reels_manifest.json")
    with open(manifest_file, "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"📄 Manifest saved to: {manifest_file}")
    print("\n🎉 ALL REELS GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    generate_all_reels()
