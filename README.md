# 👑 Nexus Royale 2030 (V1)

> The next-generation 2030 Clash Royale platform. Zero-latency deck studio, interactive 3D card tilt, 2-slot Evolution support, real-time AI telemetry, head-to-head matchup simulation, and official in-game deep linking (`clashroyale://copyDeck`).

---

## ✨ Features

- **🔮 Pro Deck Studio**:
  - 8-Card interactive dock with 1-click add/remove.
  - Card Evolutions (2 slots) and Tower Troop selection (Princess, Cannoneer, Dagger Duchess, Baby Dragon Tower).
  - Telemetry: Average Elixir, 4-Card Cycle speed, anti-air defense, swarm wipe, and tank buster DPS.
  - 2030 AI Strategist: Real-time diagnostics with 1-click card substitutions.
- **⚡ Head-to-Head Matchup Arena**:
  - Virtual simulator calculating lane pressure, cycle counters, win probability %, and tactical advice.
- **🏆 Ultimate Champion Meta Tier List**:
  - Top 1,000 Path of Legends and Grand Challenge tier lists (S+, S, A) with 1-click import into Studio.
- **👑 World Top 100 Pro Ladder**:
  - Profiles for Mohamed Light, Ian77, Morten, Ryley, and PedroTM with win streaks and signature deck copy.
- **🔍 Player & 2v2 Live Telemetry Inspector**:
  - Search any player tag (e.g. `#Y0JJY80`) to view seasonal trophies, 2v2 League rating, 2026 Hero & Evolution slots, and live battle logs.
- **📲 Direct In-Game Export**:
  - Instant `clashroyale://copyDeck?deck=...` deep links to launch the mobile game directly.
- **🔊 Zero-Dependency Web Audio Synth**:
  - Futuristic game audio (elixir drops, evolution plasma sparks, crystal blips, victory fanfares) with an on/off toggle.

---

## 🚀 Running Locally

### Option A: With Local Python Server (Recommended for Live Supercell API Proxy)
```bash
python3 server.py
```
Open your browser at:
```
http://localhost:3000
```

### Option B: Standalone Static App
Simply double-click `index.html` to open it in any browser (Safari, Chrome, Arc, Brave, Edge).

---

## 📦 How to Push this V1 Folder to GitHub

Open Terminal in this `V1` directory:

```bash
cd "/Users/jacksonmcmurdo/Desktop/clash royale site/V1"
git init
git add .
git commit -m "feat: initial release of Nexus Royale 2030 V1"
```

Then create a new repository on [GitHub](https://github.com/new) named `clash-royale-site` and run:

```bash
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/clash-royale-site.git
git push -u origin main
```

---

## 🔑 Supercell Developer API Token

A pre-configured token is included in `.env` (bound to IP: `99.239.39.175`).
If your IP address ever changes:
1. Log in to [developer.clashroyale.com](https://developer.clashroyale.com).
2. Update your Allowed IP address or create a new token.
3. Paste it in `.env` or click the **API Connected** button in the top right of the website.
