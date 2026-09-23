#!/usr/bin/env python3
"""
Nexus Royale — Viral Reel Reposter & Video Curator Pipeline
Downloads, crops, frames, and watermarks viral Clash Royale gameplay clips,
YouTube Shorts, and TikTok highlights into broadcast-ready 9:16 Instagram Reels.

Features:
  1. Automatic download via yt-dlp (YouTube Shorts, Clips, or direct MP4 URLs)
  2. Vertical 9:16 transformation (1080x1920) with blurred backdrop or top/bottom layout
  3. Top Hook Banner overlay with high-contrast Lilita One typography
  4. Bottom Persistent CTA banner ("👑 1-Tap Copy in Bio: nexusroyale.online • Code: NEXUS")
  5. Animated "Comment 'DECK' for instant link in DMs" conversion trigger sticker
"""

import os
import sys
import subprocess
import argparse
from datetime import datetime

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PARENT_SOCIALS_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "Socials"))
OUTPUT_DIR = os.path.join(PARENT_SOCIALS_DIR, "reels")
os.makedirs(OUTPUT_DIR, exist_ok=True)

VENV_YTDLP = os.path.join(PARENT_SOCIALS_DIR, "..", ".venv", "bin", "yt-dlp")
YTDLP_BIN = VENV_YTDLP if os.path.exists(VENV_YTDLP) else "yt-dlp"
FFMPEG_BIN = "/opt/homebrew/bin/ffmpeg" if os.path.exists("/opt/homebrew/bin/ffmpeg") else "ffmpeg"
FONTS_DIR = os.path.join(BASE_DIR, "fonts")
LILITA_FONT = os.path.join(FONTS_DIR, "LilitaOne-Regular.ttf")

def download_video(url, output_path):
    """Downloads a video clip using yt-dlp."""
    print(f"📥 Downloading video from: {url}...")
    cmd = [
        YTDLP_BIN,
        "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
        "--merge-output-format", "mp4",
        "-o", output_path,
        url
    ]
    res = subprocess.run(cmd)
    if res.returncode != 0:
        raise Exception("Failed to download video with yt-dlp.")
    print(f"✅ Video saved to {output_path}")

def transform_to_reel(input_video, output_reel, top_hook="👑 INSANE CLUTCH DEFENSE 👑", trigger="DECK"):
    """
    Transforms any raw video into a branded 9:16 vertical Reel (1080x1920)
    with top hook banner and bottom CTA.
    """
    print(f"⚙️ Formatting {input_video} into 9:16 Instagram Reel...")

    # Escape text for ffmpeg drawtext filter
    safe_hook = top_hook.replace(":", "\\:").replace("'", "")
    safe_trigger = trigger.replace(":", "\\:").replace("'", "")
    font_filter = f":fontfile='{LILITA_FONT}'" if os.path.exists(LILITA_FONT) else ""

    # Complex filtergraph:
    # 1. Split video into background (scaled to 1080x1920 and heavily blurred) and foreground (scaled to fit center).
    # 2. Overlay foreground over blurred background.
    # 3. Add top hook banner with dark backing box.
    # 4. Add bottom CTA sticker ("COMMENT 'DECK' FOR 1-TAP COPY LINK").
    # 5. Add persistent footer bar ("nexusroyale.online | Code: NEXUS").
    filter_complex = (
        "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=20:5[bg];"
        "[0:v]scale=1080:-2:force_original_aspect_ratio=decrease[fg];"
        "[bg][fg]overlay=(W-w)/2:(H-h)/2[base];"
        f"[base]drawbox=x=40:y=180:w=1000:h=180:color=#071530@0.9:t=fill,"
        f"drawbox=x=40:y=180:w=1000:h=180:color=#fde047@0.9:t=4,"
        f"drawtext=text='{safe_hook}'{font_filter}:fontsize=38:fontcolor=#ffffff:x=(w-text_w)/2:y=245,"
        f"drawbox=x=60:y=1340:w=960:h=160:color=#fde047@0.95:t=fill,"
        f"drawbox=x=60:y=1340:w=960:h=160:color=#ffffff@1:t=4,"
        f"drawtext=text='👉 COMMENT \"{safe_trigger}\" FOR 1-TAP LINK 👈'{font_filter}:fontsize=40:fontcolor=#1e1b4b:x=(w-text_w)/2:y=1380,"
        f"drawtext=text='Instant deck import sent to your DMs!'{font_filter}:fontsize=26:fontcolor=#854d0e:x=(w-text_w)/2:y=1440,"
        f"drawbox=x=60:y=1540:w=960:h=80:color=#0a1836@0.9:t=fill,"
        f"drawbox=x=60:y=1540:w=960:h=80:color=#334155@0.8:t=2,"
        f"drawtext=text='🔗 nexusroyale.online  •  Creator Code\\: NEXUS'{font_filter}:fontsize=28:fontcolor=#fde047:x=(w-text_w)/2:y=1568[outv]"
    )

    cmd = [
        FFMPEG_BIN, "-y",
        "-i", input_video,
        "-filter_complex", filter_complex,
        "-map", "[outv]",
        "-map", "0:a?", # keep original audio if present
        "-c:v", "libx264", "-preset", "fast", "-b:v", "4500k", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        output_reel
    ]

    res = subprocess.run(cmd)
    if res.returncode != 0:
        raise Exception("FFMPEG transformation failed.")
    print(f"🎉 Reel successfully generated: {output_reel}")

def main():
    parser = argparse.ArgumentParser(description="Nexus Royale Viral Reel Reposter & Video Curator")
    parser.add_argument("--url", help="YouTube Short / Video URL to download and curate")
    parser.add_argument("--file", help="Local video file path to curate")
    parser.add_argument("--hook", default="👑 INSANE CLASH ROYALE CLUTCH 👑", help="Top Hook Banner text")
    parser.add_argument("--trigger", default="DECK", help="Comment-to-DM trigger keyword")
    parser.add_argument("--out", default=None, help="Output MP4 file path")

    args = parser.parse_args()

    if not args.url and not args.file:
        print("Usage:")
        print("  python3 reels_curator.py --url 'https://youtube.com/shorts/...' --hook 'TOP 1 GLOBAL DECK'")
        print("  python3 reels_curator.py --file 'my_clip.mp4' --hook 'HOW TO COUNTER EVO PEKKA'")
        return

    stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    raw_video = args.file
    if args.url:
        raw_video = f"/tmp/curated_raw_{stamp}.mp4"
        download_video(args.url, raw_video)

    out_file = args.out or os.path.join(OUTPUT_DIR, f"curated_reel_{stamp}.mp4")
    transform_to_reel(raw_video, out_file, args.hook, args.trigger)

if __name__ == "__main__":
    main()
