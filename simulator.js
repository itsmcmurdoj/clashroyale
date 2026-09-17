// Nexus Royale 2030 - Deck Analysis & Real-Time Matchup Simulation Engine

const SimulatorEngine = {
  // Compute Average Elixir
  getAverageElixir: function(cards) {
    if (!cards || cards.length === 0) return 0;
    const sum = cards.reduce((acc, c) => acc + (c.elixir || 0), 0);
    return (sum / cards.length).toFixed(1);
  },

  // 4-Card Cycle Cost (Cheapest 4 cards in deck)
  getFourCardCycle: function(cards) {
    if (!cards || cards.length < 4) return 0;
    const sorted = [...cards].sort((a, b) => a.elixir - b.elixir);
    const sum = sorted.slice(0, 4).reduce((acc, c) => acc + c.elixir, 0);
    return sum;
  },

  // Detect Deck Archetype
  detectArchetype: function(cards) {
    if (!cards || cards.length === 0) return "Custom Deck";
    const keys = cards.map(c => c.key);
    const avg = parseFloat(this.getAverageElixir(cards));

    if (keys.includes("x-bow") || keys.includes("mortar")) return "Siege Defense";
    if (keys.includes("goblin-barrel") && (keys.includes("princess") || keys.includes("goblin-gang"))) return "Classic Spell Bait";
    if (keys.includes("golem") || keys.includes("lava-hound") || keys.includes("electro-giant")) return "Heavy Beatdown";
    if (keys.includes("pekka") && (keys.includes("battle-ram") || keys.includes("bandit"))) return "Bridge Spam Control";
    if (avg <= 3.0 && (keys.includes("hog-rider") || keys.includes("miner") || keys.includes("wall-breakers"))) return "Fast Cycle Pressure";
    if (keys.includes("graveyard")) return "Graveyard Control";
    if (keys.includes("royal-giant")) return "Royal Giant Beatdown";
    if (keys.includes("royal-recruits") && keys.includes("royal-hogs")) return "Dual-Lane Split";
    if (avg >= 4.0) return "Heavy Control";
    return "Midrange Tempo";
  },

  // Compute Defensive & Offensive Capabilities (0-100)
  calculateRadarScores: function(cards) {
    if (!cards || cards.length === 0) {
      return { antiAir: 0, swarmClear: 0, tankBuster: 0, cycleSpeed: 0, defense: 0, synergy: 0 };
    }

    let antiAir = 0;
    let swarmClear = 0;
    let tankBuster = 0;
    let spellCount = 0;
    let buildingCount = 0;

    cards.forEach(c => {
      if (c.target === "air-ground" || c.target === "all") antiAir += 25;
      if (c.role && (c.role.includes("splash") || c.role.includes("swarm-clear") || c.key === "fireball" || c.key === "the-log" || c.key === "arrows" || c.key === "poison")) swarmClear += 25;
      if (c.role && (c.role.includes("tank-killer") || c.role.includes("tank-buster") || c.key === "inferno-tower" || c.key === "pekka" || c.key === "mini-pekka")) tankBuster += 35;
      if (c.type === "spell") spellCount++;
      if (c.type === "building") buildingCount++;
    });

    const avg = parseFloat(this.getAverageElixir(cards));
    const cycleSpeed = Math.max(10, Math.min(100, Math.round((5.0 - avg) * 35)));
    const defense = Math.min(100, Math.round(buildingCount * 25 + (tankBuster > 0 ? 30 : 0) + (antiAir > 0 ? 25 : 0) + 15));
    const synergy = Math.min(100, Math.round(
      (spellCount >= 2 ? 25 : 10) +
      (antiAir >= 50 ? 25 : 10) +
      (swarmClear >= 50 ? 25 : 10) +
      (cards.some(c => c.role === "win-condition") ? 25 : 5)
    ));

    return {
      antiAir: Math.min(100, antiAir),
      swarmClear: Math.min(100, swarmClear),
      tankBuster: Math.min(100, tankBuster),
      cycleSpeed: cycleSpeed,
      defense: defense,
      synergy: synergy
    };
  },

  // Calculate Overall Grade
  calculateDeckGrade: function(radar) {
    const avg = (radar.antiAir + radar.swarmClear + radar.tankBuster + radar.defense + radar.synergy) / 5;
    if (avg >= 85) return { grade: "S+", color: "#10b981", label: "Apex Meta Grade" };
    if (avg >= 75) return { grade: "S", color: "#06b6d4", label: "Pro Competitor Grade" };
    if (avg >= 65) return { grade: "A", color: "#3b82f6", label: "High Ladder Viable" };
    if (avg >= 50) return { grade: "B", color: "#f59e0b", label: "Decent Synergy" };
    return { grade: "C", color: "#ef4444", label: "Needs Optimization" };
  },

  // AI Suggestions for Weakness Fixing
  getAISuggestions: function(cards) {
    if (!cards || cards.length < 4) return [];
    const radar = this.calculateRadarScores(cards);
    const suggestions = [];
    const keys = cards.map(c => c.key);

    if (radar.antiAir < 40) {
      suggestions.push({
        type: "Anti-Air Vulnerability",
        badge: "Critical",
        desc: "Deck struggles heavily against Balloon & Lava Hound. Consider swapping in Musketeer, Archers, or Tesla.",
        swapIn: "musketeer",
        action: "Boost Air Defense"
      });
    }

    if (radar.tankBuster < 30) {
      suggestions.push({
        type: "Low Tank DPS",
        badge: "High Risk",
        desc: "Golem and Mega Knight pushes will breach towers. Swap in Mini P.E.K.K.A, Inferno Tower, or Knight.",
        swapIn: "mini-pekka",
        action: "Add Tank Buster"
      });
    }

    const spells = cards.filter(c => c.type === "spell");
    if (spells.length === 0) {
      suggestions.push({
        type: "Missing Spell Support",
        badge: "Essential",
        desc: "Decks without small/medium spells get overwhelmed by swarm and chip. Add The Log or Fireball.",
        swapIn: "the-log",
        action: "Add Small Spell"
      });
    } else if (spells.length >= 4) {
      suggestions.push({
        type: "Spell Saturation",
        badge: "Warning",
        desc: "Over 3 spells causes awkward defensive opening hands. Swap 1 spell for a low-cost distraction troop.",
        swapIn: "skeletons",
        action: "Balance Troop Ratio"
      });
    }

    const hasWinCondition = cards.some(c => c.role === "win-condition");
    if (!hasWinCondition) {
      suggestions.push({
        type: "No Dedicated Win Condition",
        badge: "Strategy",
        desc: "You have no reliable tower-targeting card. Include Hog Rider, Goblin Barrel, Miner, or Royal Giant.",
        swapIn: "hog-rider",
        action: "Add Win Condition"
      });
    }

    if (suggestions.length === 0) {
      suggestions.push({
        type: "Meta Fine-Tuning",
        badge: "Optimized",
        desc: "Deck balance is elite. For 2030 Top Ladder, ensure you leverage Card Evolutions on your core anchors.",
        swapIn: "knight",
        action: "Verify Evolution Slots"
      });
    }

    return suggestions;
  },

  // Matchup Simulator (Deck A vs Deck B)
  simulateMatchup: function(deckA, deckB) {
    if (!deckA || !deckB || deckA.length === 0 || deckB.length === 0) return null;

    const radarA = this.calculateRadarScores(deckA);
    const radarB = this.calculateRadarScores(deckB);
    const avgA = parseFloat(this.getAverageElixir(deckA));
    const avgB = parseFloat(this.getAverageElixir(deckB));

    let scoreA = 50;
    const insights = [];

    // Cycle advantage
    if (avgA < avgB - 0.7) {
      scoreA += 8;
      insights.push(`Deck 1 cycles ${ (avgB - avgA).toFixed(1) } elixir faster, enabling severe punish windows.`);
    } else if (avgB < avgA - 0.7) {
      scoreA -= 8;
      insights.push(`Deck 2 cycles ${ (avgA - avgB).toFixed(1) } elixir faster, controlling tempo.`);
    }

    // Air attack vs Anti-air
    const hasAirAttackerA = deckA.some(c => c.key === "balloon" || c.key === "lava-hound");
    const hasAirAttackerB = deckB.some(c => c.key === "balloon" || c.key === "lava-hound");
    if (hasAirAttackerA && radarB.antiAir < 50) {
      scoreA += 12;
      insights.push("Deck 1 has dominant aerial win conditions while Deck 2 lacks high-dps air targeting.");
    }
    if (hasAirAttackerB && radarA.antiAir < 50) {
      scoreA -= 12;
      insights.push("Deck 2 air pressure threatens Deck 1 severe damage due to sub-50% anti-air coverage.");
    }

    // Tank Buster vs Heavy Beatdown
    const isBeatdownA = deckA.some(c => c.key === "golem" || c.key === "electro-giant" || c.key === "giant");
    const isBeatdownB = deckB.some(c => c.key === "golem" || c.key === "electro-giant" || c.key === "giant");
    if (isBeatdownA && radarB.tankBuster >= 60) {
      scoreA -= 10;
      insights.push("Deck 2 features hard tank melt defenses that neutralize Deck 1 push investments.");
    }
    if (isBeatdownB && radarA.tankBuster >= 60) {
      scoreA += 10;
      insights.push("Deck 1 defenses dismantle Deck 2 heavy tank pushes with high elixir efficiency.");
    }

    // Spell Bait interactions
    const hasBaitA = deckA.some(c => c.key === "goblin-barrel");
    const hasBaitB = deckB.some(c => c.key === "goblin-barrel");
    const hasLogZapA = deckA.some(c => c.key === "the-log" || c.key === "zap" || c.key === "arrows");
    const hasLogZapB = deckB.some(c => c.key === "the-log" || c.key === "zap" || c.key === "arrows");
    if (hasBaitA && !hasLogZapB) {
      scoreA += 14;
      insights.push("Deck 2 has NO direct small spell answers to Deck 1 Goblin Barrel swarm!");
    }
    if (hasBaitB && !hasLogZapA) {
      scoreA -= 14;
      insights.push("Deck 1 lacks small spell answers to Deck 2 Goblin Barrel swarm!");
    }

    // Bound probability
    const winRateA = Math.max(15, Math.min(85, Math.round(scoreA)));
    const winRateB = 100 - winRateA;

    let verdict = "Even Matchup (50-50)";
    if (winRateA >= 65) verdict = "Deck 1 Hard Advantage";
    else if (winRateA > 54) verdict = "Deck 1 Slight Advantage";
    else if (winRateA <= 35) verdict = "Deck 2 Hard Advantage";
    else if (winRateA < 46) verdict = "Deck 2 Slight Advantage";

    return {
      winRateA,
      winRateB,
      verdict,
      insights: insights.length > 0 ? insights : ["Both decks boast mirrored defensive coverage and symmetric elixir trade ratios."]
    };
  },

  // Deep Link Builder for Official In-Game Copy (link.clashroyale.com)
  generateCopyLinks: function(cards) {
    if (!cards || !Array.isArray(cards) || cards.length === 0) {
      return { deepLink: "#", webLink: "#", ids: "", count: 0, cards: [] };
    }

    const cardsDb = (typeof CLASH_CARDS !== "undefined") ? CLASH_CARDS : [];
    const resolved = [];

    cards.forEach(c => {
      if (!c) return;
      let match = null;

      // 1. String key or name
      if (typeof c === "string") {
        const clean = c.toLowerCase().trim().replace(/[\s\.\-_]/g, "");
        match = cardsDb.find(x => 
          x.key.replace(/[\s\.\-_]/g, "") === clean || 
          x.name.toLowerCase().replace(/[\s\.\-_]/g, "") === clean
        );
      } else if (typeof c === "object") {
        // 2. Object with name
        if (c.name) {
          const cleanName = c.name.toLowerCase().trim().replace(/[\s\.\-_]/g, "");
          match = cardsDb.find(x => 
            x.name.toLowerCase().replace(/[\s\.\-_]/g, "") === cleanName ||
            x.key.replace(/[\s\.\-_]/g, "") === cleanName
          );
        }
        // 3. Object with key
        if (!match && c.key) {
          const cleanKey = c.key.toLowerCase().trim().replace(/[\s\.\-_]/g, "");
          match = cardsDb.find(x => x.key.replace(/[\s\.\-_]/g, "") === cleanKey);
        }
        // 4. Object with numeric ID
        if (!match && c.id && typeof c.id === "number") {
          match = cardsDb.find(x => x.id === c.id);
        }
      }

      if (match) {
        // Filter out tower troops (they cannot be passed in the 8-card battle deck URL)
        const nm = match.name.toLowerCase();
        if (nm.includes("tower") || nm.includes("cannoneer") || nm.includes("duchess")) return;

        if (!resolved.some(r => r.id === match.id)) {
          resolved.push(match);
        }
      } else if (c && typeof c === "object" && typeof c.id === "number" && c.id >= 26000000 && c.id < 29000000) {
        const nm = (c.name || "").toLowerCase();
        if (!nm.includes("tower") && !nm.includes("cannoneer") && !nm.includes("duchess")) {
          if (!resolved.some(r => r.id === c.id)) {
            resolved.push({ 
              id: c.id, 
              name: c.name || "Card", 
              icon: (c.iconUrls && (c.iconUrls.medium || c.iconUrls.evolutionMedium || c.iconUrls.heroMedium)) || ""
            });
          }
        }
      }
    });

    const finalDeck = resolved.slice(0, 8);
    const ids = finalDeck.map(c => c.id).join(";");

    return {
      deepLink: `clashroyale://copyDeck?deck=${ids}`,
      webLink: `https://link.clashroyale.com/deck/en?deck=${ids}`,
      ids: ids,
      count: finalDeck.length,
      cards: finalDeck
    };
  }
};
