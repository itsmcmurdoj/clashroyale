# Nexus Royale — Brand & UI Design Guidelines
## Clash Royale Design System Edition • V2.0 (September 2026)

**Master Emblem:** *The Cyber Shield* (`nexus_crest_cyber.jpg`)  
**Companion Platform:** [https://nexusroyale.online](https://nexusroyale.online)  
**In-Game Creator Code:** `NEXUS`  
**Compliance Standard:** Supercell Fan Content Policy  

---

## 1. Brand Mission & Visual Philosophy

### 1.1 Purpose
Nexus Royale is the premier esports telemetry, battle analysis, and strategic companion platform for competitive *Clash Royale*. Our mission is to empower players from mid-ladder to Ultimate Champion with live telemetry, algorithmic matchup odds, and 2026 Hero/Evolution deck intelligence.

### 1.2 The "Supportive, Authentic In-Game" Principle
Unlike generic SaaS companion sites with flat corporate dashboards, Nexus Royale is designed to feel like an **authentic extension of the Clash Royale client**:
- **Tactile Skeuomorphism:** Chunky 3D push buttons that depress when clicked, stone modal sheets with beveled screws, and hanging ribbon bookmarks.
- **Supportive Hierarchy:** The UI frames and elevates in-game assets rather than competing with them.
- **Handheld Smartphone Alignment:** Centered phone stage (`max-width: 500px`) against the quilted royal wallpaper to preserve true smartphone proportions on desktop monitors.

---

## 2. The Master Emblem: *The Cyber Shield*

```
       /\
      /  \
     / /\ \
    | |  | |    [NEXUS CYBER SHIELD]
    | |==| |    Hexagonal Titanium-Gold Bevel
     \ \/ /     Cyan Telemetry Conduits
      \  /      Obsidian Carbon Backplate
       \/
```

### 2.1 Emblem Anatomy (`nexus_crest_cyber.jpg`)
* **Hexagonal Chiseled Shield:** Represents defensive mastery, unyielding resilience, and competitive fortitude.
* **Central Sovereign Monogram ("N"):** Architectural, angular letterform forged with faceted chamfers.
* **Crowning Apex:** Stylized crown spikes honoring 3-Crown victories.
* **Prismatic Cyan Energy Conduits:** Radiant neon light paths symbolizing live real-time telemetry from Supercell servers.
* **Champagne Titanium-Gold Trim:** High-grade royal bevel representing Ultimate Champion status.

### 2.2 Sizing & Usage Rules
* **Exclusion Zone:** Maintain clear space around the crest equal to **0.5x the width of the crest**.
* **Minimum Digital Sizes:**
  - Favicon / App Dock: `32 x 32 px`
  - Navigation Header: `36 x 36 px`
  - Mobile App Icon / PWA: `192 x 192 px`
  - Hero Display / Splash: `128 x 128 px` minimum
* **Rules of Engagement:**
  - ✅ **DO:** Always display over deep dark surfaces (Obsidian, Midnight Navy, or Royal Quilted Wallpaper).
  - ✅ **DO:** Pair with 3D Clash-style or clean geometric typography (`NEXUS ROYALE`).
  - ❌ **DON'T:** Never stretch, skew, or distort the crest proportions.
  - ❌ **DON'T:** Never recolor the cyan energy conduits to red or green.
  - ❌ **DON'T:** Never place on light or noisy backgrounds without a dark backing plate.

---

## 3. The Clash Royale Visual Palette

The Nexus Royale color system translates the authentic Clash Royale game palette into high-performance web UI:

### 3.1 Core In-Game Colors

| Role | Color Name | Hex Gradient | 3D Bevel / Shadow | In-Game Application |
| :--- | :--- | :--- | :--- | :--- |
| **Battle CTA** | Crown Gold | `#fde047` → `#ca8a04` | `box-shadow: 0 4px 0 #713f12` | Giant BATTLE button, active deck ribbon, gold currency |
| **Friendly / Win** | Royale Blue | `#38bdf8` → `#0284c7` | `box-shadow: 0 3px 0 #075985` | Player name, VICTORY badge, Practice button, trophies |
| **Opponent / Loss** | Defeat Crimson | `#ef4444` → `#991b1b` | `box-shadow: 0 3px 0 #571212` | Opponent name, DEFEAT badge, red square ✖ close button |
| **Success / Watch** | Gem Emerald | `#4ade80` → `#15803d` | `box-shadow: 0 3px 0 #14532d` | WATCH button, Upgrade button, live telemetry online pip |
| **Resource / Drop** | Elixir Magenta | `#ff2a70` → `#7a0028` | `box-shadow: 0 3px 8px #e11d48` | Large Elixir teardrop, card elixir dots, cycle costs |
| **Special: Evo** | Evolution Violet | `#c084fc` → `#a855f7` | `box-shadow: 0 0 8px #a855f7` | Slot 1 card frame, top diamond crystal gem |
| **Special: Hero** | Hero Amber | `#fde047` → `#eab308` | `box-shadow: 0 0 8px #eab308` | Slot 2 card frame, top diamond crystal gem |

### 3.2 Environmental Backgrounds & Surfaces
* **Royal Quilted Wallpaper (Body Background):**
  ```css
  background: 
    radial-gradient(circle at 50% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 70%),
    radial-gradient(circle at 100% 80%, rgba(225, 29, 72, 0.06) 0%, transparent 60%),
    repeating-linear-gradient(45deg, #17112b 0, #17112b 28px, #201338 28px, #201338 56px),
    #130d24;
  ```
* **Stone Modal Sheet (`.cr-modal-sheet`):**
  - Background: `linear-gradient(180deg, #2b3040 0%, #1a1e2b 100%)`
  - Border: `4px solid #475569`
  - Shadow: `0 12px 36px rgba(0, 0, 0, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.2)`
  - Radius: `18px`
* **Light Stone Match Card (`.cr-battle-log-card`):**
  - Background: `linear-gradient(180deg, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%)`
  - Border: `2.5px solid #94a3b8`
  - Color: `#0f172a` (Deep slate typography)

---

## 4. Typography System

### 4.1 Clash Headline (`--font-clash`)
* **Typeface:** Supercell-Magic / CC BackBeat / Space Grotesk Bold
* **Characteristics:** Playful, rounded geometric letterforms with thick black drop shadows and extruded borders.
* **CSS Implementation:**
  ```css
  font-family: 'Supercell-Magic', 'CCBackBeat', 'Space Grotesk', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 0 #000, 0 3px 6px rgba(0, 0, 0, 0.6);
  ```
* **Applications:** `VICTORY` / `DEFEAT` headers, Battle modal titles, button text (`PRACTICE`, `SHARE`, `WATCH`, `BATTLE`), Level badges.

### 4.2 Telemetry & Body (`--font-sans`)
* **Typeface:** Plus Jakarta Sans / Inter
* **Characteristics:** Razor-sharp legibility for numbers, player tags (`#Y0JJY80`), win rate percentages, and AI Coach notes.
* **Weights:** Regular (400), SemiBold (600), ExtraBold (800).

---

## 5. The Tactile Skeuomorphic Button Engine

All interactive buttons on Nexus Royale must exhibit physical depth and mechanical tactile response:

### 5.1 Button Specifications

#### The Battle CTA Button (`.cr-btn-yellow`)
* Background: `linear-gradient(180deg, #fde047 0%, #eab308 60%, #ca8a04 100%)`
* Border: `2.5px solid #713f12`
* Bevel: `box-shadow: 0 4px 0 #713f12, 0 6px 12px rgba(0, 0, 0, 0.5)`
* Active State: `transform: translateY(3px); box-shadow: 0 1px 0 #713f12;`

#### The Sub-Action Blue Button (`.cr-sub-btn-blue`)
* Background: `linear-gradient(180deg, #38bdf8 0%, #0284c7 60%, #0369a1 100%)`
* Border: `1.5px solid #075985`
* Bevel: `box-shadow: 0 3px 0 #075985, 0 4px 6px rgba(0, 0, 0, 0.25)`
* Active State: `transform: translateY(2px); box-shadow: 0 1px 0 #075985;`

#### The Success/Watch Green Button (`.cr-sub-btn-green`)
* Background: `linear-gradient(180deg, #4ade80 0%, #16a34a 60%, #15803d 100%)`
* Border: `1.5px solid #14532d`
* Bevel: `box-shadow: 0 3px 0 #14532d, 0 4px 6px rgba(0, 0, 0, 0.25)`
* Active State: `transform: translateY(2px); box-shadow: 0 1px 0 #14532d;`

#### The Red Square Close Button (`.cr-modal-close-btn`)
* Background: `linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)`
* Border: `2px solid #571212`
* Bevel: `box-shadow: 0 3px 0 #571212, 0 4px 6px rgba(0, 0, 0, 0.4)`
* Active State: `transform: translateY(2px); box-shadow: 0 1px 0 #571212;`

---

## 6. Deck & Card Matrix Standards

### 6.1 The 2x4 Structural Rule
In Clash Royale, battle decks are **strictly 2 rows of 4 cards (`2x4`)**.
- Total cards: Exactly 8.
- Aspect ratio per card: 3/4.
- In-grid gap: 3px to 4px.
- Empty slots: When a deck has fewer than 8 cards, it renders dashed placeholder boxes (`➕ SLOT X`) so the grid never collapses.

### 6.2 Diamond Special Crystals (45° Rotated)
Cards assigned to special slots feature diamond crystals pinned to the top-center:
```css
.cr-evo-gem {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 7px;
  height: 7px;
  background: #c084fc;
  border: 1px solid #f3e8ff;
  box-shadow: 0 0 5px #a855f7;
}
```

---

## 7. Navigation Architecture

### 7.1 Top In-Game Status Bar
1. **King Level Shield:** Far left (`👑 LEVEL 15`).
2. **Trophy Road Pill:** Blue ribbon pill with current trophies (`14,030 🏆`).
3. **Gold Reserve Pill:** Black pill with gold border and blue `+` button (`🪙 140 999 +`).
4. **Gems Counter Pill:** Black pill with emerald border and blue `+` button (`💎 295 +`).
5. **Utility Cluster:** Square 3D buttons for Friends/Social (`👥 2`), Clash TV (`📰`), and WebAudio SFX (`🔊`).

### 7.2 Persistent 5-Tab Mobile Dock
The dock sticks to the bottom of the screen with a stone gradient and gold top trim:
1. 🧰 **Shop** (Creator Code & Deals)
2. 🃏 **Cards** (Deck Studio & Collection)
3. ⚔️ **&lt; Battle &gt;** (Player Profile, Gateway & Ranked Matches)
4. 👥 **Social** (2v2 Radar & Clan Directory)
5. 🏆 **Events** (Pro Meta & Clash TV Highlights)

---

## 8. Supercell Fan Content Policy Compliance

Nexus Royale is an independent fan platform. Every public-facing page, social post, and media package must feature this exact legal disclaimer:

> *"This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it. For more information see Supercell's Fan Content Policy: www.supercell.com/fan-content-policy."*

- **Prohibition:** Never use the official Clash Royale logo as the primary app icon. Always use **The Cyber Shield** (`nexus_crest_cyber.jpg`).
- **Creator Support:** Direct all player in-game purchases through Creator Code `NEXUS`.
