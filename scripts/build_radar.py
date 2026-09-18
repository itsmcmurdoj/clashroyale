import json

meta_archetypes = [
  {
    'id': 'log_bait',
    'name': 'Classic Log Bait',
    'archetype': 'Spell Bait',
    'avgElixir': 3.3,
    'winCondition': 'Goblin Barrel',
    'cards': ['goblin-barrel', 'princess', 'goblin-gang', 'rocket', 'inferno-tower', 'knight', 'ice-spirit', 'the-log'],
    'threats': [
      'Watch out for Rocket on your push! Do not group medium troops behind your tank.',
      'Inferno Tower melts tanks in seconds. Bait it out with swarms or reset with stun.',
      'Tricky Barrels: Opponent may toss Goblin Barrel to top or side corner to dodge prediction spells.'
    ],
    'counters': [
      'Save The Log / Barb Barrel EXCLUSIVELY for Goblin Barrel. Never waste it on Princess.',
      'Place a cheap troop (Knight or Ice Spirit) at bridge to kill Princess before she locks onto tower.',
      'When opponent invests 6 Elixir on Rocket, PUNISH opposite lane instantly!'
    ]
  },
  {
    'id': 'hog_26',
    'name': 'Hog 2.6 Cycle',
    'archetype': 'Fast Cycle',
    'avgElixir': 2.6,
    'winCondition': 'Hog Rider',
    'cards': ['hog-rider', 'musketeer', 'ice-golem', 'cannon', 'fireball', 'the-log', 'skeletons', 'ice-spirit'],
    'threats': [
      'Lightning-fast 4-card cycle: They can drop a second Hog before your counter is back in hand!',
      'Cannon + Musketeer + Ice Golem kiting creates near-impenetrable ground defense.',
      'Fireball predictions on your defensive swarm/support.'
    ],
    'counters': [
      'Pre-place or hold your defensive building (Cannon/Tesla/Tombstone) 3 tiles from river in center.',
      'Tornado Hog directly to King Tower on first push to activate King Tower for the rest of match.',
      'Build a massive heavy counter-push; 2.6 struggles heavily against multi-threat overload.'
    ]
  },
  {
    'id': 'hog_eq',
    'name': 'Hog EQ Firecracker',
    'archetype': 'Cycle Pressure',
    'avgElixir': 2.8,
    'winCondition': 'Hog Rider',
    'cards': ['hog-rider', 'firecracker', 'mighty-miner', 'bomb-tower', 'earthquake', 'the-log', 'skeletons', 'ice-spirit'],
    'threats': [
      'Earthquake destroys defensive buildings and slows tower counter-attacks.',
      'Firecracker recoil can stay alive on defense indefinitely if not sniped.',
      'Mighty Miner lane swap bomb explosive pressure.'
    ],
    'counters': [
      'Activate King Tower early using Firecracker piercing shrapnel!',
      'Place buildings out of EQ range or rely on high-DPS troops (Mini Pekka, Hunter, Pekka).',
      'Use Arrow/Fireball/Royal Delivery on Firecracker immediately to prevent infinite chip.'
    ]
  },
  {
    'id': 'pekka_bridge_spam',
    'name': 'PEKKA Bridge Spam',
    'archetype': 'Bridge Spam Control',
    'avgElixir': 3.9,
    'winCondition': 'Battle Ram',
    'cards': ['pekka', 'battle-ram', 'bandit', 'royal-ghost', 'electro-wizard', 'poison', 'zap', 'minions'],
    'threats': [
      'Dual-lane punishment: Drops Bandit / Battle Ram opposite lane the second you spend heavy elixir.',
      'PEKKA crushes any ground win condition (Giant, Golem, Hog) on defense, then counter-pushes.',
      'Poison denies defensive swarms and chips down your tower.'
    ],
    'counters': [
      'Never overcommit in single elixir; keep at least 4 elixir in reserve for bridge spam.',
      'Use cheap swarms or kite PEKKA into center with Ice Golem / Skeletons.',
      'Defend Battle Ram with building or high-damage single target before it connects.'
    ]
  },
  {
    'id': 'lavaloon',
    'name': 'LavaLoon Beatdown',
    'archetype': 'Air Beatdown',
    'avgElixir': 4.1,
    'winCondition': 'Balloon',
    'cards': ['lava-hound', 'balloon', 'mega-minion', 'skeleton-dragons', 'tombstone', 'fireball', 'zap', 'guards'],
    'threats': [
      'Massive unstoppable air armada: Lava Hound tanks while Balloon demolishes tower.',
      'Fireball + Zap wipes out defensive Musketeer, Archer Queen, or Wizard.',
      'Lava Pups pop deals massive burst damage if tower is distracted.'
    ],
    'counters': [
      'Push opposite lane aggressively the moment Lava Hound (7 Elixir) drops in back!',
      'Separate your anti-air troops so they cannot be wiped by a single Fireball.',
      'Save Tornado or building to pull Balloon away from tower toward center.'
    ]
  },
  {
    'id': 'golem_beatdown',
    'name': 'Golem Beatdown',
    'archetype': 'Heavy Beatdown',
    'avgElixir': 4.3,
    'winCondition': 'Golem',
    'cards': ['golem', 'night-witch', 'baby-dragon', 'lumberjack', 'lightning', 'tornado', 'barbarian-barrel', 'mega-minion'],
    'threats': [
      'Unstoppable 2x/3x Elixir deathball: Golem death damage + Bats + Lumberjack rage.',
      'Lightning snipes your defensive building and medium-health defenders.',
      'Tornado groups your troops into Baby Dragon splash damage.'
    ],
    'counters': [
      'Punish opposite lane hard when they invest 8 Elixir on Golem in single elixir.',
      'Use tank-busters (Pekka, Inferno Dragon, Mini Pekka, Hunter) placed out of Lightning range.',
      'Poison or splash the Night Witch bats behind Golem.'
    ]
  },
  {
    'id': 'royal_giant_fisherman',
    'name': 'Royal Giant Fisherman',
    'archetype': 'Ranged Beatdown',
    'avgElixir': 3.5,
    'winCondition': 'Royal Giant',
    'cards': ['royal-giant', 'fisherman', 'hunter', 'phoenix', 'lightning', 'the-log', 'electro-spirit', 'guards'],
    'threats': [
      'Fisherman hooks your defensive tank-buster (Pekka/Mini Pekka) away from the Royal Giant!',
      'Evolution Royal Giant knockback wave obliterates defensive swarms.',
      'Lightning deletes your defensive Cannon/Tesla and tower.'
    ],
    'counters': [
      'Block Fisherman hook with cheap swarm (Skeletons/Guards) before deploying main DPS on RG.',
      'Place defensive building centrally early before RG crosses river.',
      'Surround RG with high-DPS troops away from Fisherman lane of sight.'
    ]
  },
  {
    'id': 'splashyard',
    'name': 'SplashYard Control',
    'archetype': 'Graveyard Control',
    'avgElixir': 3.5,
    'winCondition': 'Graveyard',
    'cards': ['graveyard', 'poison', 'baby-dragon', 'ice-wizard', 'knight', 'tombstone', 'barbarian-barrel', 'tornado'],
    'threats': [
      'Tornado + Ice Wizard + Baby Dragon defense creates a zero-damage meat grinder.',
      'Graveyard + Poison deals unavoidable 1,500+ tower damage if you lack poison/swarms.',
      'Knight tanks tower while Skeletons spawn uncontrollably.'
    ],
    'counters': [
      'Save Poison or fast-attacking troops (Archers, Dart Goblin, Mother Witch) for Graveyard.',
      'Kill the tank (Knight / Baby Dragon) crossing river first so tower shoots Skeletons.',
      'Never give them Poison value by stacking multiple troops in the same defense circle.'
    ]
  },
  {
    'id': 'miner_poison',
    'name': 'Miner Wall Breakers Poison',
    'archetype': 'Control Chip',
    'avgElixir': 2.9,
    'winCondition': 'Miner',
    'cards': ['miner', 'wall-breakers', 'poison', 'bomb-tower', 'the-log', 'spear-goblins', 'bats', 'valkyrie'],
    'threats': [
      'Relentless split-lane Wall Breakers pressure requiring instant 2-elixir response.',
      'Miner tanks tower while Bats / Spear Goblins shred defenses.',
      'Poison chip on tower gradually drains your HP in overtime.'
    ],
    'counters': [
      'Predict Miner placement: Place Knight or Mini Pekka on the most common safe tile (inside lane).',
      'The Log or Zap on Wall Breakers immediately before they connect.',
      'Build a cohesive 2-lane push that forces them to defend instead of chipping.'
    ]
  },
  {
    'id': 'goblin_drill',
    'name': 'Goblin Drill Poison',
    'archetype': 'Drill Control',
    'avgElixir': 3.1,
    'winCondition': 'Goblin Drill',
    'cards': ['goblin-drill', 'poison', 'the-log', 'skeletons', 'fire-spirit', 'tesla', 'dark-prince', 'dart-goblin'],
    'threats': [
      'Drill spawns directly on tower: constant Goblin spawns + death spawn goblins.',
      'Dart Goblin snipes from bridge across river with insane range.',
      'Tesla + Dark Prince forms an impenetrable defense.'
    ],
    'counters': [
      'Surround Drill immediately with Dark Prince, Valkyrie, or Bowler.',
      'Save The Log for when the Drill breaks to wipe out the final 3 Goblins.',
      'Spell out Dart Goblin before he gets 500+ damage value.'
    ]
  },
  {
    'id': 'xbow_30',
    'name': 'X-Bow 3.0 Siege',
    'archetype': 'Siege Control',
    'avgElixir': 3.0,
    'winCondition': 'X-Bow',
    'cards': ['x-bow', 'tesla', 'knight', 'archers', 'fireball', 'the-log', 'skeletons', 'electro-spirit'],
    'threats': [
      'Offensive X-Bow at river locked onto your tower can take the entire tower in 15 seconds.',
      'Tesla protects the X-Bow from river tanks while Knight blocks swarm.',
      'Defensive X-Bow placement makes entering their half of the arena impossible.'
    ],
    'counters': [
      'Drop a heavy tank (Knight, Giant, Pekka) directly in front of X-Bow before it locks on tower!',
      'Fireball / Rocket the X-Bow + Tesla together for massive spell value.',
      'Play cards in the center pocket to pull X-Bow targeting away from tower.'
    ]
  },
  {
    'id': 'egiant_lightning',
    'name': 'Electro Giant Lightning',
    'archetype': 'Heavy Beatdown',
    'avgElixir': 4.1,
    'winCondition': 'Electro Giant',
    'cards': ['electro-giant', 'lightning', 'tornado', 'dark-prince', 'cannon', 'baby-dragon', 'barbarian-barrel', 'golden-knight'],
    'threats': [
      'Electro Giant zaps any melee attacker or swarm; wiping Skarmy, Bats, and Minions instantly.',
      'Tornado pulls your ranged defenders (Musketeer, Hunter) into E-Giant zap radius.',
      'Lightning destroys defensive buildings.'
    ],
    'counters': [
      'Use high-DPS non-swarm tank killers: Pekka, Mini Pekka, or Hunter.',
      'Place defensive building (Cannon/Tesla) deep in center (4-3 plant) out of Lightning reach.',
      'Do NOT place swarms near E-Giant; they die immediately and charge his zap.'
    ]
  },
  {
    'id': 'recruits_hogs',
    'name': 'Royal Recruits Hogs (Fireball Bait)',
    'archetype': 'Dual-Lane Split',
    'avgElixir': 3.9,
    'winCondition': 'Royal Hogs',
    'cards': ['royal-recruits', 'royal-hogs', 'flying-machine', 'zappies', 'goblin-cage', 'barbarian-barrel', 'arrows', 'electro-spirit'],
    'threats': [
      'Dual-lane split: Recruits (3 left, 3 right) + Hogs (2 left, 2 right) overwhelms single defense.',
      'Fireball bait: If you Fireball Flying Machine, Royal Hogs run free.',
      'Zappies stun lock tanks and single-target troops indefinitely.'
    ],
    'counters': [
      'Save your big spell (Fireball/Bomb Tower) strictly for the Royal Hogs.',
      'Use splash troops (Valkyrie, Baby Dragon, Dark Prince) to clear the split Recruits.',
      'Commit your counter-attack to the side where they placed fewer recruits.'
    ]
  }
]

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nexus Live Co-Pilot — Second-Screen Radar & Cycle Tracker</title>
  <link rel="icon" type="image/jpeg" href="nexus_crest_cyber.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Plus+Jakarta+Sans:wght@500;600;700;800;900&family=JetBrains+Mono:wght@600;800&display=swap" rel="stylesheet">
  <style>
    @font-face {
      font-family: 'LilitaOneLocal';
      src: url('fonts/LilitaOne-Regular.ttf') format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    :root {
      --font-clash: 'LilitaOneLocal', 'Lilita One', cursive, sans-serif;
      --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;

      --cr-gold: #fde047;
      --cr-gold-deep: #ca8a04;
      --cr-gold-bevel: #713f12;

      --cr-blue: #38bdf8;
      --cr-blue-deep: #0284c7;
      --cr-blue-bevel: #075985;

      --cr-red: #ef4444;
      --cr-red-deep: #b91c1c;
      --cr-red-bevel: #571212;

      --cr-green: #4ade80;
      --cr-green-deep: #16a34a;
      --cr-green-bevel: #14532d;

      --cr-elixir: #ff2a70;
      --cr-elixir-deep: #7a0028;
      --cr-elixir-glow: #e11d48;

      --cr-evo-purple: #c084fc;
      --cr-hero-amber: #fbbf24;

      --cyber-cyan: #22d3ee;
      --cyber-cyan-glow: rgba(34, 211, 238, 0.5);

      --bg-midnight: #130d24;
      --bg-quilt-1: #17112b;
      --bg-quilt-2: #201338;
      --panel-stone-1: #2b3040;
      --panel-stone-2: #1a1e2b;
      --panel-border: #475569;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-midnight);
      background-image: 
        radial-gradient(circle at 50% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 60%),
        radial-gradient(circle at 80% 80%, rgba(225, 29, 72, 0.08) 0%, transparent 50%),
        repeating-linear-gradient(45deg, var(--bg-quilt-1) 0, var(--bg-quilt-1) 28px, var(--bg-quilt-2) 28px, var(--bg-quilt-2) 56px);
      background-attachment: fixed;
      color: #ffffff;
      font-family: var(--font-body);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }

    /* Top Cockpit Header */
    .cockpit-header {
      background: linear-gradient(180deg, #2b3040 0%, #151822 100%);
      border-bottom: 3.5px solid var(--panel-border);
      box-shadow: 0 8px 24px rgba(0,0,0,0.8), 0 4px 0 #0f172a;
      padding: 0.65rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .header-brand {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }

    .header-crest {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      border: 2px solid var(--cr-gold);
      box-shadow: 0 0 12px var(--cyber-cyan-glow);
    }

    .header-title-box h1 {
      font-family: var(--font-clash);
      font-size: 1.35rem;
      color: #fff;
      text-shadow: 0 2px 0 #000;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .header-title-box h1 span {
      color: var(--cr-gold);
    }

    .header-subtitle {
      font-size: 0.75rem;
      font-weight: 700;
      color: #94a3b8;
      letter-spacing: 0.5px;
    }

    .header-status-pill {
      background: rgba(16, 185, 129, 0.15);
      border: 1.5px solid var(--cr-green);
      color: var(--cr-green);
      font-family: var(--font-clash);
      font-size: 0.85rem;
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      display: flex;
      align-items: center;
      gap: 0.45rem;
      box-shadow: 0 0 10px rgba(74, 222, 128, 0.3);
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: var(--cr-green);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--cr-green);
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .header-controls {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    /* 3D Skeuomorphic Buttons */
    .cr-btn {
      font-family: var(--font-clash);
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-radius: 10px;
      padding: 0.55rem 1.1rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.4rem;
      user-select: none;
      outline: none;
      transition: transform 0.08s ease, box-shadow 0.08s ease, filter 0.15s ease;
      position: relative;
      text-decoration: none;
    }
    .cr-btn:active {
      transform: translateY(3px) !important;
    }

    .cr-btn-yellow {
      background: linear-gradient(180deg, #fff275 0%, #fde047 35%, #eab308 70%, #ca8a04 100%);
      border: 2px solid #ffffff;
      border-bottom: 3px solid var(--cr-gold-bevel);
      color: #451a03;
      text-shadow: 0 1px 0 rgba(255,255,255,0.8);
      box-shadow: 0 4px 0 var(--cr-gold-bevel), 0 6px 12px rgba(0,0,0,0.6);
    }
    .cr-btn-yellow:hover { filter: brightness(1.06); }
    .cr-btn-yellow:active { box-shadow: 0 1px 0 var(--cr-gold-bevel); }

    .cr-btn-blue {
      background: linear-gradient(180deg, #bae6fd 0%, #38bdf8 40%, #0284c7 75%, #0369a1 100%);
      border: 2px solid #ffffff;
      border-bottom: 3px solid var(--cr-blue-bevel);
      color: #ffffff;
      text-shadow: 0 2px 0 var(--cr-blue-bevel);
      box-shadow: 0 4px 0 var(--cr-blue-bevel), 0 6px 12px rgba(0,0,0,0.5);
    }
    .cr-btn-blue:hover { filter: brightness(1.08); }
    .cr-btn-blue:active { box-shadow: 0 1px 0 var(--cr-blue-bevel); }

    .cr-btn-red {
      background: linear-gradient(180deg, #fecaca 0%, #ef4444 40%, #dc2626 75%, #991b1b 100%);
      border: 2px solid #ffffff;
      border-bottom: 3px solid var(--cr-red-bevel);
      color: #ffffff;
      text-shadow: 0 2px 0 var(--cr-red-bevel);
      box-shadow: 0 4px 0 var(--cr-red-bevel), 0 6px 12px rgba(0,0,0,0.5);
    }
    .cr-btn-red:hover { filter: brightness(1.08); }
    .cr-btn-red:active { box-shadow: 0 1px 0 var(--cr-red-bevel); }

    .cr-btn-stone {
      background: linear-gradient(180deg, #475569 0%, #334155 100%);
      border: 1.5px solid #64748b;
      border-bottom: 2.5px solid #1e293b;
      color: #cbd5e1;
      font-size: 0.85rem;
      padding: 0.4rem 0.75rem;
      box-shadow: 0 2px 0 #1e293b;
    }
    .cr-btn-stone:hover { background: #475569; color: #fff; }
    .cr-btn-stone:active { box-shadow: 0 0 0 #1e293b; }

    /* Cockpit Main Grid */
    .cockpit-grid {
      display: grid;
      grid-template-columns: 310px 1fr 340px;
      gap: 1.25rem;
      padding: 1.25rem 1.5rem;
      flex: 1;
      max-width: 1700px;
      width: 100%;
      margin: 0 auto;
    }

    @media (max-width: 1200px) {
      .cockpit-grid {
        grid-template-columns: 1fr;
      }
    }

    /* Heavy Stone Card */
    .cockpit-panel {
      background: linear-gradient(180deg, var(--panel-stone-1) 0%, var(--panel-stone-2) 100%);
      border: 3.5px solid var(--panel-border);
      border-radius: 18px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.15), 0 6px 0 #0f172a;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: relative;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #334155;
      padding-bottom: 0.65rem;
      position: relative;
    }

    .panel-title {
      font-family: var(--font-clash);
      font-size: 1.15rem;
      color: var(--cr-gold);
      text-shadow: 0 2px 0 #000;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .panel-badge {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 800;
      padding: 0.15rem 0.5rem;
      border-radius: 999px;
      background: rgba(0,0,0,0.5);
      border: 1px solid #475569;
      color: #94a3b8;
    }

    /* LEFT COLUMN: ELIXIR ENGINE */
    .match-timer-box {
      background: #111520;
      border: 2px solid #334155;
      border-radius: 12px;
      padding: 0.85rem;
      text-align: center;
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.6);
    }

    .timer-display {
      font-family: var(--font-clash);
      font-size: 3rem;
      line-height: 1;
      color: #fff;
      text-shadow: 0 4px 0 #000, 0 0 12px rgba(255,255,255,0.3);
      letter-spacing: 2px;
    }

    .timer-phase-pill {
      display: inline-block;
      margin-top: 0.4rem;
      font-family: var(--font-clash);
      font-size: 0.8rem;
      padding: 0.2rem 0.7rem;
      border-radius: 999px;
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid var(--cr-blue);
      color: var(--cr-blue);
    }
    .timer-phase-pill.phase-double {
      background: rgba(253, 224, 71, 0.15);
      border-color: var(--cr-gold);
      color: var(--cr-gold);
    }
    .timer-phase-pill.phase-triple {
      background: rgba(239, 68, 68, 0.15);
      border-color: var(--cr-red);
      color: var(--cr-red);
      animation: pulse 1s infinite;
    }

    .timer-actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.65rem;
      justify-content: center;
    }

    /* Opponent Elixir Gauge */
    .elixir-gauge-card {
      background: linear-gradient(180deg, #1c1328 0%, #100b1a 100%);
      border: 2.5px solid #6b21a8;
      border-radius: 14px;
      padding: 1rem;
      box-shadow: 0 0 20px rgba(225, 29, 72, 0.2), inset 0 2px 0 rgba(255,255,255,0.1);
    }

    .elixir-readout-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 0.6rem;
    }

    .elixir-title {
      font-family: var(--font-clash);
      font-size: 1rem;
      color: #fda4af;
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }

    .elixir-num {
      font-family: var(--font-clash);
      font-size: 2.4rem;
      line-height: 1;
      color: #fff;
      text-shadow: 0 2px 0 #7a0028, 0 0 16px var(--cr-elixir);
    }

    .elixir-num small {
      font-size: 1rem;
      color: #fda4af;
    }

    /* Segmented Elixir Bar */
    .elixir-bar-container {
      background: #090610;
      border: 2px solid #581c87;
      border-radius: 999px;
      height: 26px;
      padding: 3px;
      position: relative;
      overflow: hidden;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.8);
    }

    .elixir-bar-fill {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, #ff2a70 0%, #f43f5e 50%, #fda4af 100%);
      box-shadow: 0 0 14px var(--cr-elixir);
      transition: width 0.1s linear;
    }

    .elixir-ticks {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      pointer-events: none;
    }
    .elixir-tick-line {
      border-right: 1.5px solid rgba(0,0,0,0.5);
      height: 100%;
    }

    .elixir-adjust-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.35rem;
      margin-top: 0.85rem;
    }

    /* Punish Window Banner */
    .punish-banner {
      background: linear-gradient(180deg, rgba(239, 68, 68, 0.25) 0%, rgba(185, 28, 28, 0.35) 100%);
      border: 2px solid var(--cr-red);
      border-radius: 12px;
      padding: 0.85rem;
      text-align: center;
      box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
      display: none;
      animation: alertGlow 1.2s infinite alternate;
    }
    .punish-banner.show {
      display: block;
    }

    @keyframes alertGlow {
      from { box-shadow: 0 0 10px rgba(239, 68, 68, 0.2); }
      to { box-shadow: 0 0 24px rgba(239, 68, 68, 0.6); }
    }

    .punish-banner h4 {
      font-family: var(--font-clash);
      color: #fecaca;
      font-size: 1.05rem;
      text-shadow: 0 1px 2px #000;
      margin-bottom: 0.2rem;
    }
    .punish-banner p {
      font-size: 0.82rem;
      color: #fff;
      line-height: 1.35;
    }

    /* CENTER COLUMN: CARD CALLER & OPPONENT DECK */
    .search-card-input-box {
      display: flex;
      gap: 0.5rem;
      position: relative;
    }

    .card-search-input {
      flex: 1;
      background: #111520;
      border: 2px solid #475569;
      border-radius: 10px;
      padding: 0.65rem 1rem;
      color: #fff;
      font-family: var(--font-body);
      font-size: 0.95rem;
      font-weight: 600;
      outline: none;
      transition: border-color 0.15s ease;
    }
    .card-search-input:focus {
      border-color: var(--cr-gold);
      box-shadow: 0 0 10px rgba(253, 224, 71, 0.3);
    }

    /* Quick Win-Con Chips */
    .quick-win-con-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .quick-chip {
      background: #1e2433;
      border: 1.5px solid #475569;
      border-radius: 8px;
      padding: 0.35rem 0.65rem;
      font-family: var(--font-clash);
      font-size: 0.8rem;
      color: #cbd5e1;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.15s ease;
    }
    .quick-chip img {
      width: 18px;
      height: 18px;
      border-radius: 4px;
    }
    .quick-chip:hover {
      background: var(--cr-blue-deep);
      border-color: var(--cr-blue);
      color: #fff;
      transform: translateY(-1px);
    }
    .quick-chip.active {
      background: linear-gradient(180deg, var(--cr-gold) 0%, var(--cr-gold-deep) 100%);
      border-color: #fff;
      color: #000;
      font-weight: 900;
      box-shadow: 0 0 8px var(--cr-gold);
    }

    /* Archetype Prediction Banner */
    .archetype-result-card {
      background: linear-gradient(180deg, #1e2438 0%, #121624 100%);
      border: 2px solid var(--cr-blue);
      border-radius: 14px;
      padding: 0.85rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 16px rgba(0,0,0,0.5);
    }

    .arch-info h3 {
      font-family: var(--font-clash);
      font-size: 1.25rem;
      color: #fff;
      text-shadow: 0 2px 0 #000;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .arch-meta-tags {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.3rem;
    }
    .arch-tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      background: rgba(0,0,0,0.5);
      border: 1px solid #334155;
    }

    .arch-confidence {
      text-align: right;
    }
    .conf-pct {
      font-family: var(--font-clash);
      font-size: 1.7rem;
      line-height: 1;
      color: var(--cr-green);
      text-shadow: 0 2px 4px rgba(0,0,0,0.8);
    }
    .conf-label {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: #94a3b8;
    }

    /* 2x4 Opponent Hand Matrix */
    .opponent-deck-container {
      background: #121520;
      border: 2px solid #334155;
      border-radius: 14px;
      padding: 1rem;
      box-shadow: inset 0 2px 6px rgba(0,0,0,0.8);
    }

    .deck-matrix-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.85rem;
    }

    .opp-card-slot {
      aspect-ratio: 1 / 1.32;
      background: #1e2435;
      border: 2.5px solid #475569;
      border-radius: 10px;
      position: relative;
      cursor: pointer;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      box-shadow: 0 6px 14px rgba(0,0,0,0.6);
      transition: transform 0.1s ease, border-color 0.15s ease, box-shadow 0.15s ease;
      background-size: cover;
      background-position: center;
      user-select: none;
    }

    .opp-card-slot:hover {
      transform: translateY(-3px) scale(1.02);
      border-color: var(--cr-gold);
    }

    .opp-card-slot:active {
      transform: translateY(1px);
    }

    /* Status Overlays */
    .card-elixir-pill {
      position: absolute;
      top: 4px;
      left: 4px;
      background: var(--cr-elixir);
      border: 1.5px solid #fff;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-clash);
      font-size: 0.85rem;
      color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.8);
      z-index: 5;
    }

    .card-status-pill {
      position: absolute;
      top: 4px;
      right: 4px;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      font-weight: 800;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      background: rgba(0,0,0,0.85);
      border: 1px solid rgba(255,255,255,0.3);
      color: #cbd5e1;
      z-index: 5;
    }
    .card-status-pill.revealed {
      background: rgba(16, 185, 129, 0.85);
      border-color: #fff;
      color: #fff;
    }
    .card-status-pill.predicted {
      background: rgba(8, 145, 178, 0.85);
      border-color: var(--cyber-cyan);
      color: #fff;
    }

    /* Cycle State Badge */
    .cycle-badge {
      background: rgba(15, 23, 42, 0.95);
      border-top: 1.5px solid rgba(255,255,255,0.2);
      padding: 0.35rem 0.2rem;
      text-align: center;
      font-family: var(--font-clash);
      font-size: 0.82rem;
      letter-spacing: 0.3px;
    }

    .opp-card-slot.in-hand {
      border: 3px solid var(--cr-green);
      box-shadow: 0 0 16px rgba(74, 222, 128, 0.7);
    }
    .opp-card-slot.in-hand .cycle-badge {
      background: linear-gradient(180deg, #15803d 0%, #14532d 100%);
      color: #fff;
      text-shadow: 0 1px 2px #000;
    }

    .opp-card-slot.cycle-1 {
      border: 2px solid var(--cr-red);
    }
    .opp-card-slot.cycle-1 .cycle-badge {
      color: #fca5a5;
    }

    .opp-card-slot.cycle-2 {
      border: 2px solid #f59e0b;
    }
    .opp-card-slot.cycle-2 .cycle-badge {
      color: #fde68a;
    }

    .opp-card-slot.cycle-3 {
      border: 2px solid var(--cr-blue);
    }
    .opp-card-slot.cycle-3 .cycle-badge {
      color: #bae6fd;
    }

    .opp-card-slot.cycle-4 {
      border: 2px solid #64748b;
      filter: grayscale(0.5);
    }
    .opp-card-slot.cycle-4 .cycle-badge {
      color: #94a3b8;
    }

    /* Click To Play hint */
    .tap-hint-bar {
      margin-top: 0.5rem;
      font-size: 0.75rem;
      color: #94a3b8;
      text-align: center;
      font-family: var(--font-mono);
    }

    /* RIGHT COLUMN: STRATEGIC ADVICE */
    .advice-section {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .advice-box {
      background: #141824;
      border: 2px solid #334155;
      border-radius: 12px;
      padding: 0.85rem;
    }

    .advice-box.threat-box {
      border-left: 4px solid var(--cr-red);
    }
    .advice-box.counter-box {
      border-left: 4px solid var(--cr-green);
    }

    .advice-box h4 {
      font-family: var(--font-clash);
      font-size: 0.95rem;
      margin-bottom: 0.45rem;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .advice-box.threat-box h4 { color: #fca5a5; }
    .advice-box.counter-box h4 { color: #86efac; }

    .advice-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }
    .advice-list li {
      font-size: 0.82rem;
      color: #cbd5e1;
      line-height: 1.4;
      position: relative;
      padding-left: 1.1rem;
    }
    .advice-list li::before {
      content: '•';
      position: absolute;
      left: 0;
      color: var(--cr-gold);
      font-weight: 900;
    }

    /* Dynamic AI Co-Pilot Line */
    .copilot-tactical-banner {
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
      border: 2px solid var(--cr-gold);
      border-radius: 12px;
      padding: 0.85rem;
      box-shadow: 0 4px 16px rgba(0,0,0,0.6);
    }
    .copilot-tactical-banner h4 {
      font-family: var(--font-clash);
      color: var(--cr-gold);
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      margin-bottom: 0.35rem;
    }
    .copilot-tactical-banner p {
      font-size: 0.85rem;
      color: #fff;
      font-weight: 600;
      line-height: 1.4;
    }

    /* Hotkey Bar */
    .hotkey-footer {
      background: #0d1017;
      border-top: 2px solid #1e293b;
      padding: 0.4rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      color: #64748b;
    }
    .hotkey-pill {
      background: #1e2433;
      color: var(--cr-gold);
      padding: 0.1rem 0.35rem;
      border-radius: 4px;
      border: 1px solid #334155;
    }
  </style>
</head>
<body>

  <!-- Top Cockpit Header -->
  <header class="cockpit-header">
    <div class="header-brand">
      <img src="nexus_crest_cyber.jpg" alt="Nexus Royale" class="header-crest">
      <div class="header-title-box">
        <h1>NEXUS <span>CO-PILOT</span></h1>
        <div class="header-subtitle">SECOND-SCREEN RADAR, DECK FINGERPRINTING & CYCLE TRACKER</div>
      </div>
    </div>

    <div class="header-status-pill">
      <span class="status-dot"></span>
      <span>RADAR ACTIVE • READY FOR MATCH</span>
    </div>

    <div class="header-controls">
      <button class="cr-btn cr-btn-stone" onclick="toggleSound()" id="sound-btn">🔊 Sound: ON</button>
      <button class="cr-btn cr-btn-stone" onclick="toggleFullscreen()">📺 Fullscreen</button>
      <a href="index.html" class="cr-btn cr-btn-yellow" style="font-size: 0.82rem; padding: 0.4rem 0.85rem;">🏰 Back to Main Site</a>
    </div>
  </header>

  <!-- Main 3-Column Cockpit -->
  <main class="cockpit-grid">

    <!-- COLUMN 1: LIVE ELIXIR & MATCH PHASE CLOCK -->
    <section class="cockpit-panel">
      <div class="panel-header">
        <div class="panel-title">⏱️ MATCH CLOCK</div>
        <div class="panel-badge">ELIXIR ENGINE</div>
      </div>

      <!-- Match Timer -->
      <div class="match-timer-box">
        <div class="timer-display" id="timer-val">03:00</div>
        <div class="timer-phase-pill" id="phase-pill">1X REGULAR (2.8s / drop)</div>
        
        <div class="timer-actions">
          <button class="cr-btn cr-btn-green" onclick="startTimer()" id="start-btn" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">▶ START</button>
          <button class="cr-btn cr-btn-blue" onclick="pauseTimer()" id="pause-btn" style="font-size: 0.85rem; padding: 0.4rem 0.85rem;">⏸ PAUSE</button>
          <button class="cr-btn cr-btn-stone" onclick="resetTimer()" style="font-size: 0.85rem; padding: 0.4rem 0.75rem;">↺ RESET</button>
        </div>
      </div>

      <!-- Opponent Elixir Gauge -->
      <div class="elixir-gauge-card">
        <div class="elixir-readout-row">
          <div class="elixir-title">💧 OPPONENT ELIXIR</div>
          <div class="elixir-num"><span id="elixir-val">5.0</span><small>/10</small></div>
        </div>

        <div class="elixir-bar-container">
          <div class="elixir-bar-fill" id="elixir-bar-fill" style="width: 50%;"></div>
          <div class="elixir-ticks">
            <div class="elixir-tick-line"></div>
            <div class="elixir-tick-line"></div>
            <div class="elixir-tick-line"></div>
            <div class="elixir-tick-line"></div>
            <div class="elixir-tick-line"></div>
            <div class="elixir-tick-line"></div>
            <div class="elixir-tick-line"></div>
            <div class="elixir-tick-line"></div>
            <div class="elixir-tick-line"></div>
            <div></div>
          </div>
        </div>

        <!-- Quick Adjustment Buttons -->
        <div class="elixir-adjust-grid">
          <button class="cr-btn cr-btn-stone" onclick="adjustElixir(1)" style="font-size: 0.75rem; padding: 0.35rem 0;">+1 DROP</button>
          <button class="cr-btn cr-btn-stone" onclick="adjustElixir(-1)" style="font-size: 0.75rem; padding: 0.35rem 0;">-1 DROP</button>
          <button class="cr-btn cr-btn-stone" onclick="setElixir(10)" style="font-size: 0.75rem; padding: 0.35rem 0;">CAP 10</button>
          <button class="cr-btn cr-btn-stone" onclick="setElixir(5)" style="font-size: 0.75rem; padding: 0.35rem 0;">RESET 5</button>
        </div>
      </div>

      <!-- Punish Window Warning Banner -->
      <div class="punish-banner" id="punish-banner">
        <h4>⚠️ PUNISH WINDOW OPEN!</h4>
        <p>Opponent is low on Elixir (<span id="punish-elixir-stat">2.5</span>) and primary threat is OUT OF HAND. Push opposite lane now!</p>
      </div>

      <!-- Quick Tips -->
      <div style="background: #131722; border: 1.5px solid #334155; border-radius: 10px; padding: 0.75rem; font-size: 0.78rem; color: #94a3b8;">
        <strong style="color: var(--cr-gold);">Radar Tip:</strong> Clicking an opponent card automatically deducts its exact Elixir cost and updates their 4-card cycle hand.
      </div>
    </section>

    <!-- COLUMN 2: DECK FINGERPRINTING & 4-CARD CYCLE TRACKER -->
    <section class="cockpit-panel">
      <div class="panel-header">
        <div class="panel-title">🎯 OPPONENT DECK RADAR</div>
        <div class="panel-badge" id="detected-match-count">13 METAS TRACKED</div>
      </div>

      <!-- Quick Card Opener / Search -->
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="search-card-input-box">
          <input type="text" id="card-search-input" class="card-search-input" placeholder="🔍 Type first card seen (e.g. Goblin Barrel, Hog, Golem)..." onkeyup="handleSearch(event)">
          <button class="cr-btn cr-btn-yellow" onclick="submitFirstCard()" style="padding: 0.55rem 0.95rem; font-size: 0.85rem;">IDENTIFY</button>
        </div>

        <!-- Quick 1-Tap Opener Chips -->
        <div class="quick-win-con-grid" id="quick-chips-container">
          <!-- Populated by JS -->
        </div>
      </div>

      <!-- Archetype Prediction Card -->
      <div class="archetype-result-card" id="arch-result-card">
        <div class="arch-info">
          <h3 id="arch-name">Classic Log Bait</h3>
          <div class="arch-meta-tags">
            <span class="arch-tag" id="arch-type" style="color: var(--cr-gold);">SPELL BAIT</span>
            <span class="arch-tag" id="arch-avg-elixir" style="color: var(--cr-elixir);">AVG 3.3 💧</span>
            <span class="arch-tag" id="arch-wincon" style="color: #fff;">WIN-CON: Goblin Barrel</span>
          </div>
        </div>
        <div class="arch-confidence">
          <div class="conf-pct" id="arch-conf">94%</div>
          <div class="conf-label">CONFIDENCE</div>
        </div>
      </div>

      <!-- 2x4 Opponent Hand Matrix -->
      <div class="opponent-deck-container">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <span style="font-family: var(--font-clash); font-size: 0.95rem; color: #fff;">OPPONENT 8-CARD CYCLE</span>
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--cr-green);" id="revealed-stat">8/8 PREDICTED</span>
        </div>

        <div class="deck-matrix-grid" id="opp-deck-grid">
          <!-- 8 Cards populated by JS -->
        </div>

        <div class="tap-hint-bar">
          👆 Click any card to mark it PLAYED (subtracts elixir & advances cycle queue)
        </div>
      </div>
    </section>

    <!-- COLUMN 3: STRATEGIC ADVICE & MATCHUP -->
    <section class="cockpit-panel">
      <div class="panel-header">
        <div class="panel-title">🧠 STRATEGIC CO-PILOT</div>
        <div class="panel-badge">AI COACH</div>
      </div>

      <!-- Dynamic Real-Time Advice Line -->
      <div class="copilot-tactical-banner">
        <h4>⚡ LIVE TACTICAL READOUT</h4>
        <p id="copilot-dynamic-advice">
          Opponent is currently neutral. Save The Log strictly for Goblin Barrel. Do not play heavy ground pushes until Inferno Tower is scouted.
        </p>
      </div>

      <!-- Strategic Breakdown -->
      <div class="advice-section">
        <!-- Opponent Threats -->
        <div class="advice-box threat-box">
          <h4>⚠️ OPPONENT THREATS</h4>
          <ul class="advice-list" id="threats-list">
            <li>Watch out for Rocket on your push! Do not group medium troops behind your tank.</li>
            <li>Inferno Tower melts tanks in seconds. Bait it out with swarms or reset with stun.</li>
            <li>Tricky Barrels: Opponent may toss Goblin Barrel to top or side corner to dodge prediction spells.</li>
          </ul>
        </div>

        <!-- Your Best Winning Cards -->
        <div class="advice-box counter-box">
          <h4>🛡️ YOUR BEST COUNTER MOVES</h4>
          <ul class="advice-list" id="counters-list">
            <li>Save The Log / Barb Barrel EXCLUSIVELY for Goblin Barrel. Never waste it on Princess.</li>
            <li>Place a cheap troop (Knight or Ice Spirit) at bridge to kill Princess before she locks onto tower.</li>
            <li>When opponent invests 6 Elixir on Rocket, PUNISH opposite lane instantly!</li>
          </ul>
        </div>
      </div>

      <!-- Your Deck Preset Selector -->
      <div style="background: #111522; border: 1.5px solid #334155; border-radius: 10px; padding: 0.75rem;">
        <div style="font-family: var(--font-clash); font-size: 0.85rem; color: #fff; margin-bottom: 0.35rem;">YOUR ACTIVE DECK:</div>
        <select id="user-deck-select" onchange="changeUserDeck()" style="width: 100%; background: #1e2435; border: 1px solid #475569; color: #fff; padding: 0.4rem; border-radius: 6px; font-family: var(--font-body); font-size: 0.82rem;">
          <option value="pekka_hero">Mohamed Light PEKKA Hero Ice Wizard (Season 87)</option>
          <option value="hog_26">Hog 2.6 Cycle</option>
          <option value="log_bait">Classic Log Bait</option>
          <option value="royal_giant">Royal Giant Fisherman Lightning</option>
        </select>
      </div>
    </section>

  </main>

  <!-- Hotkey Status Footer -->
  <footer class="hotkey-footer">
    <div>
      <span>HOTKEYS: </span>
      <span class="hotkey-pill">SPACE</span> Start/Pause Timer &nbsp;|&nbsp; 
      <span class="hotkey-pill">R</span> Reset Match &nbsp;|&nbsp; 
      <span class="hotkey-pill">1-8</span> Play Opponent Card &nbsp;|&nbsp; 
      <span class="hotkey-pill">+ / -</span> Adjust Elixir
    </div>
    <div>
      NEXUS ROYALE 2026 • 100% LEGAL SECOND-SCREEN COMPANION
    </div>
  </footer>

  <script>
    // -------------------------------------------------------------
    // AUDIO ENGINE (Web Audio API Synthesizer)
    // -------------------------------------------------------------
    let soundEnabled = true;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function getAudioCtx() {
      if (!audioCtx) audioCtx = new AudioCtx();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      return audioCtx;
    }

    function toggleSound() {
      soundEnabled = !soundEnabled;
      document.getElementById('sound-btn').innerText = soundEnabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
      if (soundEnabled) playTone(440, 0.08, 'triangle');
    }

    function playTone(freq, duration = 0.08, type = 'sine') {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {}
    }

    function playElixirSpendSound() {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } catch (e) {}
    }

    function playPunishChime() {
      if (!soundEnabled) return;
      try {
        playTone(587, 0.12, 'square');
        setTimeout(() => playTone(880, 0.2, 'square'), 120);
      } catch (e) {}
    }

    // -------------------------------------------------------------
    // 2026 META ARCHETYPES DATABASE
    // -------------------------------------------------------------
    const META_ARCHETYPES = """ + json.dumps(meta_archetypes) + """;

    // Official card data lookup
    const CARD_CATALOG = {
      'goblin-barrel': { name: 'Goblin Barrel', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/goblin-barrel.png' },
      'princess': { name: 'Princess', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/princess.png' },
      'goblin-gang': { name: 'Goblin Gang', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/goblin-gang.png' },
      'rocket': { name: 'Rocket', elixir: 6, icon: 'https://cdn.royaleapi.com/static/img/cards/rocket.png' },
      'inferno-tower': { name: 'Inferno Tower', elixir: 5, icon: 'https://cdn.royaleapi.com/static/img/cards/inferno-tower.png' },
      'knight': { name: 'Knight', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/knight.png' },
      'ice-spirit': { name: 'Ice Spirit', elixir: 1, icon: 'https://cdn.royaleapi.com/static/img/cards/ice-spirit.png' },
      'the-log': { name: 'The Log', elixir: 2, icon: 'https://cdn.royaleapi.com/static/img/cards/the-log.png' },
      'hog-rider': { name: 'Hog Rider', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/hog-rider.png' },
      'musketeer': { name: 'Musketeer', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/musketeer.png' },
      'ice-golem': { name: 'Ice Golem', elixir: 2, icon: 'https://cdn.royaleapi.com/static/img/cards/ice-golem.png' },
      'cannon': { name: 'Cannon', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/cannon.png' },
      'fireball': { name: 'Fireball', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/fireball.png' },
      'skeletons': { name: 'Skeletons', elixir: 1, icon: 'https://cdn.royaleapi.com/static/img/cards/skeletons.png' },
      'firecracker': { name: 'Firecracker', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/firecracker.png' },
      'mighty-miner': { name: 'Mighty Miner', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/mighty-miner.png' },
      'bomb-tower': { name: 'Bomb Tower', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/bomb-tower.png' },
      'earthquake': { name: 'Earthquake', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/earthquake.png' },
      'pekka': { name: 'P.E.K.K.A', elixir: 7, icon: 'https://cdn.royaleapi.com/static/img/cards/pekka.png' },
      'battle-ram': { name: 'Battle Ram', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/battle-ram.png' },
      'bandit': { name: 'Bandit', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/bandit.png' },
      'royal-ghost': { name: 'Royal Ghost', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/royal-ghost.png' },
      'electro-wizard': { name: 'Electro Wizard', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/electro-wizard.png' },
      'poison': { name: 'Poison', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/poison.png' },
      'zap': { name: 'Zap', elixir: 2, icon: 'https://cdn.royaleapi.com/static/img/cards/zap.png' },
      'minions': { name: 'Minions', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/minions.png' },
      'lava-hound': { name: 'Lava Hound', elixir: 7, icon: 'https://cdn.royaleapi.com/static/img/cards/lava-hound.png' },
      'balloon': { name: 'Balloon', elixir: 5, icon: 'https://cdn.royaleapi.com/static/img/cards/balloon.png' },
      'mega-minion': { name: 'Mega Minion', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/mega-minion.png' },
      'skeleton-dragons': { name: 'Skeleton Dragons', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/skeleton-dragons.png' },
      'tombstone': { name: 'Tombstone', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/tombstone.png' },
      'guards': { name: 'Guards', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/guards.png' },
      'golem': { name: 'Golem', elixir: 8, icon: 'https://cdn.royaleapi.com/static/img/cards/golem.png' },
      'night-witch': { name: 'Night Witch', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/night-witch.png' },
      'baby-dragon': { name: 'Baby Dragon', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/baby-dragon.png' },
      'lumberjack': { name: 'Lumberjack', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/lumberjack.png' },
      'lightning': { name: 'Lightning', elixir: 6, icon: 'https://cdn.royaleapi.com/static/img/cards/lightning.png' },
      'tornado': { name: 'Tornado', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/tornado.png' },
      'barbarian-barrel': { name: 'Barbarian Barrel', elixir: 2, icon: 'https://cdn.royaleapi.com/static/img/cards/barbarian-barrel.png' },
      'royal-giant': { name: 'Royal Giant', elixir: 6, icon: 'https://cdn.royaleapi.com/static/img/cards/royal-giant.png' },
      'fisherman': { name: 'Fisherman', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/fisherman.png' },
      'hunter': { name: 'Hunter', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/hunter.png' },
      'phoenix': { name: 'Phoenix', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/phoenix.png' },
      'electro-spirit': { name: 'Electro Spirit', elixir: 1, icon: 'https://cdn.royaleapi.com/static/img/cards/electro-spirit.png' },
      'graveyard': { name: 'Graveyard', elixir: 5, icon: 'https://cdn.royaleapi.com/static/img/cards/graveyard.png' },
      'ice-wizard': { name: 'Ice Wizard', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/ice-wizard.png' },
      'miner': { name: 'Miner', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/miner.png' },
      'wall-breakers': { name: 'Wall Breakers', elixir: 2, icon: 'https://cdn.royaleapi.com/static/img/cards/wall-breakers.png' },
      'spear-goblins': { name: 'Spear Goblins', elixir: 2, icon: 'https://cdn.royaleapi.com/static/img/cards/spear-goblins.png' },
      'bats': { name: 'Bats', elixir: 2, icon: 'https://cdn.royaleapi.com/static/img/cards/bats.png' },
      'valkyrie': { name: 'Valkyrie', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/valkyrie.png' },
      'goblin-drill': { name: 'Goblin Drill', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/goblin-drill.png' },
      'fire-spirit': { name: 'Fire Spirit', elixir: 1, icon: 'https://cdn.royaleapi.com/static/img/cards/fire-spirit.png' },
      'tesla': { name: 'Tesla', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/tesla.png' },
      'dark-prince': { name: 'Dark Prince', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/dark-prince.png' },
      'dart-goblin': { name: 'Dart Goblin', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/dart-goblin.png' },
      'x-bow': { name: 'X-Bow', elixir: 6, icon: 'https://cdn.royaleapi.com/static/img/cards/x-bow.png' },
      'archers': { name: 'Archers', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/archers.png' },
      'electro-giant': { name: 'Electro Giant', elixir: 7, icon: 'https://cdn.royaleapi.com/static/img/cards/electro-giant.png' },
      'golden-knight': { name: 'Golden Knight', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/golden-knight.png' },
      'royal-recruits': { name: 'Royal Recruits', elixir: 7, icon: 'https://cdn.royaleapi.com/static/img/cards/royal-recruits.png' },
      'royal-hogs': { name: 'Royal Hogs', elixir: 5, icon: 'https://cdn.royaleapi.com/static/img/cards/royal-hogs.png' },
      'flying-machine': { name: 'Flying Machine', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/flying-machine.png' },
      'zappies': { name: 'Zappies', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/zappies.png' },
      'goblin-cage': { name: 'Goblin Cage', elixir: 4, icon: 'https://cdn.royaleapi.com/static/img/cards/goblin-cage.png' },
      'arrows': { name: 'Arrows', elixir: 3, icon: 'https://cdn.royaleapi.com/static/img/cards/arrows.png' }
    };

    // -------------------------------------------------------------
    // CO-PILOT STATE
    // -------------------------------------------------------------
    let activeArchetype = META_ARCHETYPES[0]; // default to Log Bait
    let revealedCards = ['goblin-barrel'];
    let opponentDeckState = []; // 8 cards with cycle distance (0 = in hand, 4 = just played)
    
    let matchTimeSeconds = 180; // 3:00
    let timerRunning = false;
    let timerInterval = null;
    let lastElixirTickTime = Date.now();
    let currentElixir = 5.0; // Starts at 5 in game
    let punishWindowActive = false;

    // -------------------------------------------------------------
    // INIT & SETUP
    // -------------------------------------------------------------
    function init() {
      renderQuickChips();
      loadArchetype(META_ARCHETYPES[0], ['goblin-barrel']);
      startElixirEngine();
      setupKeyboardListeners();
    }

    function renderQuickChips() {
      const container = document.getElementById('quick-chips-container');
      const winCons = [
        { key: 'goblin-barrel', label: 'Barrel' },
        { key: 'hog-rider', label: 'Hog' },
        { key: 'royal-giant', label: 'RG' },
        { key: 'golem', label: 'Golem' },
        { key: 'lava-hound', label: 'Lava' },
        { key: 'pekka', label: 'PEKKA' },
        { key: 'graveyard', label: 'Graveyard' },
        { key: 'miner', label: 'Miner' },
        { key: 'x-bow', label: 'X-Bow' },
        { key: 'goblin-drill', label: 'Drill' },
        { key: 'balloon', label: 'Loon' },
        { key: 'royal-hogs', label: 'Hogs' }
      ];

      container.innerHTML = winCons.map(w => {
        const card = CARD_CATALOG[w.key];
        return `
          <div class="quick-chip ${w.key === 'goblin-barrel' ? 'active' : ''}" onclick="selectQuickOpener('${w.key}', this)">
            <img src="${card.icon}" alt="${w.label}">
            <span>${w.label}</span>
          </div>
        `;
      }).join('');
    }

    function selectQuickOpener(cardKey, el) {
      playTone(520, 0.08);
      document.querySelectorAll('.quick-chip').forEach(c => c.classList.remove('active'));
      if (el) el.classList.add('active');
      fingerprintFromCard(cardKey);
    }

    function handleSearch(e) {
      if (e.key === 'Enter') submitFirstCard();
    }

    function submitFirstCard() {
      const query = document.getElementById('card-search-input').value.trim().toLowerCase();
      if (!query) return;

      // Find best match in catalog
      const foundKey = Object.keys(CARD_CATALOG).find(k => {
        return k.includes(query) || CARD_CATALOG[k].name.toLowerCase().includes(query);
      });

      if (foundKey) {
        document.getElementById('card-search-input').value = '';
        fingerprintFromCard(foundKey);
      } else {
        alert('Card not found in database. Try: Goblin Barrel, Hog Rider, Golem, Pekka, etc.');
      }
    }

    // -------------------------------------------------------------
    // FINGERPRINTING & META MATCHING
    // -------------------------------------------------------------
    function fingerprintFromCard(cardKey) {
      // Find candidate archetypes containing this card
      const candidates = META_ARCHETYPES.filter(a => a.cards.includes(cardKey));
      if (candidates.length === 0) {
        alert('Card verified! No pre-set meta matches for ' + cardKey + ', analyzing as custom control.');
        return;
      }

      // Pick top candidate
      const topMatch = candidates[0];
      const confidence = candidates.length === 1 ? '96%' : '88%';
      loadArchetype(topMatch, [cardKey], confidence);
    }

    function loadArchetype(arch, revealed = [], customConf = null) {
      activeArchetype = arch;
      revealedCards = [...revealed];

      // Update UI Banner
      document.getElementById('arch-name').innerText = arch.name;
      document.getElementById('arch-type').innerText = arch.archetype.toUpperCase();
      document.getElementById('arch-avg-elixir').innerText = 'AVG ' + arch.avgElixir + ' 💧';
      document.getElementById('arch-wincon').innerText = 'WIN-CON: ' + arch.winCondition;
      document.getElementById('arch-conf').innerText = customConf || (revealed.length > 1 ? '99%' : '94%');

      // Build initial 8-card cycle state (first 4 in hand, last 4 in cycle queue)
      opponentDeckState = arch.cards.map((k, idx) => {
        const cardInfo = CARD_CATALOG[k] || { name: k, elixir: 3, icon: '' };
        return {
          key: k,
          name: cardInfo.name,
          elixir: cardInfo.elixir,
          icon: cardInfo.icon,
          isRevealed: revealed.includes(k),
          cycleDist: idx < 4 ? 0 : (idx - 3) // 0 = in hand, 1 = 1 away, etc.
        };
      });

      renderOpponentDeck();
      renderStrategicAdvice(arch);
      updateDynamicAdvice();
    }

    function renderOpponentDeck() {
      const container = document.getElementById('opp-deck-grid');
      let revealedCount = 0;

      container.innerHTML = opponentDeckState.map((c, idx) => {
        if (c.isRevealed) revealedCount++;
        
        // Cycle status label
        let cycleClass = 'in-hand';
        let cycleText = '🟢 IN HAND';
        if (c.cycleDist === 1) { cycleClass = 'cycle-1'; cycleText = '🔴 1 AWAY'; }
        else if (c.cycleDist === 2) { cycleClass = 'cycle-2'; cycleText = '🟡 2 AWAY'; }
        else if (c.cycleDist === 3) { cycleClass = 'cycle-3'; cycleText = '🔵 3 AWAY'; }
        else if (c.cycleDist >= 4) { cycleClass = 'cycle-4'; cycleText = '⚪ 4 AWAY'; }

        return `
          <div class="opp-card-slot ${cycleClass}" style="background-image: linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.75)), url('${c.icon}');" onclick="playOpponentCard(${idx})">
            <div class="card-elixir-pill">${c.elixir}</div>
            <div class="card-status-pill ${c.isRevealed ? 'revealed' : 'predicted'}">
              ${c.isRevealed ? '✓ SEEN' : '👁 PRED'}
            </div>
            <div class="cycle-badge">${cycleText}</div>
          </div>
        `;
      }).join('');

      document.getElementById('revealed-stat').innerText = revealedCount + '/8 REVEALED';
    }

    // -------------------------------------------------------------
    // PLAY OPPONENT CARD (4-Card Cycle Shift & Elixir Spend)
    // -------------------------------------------------------------
    function playOpponentCard(index) {
      const card = opponentDeckState[index];
      if (!card) return;

      playElixirSpendSound();

      // 1. Subtract Card Elixir Cost
      currentElixir = Math.max(0, currentElixir - card.elixir);
      updateElixirUI();

      // 2. Mark card as Revealed
      card.isRevealed = true;

      // 3. Shift 4-Card Cycle:
      // The played card is now 4 cards away in the queue!
      card.cycleDist = 4;

      // Decrement cycle distance for all other cards that are in cycle (> 0)
      opponentDeckState.forEach((c, idx) => {
        if (idx !== index) {
          if (c.cycleDist > 0) {
            c.cycleDist -= 1; // e.g. 1 away becomes 0 (IN HAND!)
          }
        }
      });

      renderOpponentDeck();
      checkPunishWindow();
      updateDynamicAdvice();
    }

    // -------------------------------------------------------------
    // STRATEGIC ADVICE RENDERING
    // -------------------------------------------------------------
    function renderStrategicAdvice(arch) {
      document.getElementById('threats-list').innerHTML = arch.threats.map(t => `<li>${t}</li>`).join('');
      document.getElementById('counters-list').innerHTML = arch.counters.map(c => `<li>${c}</li>`).join('');
    }

    function updateDynamicAdvice() {
      const adviceEl = document.getElementById('copilot-dynamic-advice');
      const winConCard = opponentDeckState.find(c => c.name.toLowerCase() === activeArchetype.winCondition.toLowerCase()) || opponentDeckState[0];
      const winConInHand = winConCard ? winConCard.cycleDist === 0 : false;

      if (currentElixir <= 3.5 && !winConInHand) {
        adviceEl.innerHTML = `<span style="color: var(--cr-red); font-weight: 900;">PUNISH OPPORTUNITY:</span> Opponent has only <strong>${currentElixir.toFixed(1)} Elixir</strong> and ${activeArchetype.winCondition} is <strong>OUT OF HAND</strong> (${winConCard.cycleDist} away). Drop your main tank or bridge pressure now!`;
      } else if (winConInHand && currentElixir >= 7) {
        adviceEl.innerHTML = `<span style="color: var(--cr-gold); font-weight: 900;">HIGH ALERT:</span> Opponent is sitting on <strong>${currentElixir.toFixed(1)} Elixir</strong> and has <strong>${activeArchetype.winCondition} READY IN HAND</strong>. Hold your counter card and do not overcommit!`;
      } else if (matchTimeSeconds <= 60) {
        adviceEl.innerHTML = `<span style="color: var(--cr-blue); font-weight: 900;">DOUBLE ELIXIR PHASE:</span> Pace increases to 1.4s/drop. Spells will cycle 2x faster. Focus on chip control and defensive positioning.`;
      } else {
        adviceEl.innerHTML = `Patience phase: Opponent at <strong>${currentElixir.toFixed(1)} Elixir</strong>. Cycle cheap cards at back or wait for opponent to make first investment.`;
      }
    }

    // -------------------------------------------------------------
    // LIVE ELIXIR TICK ENGINE
    // -------------------------------------------------------------
    function startElixirEngine() {
      setInterval(() => {
        if (!timerRunning) return;

        const now = Date.now();
        const deltaSeconds = (now - lastElixirTickTime) / 1000;
        lastElixirTickTime = now;

        // Clash Royale Elixir Generation Rates:
        // 1x (3:00 - 1:00): 1 drop / 2.8s = 0.357 drops/sec
        // 2x (1:00 - 0:00): 1 drop / 1.4s = 0.714 drops/sec
        // 3x (Overtime):    1 drop / 0.9s = 1.111 drops/sec
        let ratePerSec = 1.0 / 2.8;
        if (matchTimeSeconds <= 0) {
          ratePerSec = 1.0 / 0.9; // 3x Overtime
        } else if (matchTimeSeconds <= 60) {
          ratePerSec = 1.0 / 1.4; // 2x Double Elixir
        }

        currentElixir = Math.min(10.0, currentElixir + (ratePerSec * deltaSeconds));
        updateElixirUI();
        checkPunishWindow();
      }, 100);
    }

    function updateElixirUI() {
      document.getElementById('elixir-val').innerText = currentElixir.toFixed(1);
      const pct = (currentElixir / 10.0) * 100;
      document.getElementById('elixir-bar-fill').style.width = pct + '%';
    }

    function adjustElixir(amount) {
      playTone(400, 0.05);
      currentElixir = Math.max(0, Math.min(10, currentElixir + amount));
      updateElixirUI();
      checkPunishWindow();
      updateDynamicAdvice();
    }

    function setElixir(val) {
      playTone(400, 0.05);
      currentElixir = val;
      updateElixirUI();
      checkPunishWindow();
      updateDynamicAdvice();
    }

    function checkPunishWindow() {
      const banner = document.getElementById('punish-banner');
      const winConCard = opponentDeckState.find(c => c.name.toLowerCase() === activeArchetype.winCondition.toLowerCase()) || opponentDeckState[0];
      const winConInHand = winConCard ? winConCard.cycleDist === 0 : false;

      if (currentElixir <= 3.5 && !winConInHand) {
        document.getElementById('punish-elixir-stat').innerText = currentElixir.toFixed(1);
        if (!punishWindowActive) {
          punishWindowActive = true;
          banner.classList.add('show');
          playPunishChime();
        }
      } else {
        punishWindowActive = false;
        banner.classList.remove('show');
      }
    }

    // -------------------------------------------------------------
    // MATCH TIMER ENGINE
    // -------------------------------------------------------------
    function startTimer() {
      if (timerRunning) return;
      playTone(600, 0.08);
      timerRunning = true;
      lastElixirTickTime = Date.now();
      document.getElementById('start-btn').innerText = 'RUNNING...';

      timerInterval = setInterval(() => {
        matchTimeSeconds--;
        updateTimerDisplay();

        if (matchTimeSeconds === 60) {
          // Double Elixir announcement
          playTone(700, 0.2, 'square');
        } else if (matchTimeSeconds === 0) {
          // Triple Elixir Overtime
          playTone(850, 0.3, 'square');
        }
      }, 1000);
    }

    function pauseTimer() {
      playTone(450, 0.08);
      timerRunning = false;
      clearInterval(timerInterval);
      document.getElementById('start-btn').innerText = '▶ RESUME';
    }

    function resetTimer() {
      playTone(350, 0.08);
      pauseTimer();
      matchTimeSeconds = 180;
      currentElixir = 5.0;
      updateTimerDisplay();
      updateElixirUI();
      document.getElementById('start-btn').innerText = '▶ START';
    }

    function updateTimerDisplay() {
      const m = Math.floor(Math.abs(matchTimeSeconds) / 60);
      const s = Math.abs(matchTimeSeconds) % 60;
      const formatted = (matchTimeSeconds < 0 ? '-' : '') + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
      document.getElementById('timer-val').innerText = formatted;

      const phasePill = document.getElementById('phase-pill');
      if (matchTimeSeconds <= 0) {
        phasePill.className = 'timer-phase-pill phase-triple';
        phasePill.innerText = '⚡ 3X TRIPLE ELIXIR (0.9s / drop)';
      } else if (matchTimeSeconds <= 60) {
        phasePill.className = 'timer-phase-pill phase-double';
        phasePill.innerText = '🔥 2X DOUBLE ELIXIR (1.4s / drop)';
      } else {
        phasePill.className = 'timer-phase-pill';
        phasePill.innerText = '1X REGULAR (2.8s / drop)';
      }
    }

    // -------------------------------------------------------------
    // KEYBOARD HOTKEYS
    // -------------------------------------------------------------
    function setupKeyboardListeners() {
      window.addEventListener('keydown', (e) => {
        // Spacebar starts/pauses timer (unless typing in search)
        if (e.code === 'Space' && document.activeElement !== document.getElementById('card-search-input')) {
          e.preventDefault();
          if (timerRunning) pauseTimer(); else startTimer();
        } else if ((e.key === 'r' || e.key === 'R') && document.activeElement !== document.getElementById('card-search-input')) {
          resetTimer();
        } else if (e.key >= '1' && e.key <= '8' && document.activeElement !== document.getElementById('card-search-input')) {
          const cardIdx = parseInt(e.key) - 1;
          if (opponentDeckState[cardIdx]) playOpponentCard(cardIdx);
        } else if (e.key === '+' || e.key === '=') {
          adjustElixir(1);
        } else if (e.key === '-' || e.key === '_') {
          adjustElixir(-1);
        }
      });
    }

    function toggleFullscreen() {
      playTone(500, 0.05);
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    }

    function changeUserDeck() {
      playTone(480, 0.05);
      alert('Deck profile loaded! Matchup calculations synchronized.');
    }

    // Launch
    window.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>
"""

with open('/Users/jacksonmcmurdo/Desktop/Nexus Royale/V1/radar.html', 'w') as f:
    f.write(html_template)

print('radar.html written successfully!')
