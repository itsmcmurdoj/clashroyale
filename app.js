// ============================================================================
// NEXUS ROYALE V2 PRO - ESPORTS INTELLIGENCE & AUTONOMOUS COMPANY HUB (2026)
// Season 87 Meta • Web Audio FX • Creator Code NEXUS • AI Company Ops
// ============================================================================

// --- 1. WEB AUDIO SYNTHESIZER (NATIVE ZERO-LATENCY SFX) ---
const WebAudioFX = {
  ctx: null,
  enabled: localStorage.getItem("nexus_sfx") !== "false",

  init: function() {
    // Lazy initialize on first user gesture
    const unlock = () => {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      document.removeEventListener("click", unlock);
      document.removeEventListener("keydown", unlock);
    };
    document.addEventListener("click", unlock, { once: true });
    document.addEventListener("keydown", unlock, { once: true });
    this.updateToggleUI();
  },

  toggle: function() {
    this.enabled = !this.enabled;
    localStorage.setItem("nexus_sfx", this.enabled);
    this.updateToggleUI();
    if (this.enabled) {
      this.playTone(587.33, "triangle", 0.12, 0.15); // D5
    }
  },

  updateToggleUI: function() {
    const btn = document.getElementById("btn-toggle-audio");
    const icon = document.getElementById("audio-icon");
    const txt = document.getElementById("audio-txt");
    if (!btn || !icon || !txt) return;

    if (this.enabled) {
      btn.classList.add("on");
      icon.textContent = "🔊";
      txt.textContent = "SFX ON";
    } else {
      btn.classList.remove("on");
      icon.textContent = "🔇";
      txt.textContent = "SFX OFF";
    }
  },

  playTone: function(freq, type = "sine", duration = 0.1, gainVal = 0.1) {
    if (!this.enabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.ctx && AudioCtx) this.ctx = new AudioCtx();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.debug("Audio playTone silenced:", e);
    }
  },

  // Satisfying UI click
  playClick: function() {
    this.playTone(800, "sine", 0.05, 0.08);
  },

  // Resonant card lock-in chord
  playCardLock: function() {
    if (!this.enabled) return;
    const notes = [440, 554.37, 659.25]; // A major
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "triangle", 0.18, 0.06), idx * 30);
    });
  },

  // Success arpeggio (Creator Code copy, sync, etc.)
  playSuccess: function() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "triangle", 0.2, 0.09), idx * 45);
    });
  },

  // Hero showcase aura shimmer
  playHeroAura: function() {
    if (!this.enabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.ctx && AudioCtx) this.ctx = new AudioCtx();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch (e) {
      console.debug("Aura sound silenced:", e);
    }
  },

  // Matchup simulation compute hum
  playSimulateHum: function() {
    if (!this.enabled) return;
    const notes = [293.66, 369.99, 440, 587.33]; // D maj
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, "sine", 0.25, 0.08), idx * 60);
    });
  }
};

// --- 2. MAIN APPLICATION CONTROLLER ---
const SUPERCELL_PROXY_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijk4NjgyNmYyLWUyY2MtNGUwZS1hNGUwLTlhMTBkOWU3NTdlYiIsImlhdCI6MTc4OTc0OTg1MSwic3ViIjoiZGV2ZWxvcGVyL2I2YWRiNmRkLWVkM2MtNDhiZC04OTE5LTU1YjJhYjYyOTYwMCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.QPsNhg4EWwJAMiXmBUcijlb4m159CVw6e0xr_PHjyhfuc-1ynuvVstR3Et4AdZdteLJRky58uxIHWbtPwQl5ww";

const App = {
  activeTag: localStorage.getItem("linked_player_tag") || "",
  activePlayer: null,
  activeBattles: [],
  studioDeck: [],
  catalogCategory: "all",
  searchFilter: "",
  currentHeroFilter: "all",
  simDeck1: [],

  formatBattleTime: function(isoStr) {
    if (!isoStr) return "Recent";
    try {
      const y = parseInt(isoStr.slice(0, 4), 10);
      const m = parseInt(isoStr.slice(4, 6), 10) - 1;
      const d = parseInt(isoStr.slice(6, 8), 10);
      const h = parseInt(isoStr.slice(9, 11), 10);
      const min = parseInt(isoStr.slice(11, 13), 10);
      const s = parseInt(isoStr.slice(13, 15), 10);
      const bTime = Date.UTC(y, m, d, h, min, s);
      const diffSec = Math.max(0, Math.floor((Date.now() - bTime) / 1000));
      if (diffSec < 60) return "Just now";
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) {
        const hrs = Math.floor(diffSec / 3600);
        const mins = Math.floor((diffSec % 3600) / 60);
        return mins > 0 ? `${hrs}h ${mins}m ago` : `${hrs}h ago`;
      }
      return `${Math.floor(diffSec / 86400)}d ago`;
    } catch (e) {
      return "Recent";
    }
  },
  simDeck2: [],

  // Live CEO Simulated Metrics
  ceoMetrics: {
    monthlyTraffic: 124500,
    creatorCodeUses: 412,
    cpm: 5.00
  },

  // 2026 Showcase Roster for 3D Hero Gateway
  showcaseCards: {
    icewizard: {
      name: "Hero Ice Wizard",
      elixir: 3,
      rarity: "Season 87 S-Tier Hero",
      desc: "❄️ Frost Surge (1⚡ Single-Use): 360° Blizzard Nova slows hitspeed 65% & freezes swarms",
      img: "https://api-assets.clashroyale.com/cardheroes/300/W3dkw0HTw9n1jB-zbknY2w3wHuyuLxSRIAV5fUT1SEY.png",
      rarityColor: "#facc15",
      rarityBg: "rgba(234, 179, 8, 0.2)",
      rarityBorder: "#eab308"
    },
    knight: {
      name: "Hero Knight",
      elixir: 3,
      rarity: "S-Tier Hero",
      desc: "🛡️ Iron Bulwark (1⚡ Single-Use): Taunts nearby enemies & absorbs 70% incoming damage for 4s",
      img: "https://api-assets.clashroyale.com/cardheroes/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png",
      rarityColor: "#facc15",
      rarityBg: "rgba(234, 179, 8, 0.2)",
      rarityBorder: "#eab308"
    },
    valkyrie: {
      name: "Hero Valkyrie",
      elixir: 4,
      rarity: "S-Tier Hero",
      desc: "🌪️ Cyclone Vortex (1⚡ Single-Use): Vacuums ground troops within 4 tiles into a lethal spin",
      img: "https://api-assets.clashroyale.com/cardheroes/300/0lIoYf3Y_plFTzo95zZL93JVxpfb3MMgFDDhgSDGU9A.png",
      rarityColor: "#facc15",
      rarityBg: "rgba(234, 179, 8, 0.2)",
      rarityBorder: "#eab308"
    },
    bossbandit: {
      name: "Boss Bandit",
      elixir: 6,
      rarity: "Champion (Exception)",
      desc: "⚔️ Shadow Dash (1⚡): Retains multi-use dash cooldown (11s) after August 26, 2026 patch",
      img: "https://api-assets.clashroyale.com/cards/300/nuceG9o7rAyvyc7D3sp2QSiRYtSOEgraq0NJkDf729s.png",
      rarityColor: "#ec4899",
      rarityBg: "rgba(236, 72, 153, 0.2)",
      rarityBorder: "#ec4899"
    },
    goblinstein: {
      name: "Goblinstein",
      elixir: 5,
      rarity: "Champion",
      desc: "⚡ Lightning Arc Tether (2⚡ Single-Use): High-voltage electric conduit zaps crossing troops",
      img: "https://api-assets.clashroyale.com/cards/300/mQ20B49dXdk7Nv0lMdLw175M3YvkSpN6KNnho8UKBd8.png",
      rarityColor: "#ec4899",
      rarityBg: "rgba(236, 72, 153, 0.2)",
      rarityBorder: "#ec4899"
    }
  },

  init: function() {
    WebAudioFX.init();
    this.initPwa();
    this.bindEvents();
    this.setupCardPhysics();
    this.setupAmbientCanvas();
    this.renderHeroesCatalog("all");
    this.renderMetaRankings();
    this.setupDefaultStudioDeck();
    this.setupMatchupArena();
    this.setup2v2Radar();
    this.setupDeckRecallMinigame();

    const initialTag = this.activeTag || "Y0JJY80";
    this.fetchPlayerData(initialTag);
  },

  // Set up event listeners for all UI controls
  bindEvents: function() {
    // 1. Audio FX toggle
    const audioBtn = document.getElementById("btn-toggle-audio");
    if (audioBtn) {
      audioBtn.addEventListener("click", () => WebAudioFX.toggle());
    }

    // 2. Creator Code Modal & In-Game Boost Launcher
    const openCreatorModal = () => {
      WebAudioFX.playClick();
      const modal = document.getElementById("creator-code-modal");
      if (modal) modal.style.display = "flex";
    };

    const copyCodeBtn = document.getElementById("btn-copy-creator-code");
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openCreatorModal();
      });
    }

    const bannerEl = document.getElementById("creator-code-banner");
    if (bannerEl) {
      bannerEl.addEventListener("click", (e) => {
        if (e.target.closest("#btn-copy-creator-code")) return;
        openCreatorModal();
      });
    }

    const footerCodeCard = document.getElementById("footer-code-card");
    if (footerCodeCard) {
      footerCodeCard.addEventListener("click", openCreatorModal);
    }

    const closeCreatorBtn = document.getElementById("btn-close-creator-modal");
    if (closeCreatorBtn) {
      closeCreatorBtn.addEventListener("click", () => {
        const modal = document.getElementById("creator-code-modal");
        if (modal) modal.style.display = "none";
      });
    }

    const doneCreatorBtn = document.getElementById("btn-done-creator-modal");
    if (doneCreatorBtn) {
      doneCreatorBtn.addEventListener("click", () => {
        const modal = document.getElementById("creator-code-modal");
        if (modal) modal.style.display = "none";
      });
    }

    const creatorModalOverlay = document.getElementById("creator-code-modal");
    if (creatorModalOverlay) {
      creatorModalOverlay.addEventListener("click", (e) => {
        if (e.target === creatorModalOverlay) creatorModalOverlay.style.display = "none";
      });
    }

    const modalCopyNexusBtn = document.getElementById("btn-modal-copy-nexus-code");
    if (modalCopyNexusBtn) {
      modalCopyNexusBtn.addEventListener("click", () => {
        navigator.clipboard.writeText("NEXUS").then(() => {
          WebAudioFX.playSuccess();
          this.showToast("💎 Creator Code NEXUS copied! Remember to enter it in Clash Royale shop.");
          this.ceoMetrics.creatorCodeUses = (this.ceoMetrics.creatorCodeUses || 0) + 1;
          this.updateCeoStatsUI();
        }).catch(() => {
          this.showToast("Creator Code: NEXUS");
        });
      });
    }

    const modalLaunchCreatorLink = document.getElementById("btn-modal-launch-creator-link");
    if (modalLaunchCreatorLink) {
      modalLaunchCreatorLink.addEventListener("click", () => {
        WebAudioFX.playSuccess();
        this.showToast("⚔️ Launching Clash Royale Creator Boost...");
        this.ceoMetrics.creatorCodeUses = (this.ceoMetrics.creatorCodeUses || 0) + 1;
        this.updateCeoStatsUI();
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
          setTimeout(() => {
            window.location.href = "clashroyale://action=SupportCreator&id=NEXUS";
          }, 300);
        }
      });
    }

    // 3. Brand click
    const brandBtn = document.getElementById("btn-brand");
    if (brandBtn) {
      brandBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        if (this.activePlayer) {
          this.showView("account");
          this.updateNavButtons("account");
        } else {
          this.showView("gateway");
          this.updateNavButtons("");
        }
      });
    }

    // 4. Navigation tabs (Top Nav & Mobile Bottom Dock)
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        WebAudioFX.playClick();
        if (navigator.vibrate) {
          try { navigator.vibrate(10); } catch(e) {}
        }
        const tab = btn.getAttribute("data-tab");
        if (tab === "account" && !this.activePlayer) {
          this.updateNavButtons("");
          this.showView("gateway");
          this.showToast("👑 Please connect your player tag to view your profile!");
          return;
        }
        this.updateNavButtons(tab);
        this.showView(tab);
      });
    });

    // 4.5. VIP 1-Click Instant Login (Muk #Y0JJY80)
    const vipLoginBtn = document.getElementById("btn-quick-login-muk");
    if (vipLoginBtn) {
      vipLoginBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        const tagInput = document.getElementById("input-tag");
        if (tagInput) tagInput.value = "Y0JJY80";
        this.fetchPlayerData("Y0JJY80");
      });
    }

    // 5. Player search form
    const searchForm = document.getElementById("search-form");
    const tagInput = document.getElementById("input-tag");
    if (tagInput) {
      tagInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
      });
    }
    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        WebAudioFX.playClick();
        const raw = tagInput.value.trim().toUpperCase().replace(/^#/, "");
        if (raw) this.fetchPlayerData(raw);
      });
    }

    // 6. Quick test verified pills
    document.querySelectorAll(".tag-pill-btn").forEach(pill => {
      pill.addEventListener("click", () => {
        WebAudioFX.playClick();
        const tag = pill.getAttribute("data-tag");
        if (tagInput) tagInput.value = tag;
        this.fetchPlayerData(tag);
      });
    });

    // 7. Showcase switcher pills (3D Hero Stage)
    document.querySelectorAll(".stage-switch-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".stage-switch-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        WebAudioFX.playHeroAura();

        const key = pill.getAttribute("data-showcase");
        const data = this.showcaseCards[key];
        if (data) {
          const nameEl = document.getElementById("stage-card-name");
          const elixirEl = document.getElementById("stage-card-elixir");
          const rarityEl = document.getElementById("stage-card-rarity");
          const descEl = document.getElementById("stage-card-desc");
          const imgEl = document.getElementById("stage-card-img");

          if (nameEl) nameEl.textContent = data.name;
          if (elixirEl) elixirEl.textContent = data.elixir;
          if (rarityEl) {
            rarityEl.textContent = data.rarity;
            rarityEl.style.color = data.rarityColor;
            rarityEl.style.background = data.rarityBg;
            rarityEl.style.borderColor = data.rarityBorder;
          }
          if (descEl) descEl.textContent = data.desc;
          if (imgEl) imgEl.src = data.img;
        }
      });
    });

    // 8. Switch Account button
    const switchBtn = document.getElementById("btn-switch-account");
    if (switchBtn) {
      switchBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        localStorage.removeItem("linked_player_tag");
        this.activeTag = "";
        this.activePlayer = null;
        this.showView("gateway");
        const chip = document.getElementById("user-status-chip");
        if (chip) chip.style.display = "none";
        const accountNav = document.getElementById("nav-btn-account");
        if (accountNav) accountNav.style.display = "none";
        this.updateNavButtons("");
      });
    }

    // 9. Hero Tier Filter buttons
    const heroFilterContainer = document.getElementById("hero-tier-filters");
    if (heroFilterContainer) {
      heroFilterContainer.querySelectorAll(".filter-btn-hero").forEach(btn => {
        btn.addEventListener("click", () => {
          WebAudioFX.playClick();
          heroFilterContainer.querySelectorAll(".filter-btn-hero").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const tier = btn.getAttribute("data-tier");
          this.currentHeroFilter = tier;
          this.renderHeroesCatalog(tier);
        });
      });
    }

    // 10. Studio Deck Controls
    const clearDeckBtn = document.getElementById("btn-clear-active-deck");
    if (clearDeckBtn) {
      clearDeckBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        this.studioDeck = [];
        this.renderStudioDeck();
        this.renderStudioCatalog();
      });
    }

    const exportLinkBtn = document.getElementById("btn-export-link");
    if (exportLinkBtn) {
      exportLinkBtn.addEventListener("click", () => {
        if (!this.studioDeck || this.studioDeck.length === 0) {
          this.showToast("Add cards to your deck first!");
          return;
        }
        this.handleCopyDeck(this.studioDeck, "Tactical Studio Deck");
      });
    }

    const copyActiveDeckBtn = document.getElementById("btn-copy-active-deck");
    if (copyActiveDeckBtn) {
      copyActiveDeckBtn.addEventListener("click", () => {
        const pName = this.activePlayer ? this.activePlayer.name : "Muk";
        const deckToCopy = (this.activePlayer && this.activePlayer.currentDeck && this.activePlayer.currentDeck.length > 0)
          ? this.activePlayer.currentDeck
          : this.studioDeck;
        this.handleCopyDeck(deckToCopy, `${pName}'s Active Deck`);
      });
    }

    const editDeckBtn = document.getElementById("btn-edit-deck");
    if (editDeckBtn) {
      editDeckBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        this.showView("studio");
        this.updateNavButtons("studio");
      });
    }

    // 11. Studio Catalog Filters
    const studioFilters = document.getElementById("studio-catalog-filters");
    if (studioFilters) {
      studioFilters.querySelectorAll(".filter-btn-hero").forEach(btn => {
        btn.addEventListener("click", () => {
          WebAudioFX.playClick();
          studioFilters.querySelectorAll(".filter-btn-hero").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          this.catalogCategory = btn.getAttribute("data-filter");
          this.renderStudioCatalog();
        });
      });
    }

    const studioSearch = document.getElementById("studio-search-input");
    if (studioSearch) {
      studioSearch.addEventListener("input", (e) => {
        this.searchFilter = e.target.value.toLowerCase().trim();
        this.renderStudioCatalog();
      });
    }

    // 11.5 In-Game Deck Slot Ribbon Selector (Screenshot 3)
    const slotTabs = document.querySelectorAll(".cr-deck-slot-tab");
    slotTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        WebAudioFX.playClick();
        slotTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        const slotNum = tab.getAttribute("data-deck-slot") || "8";
        const battleBtn = document.getElementById("btn-studio-quick-battle");
        if (battleBtn) battleBtn.textContent = `⚔️ BATTLE WITH DECK ${slotNum}`;
        this.showToast(`🃏 Switched to Deck Slot ${slotNum}`);
      });
    });

    const studioBattleBtn = document.getElementById("btn-studio-quick-battle");
    if (studioBattleBtn) {
      studioBattleBtn.addEventListener("click", () => {
        WebAudioFX.playSuccess();
        this.showView("account");
        this.updateNavButtons("account");
        this.showToast("⚔️ Active Deck Ready for Battle!");
      });
    }

    // 12. Head-to-Head Simulator
    const simBtn = document.getElementById("btn-run-sim");
    if (simBtn) {
      simBtn.addEventListener("click", () => {
        this.runSimulation();
      });
    }

    // 12.5 Deck AI Battle Log Navigation & Filters
    const gotoBattlesBtn = document.getElementById("btn-goto-full-battles");
    if (gotoBattlesBtn) {
      gotoBattlesBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        this.showView("battles");
        this.updateNavButtons("battles");
      });
    }

    const battleFilterContainer = document.getElementById("battle-filters");
    if (battleFilterContainer) {
      battleFilterContainer.querySelectorAll(".filter-btn-hero").forEach(btn => {
        btn.addEventListener("click", () => {
          WebAudioFX.playClick();
          battleFilterContainer.querySelectorAll(".filter-btn-hero").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          this.renderBattleStream(btn.getAttribute("data-battle-filter"));
        });
      });
    }

    // In-Game Battle Log Modal Sheet Controls
    const closeBattlesBtn = document.getElementById("btn-close-battles-view");
    if (closeBattlesBtn) {
      closeBattlesBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        if (this.activePlayer) {
          this.showView("account");
          this.updateNavButtons("account");
        } else {
          this.showView("gateway");
          this.updateNavButtons("battles");
        }
      });
    }

    // Toggle Deck AI Telemetry Drawer
    const toggleDeckAiBtn = document.getElementById("btn-toggle-deckai-telemetry");
    const deckAiDrawer = document.getElementById("deckai-telemetry-drawer");
    if (toggleDeckAiBtn && deckAiDrawer) {
      toggleDeckAiBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        const isHidden = deckAiDrawer.style.display === "none";
        deckAiDrawer.style.display = isHidden ? "block" : "none";
        toggleDeckAiBtn.style.background = isHidden ? "rgba(56, 189, 248, 0.25)" : "rgba(15,23,42,0.9)";
      });
    }

    // Battle Log Stone Tabs: Battles | Tournaments
    const stoneTabsContainer = document.getElementById("battle-log-stone-tabs");
    const tournamentsEmptyView = document.getElementById("tournaments-empty-view");
    const battlesStreamContainer = document.getElementById("battles-stream-container");
    if (stoneTabsContainer) {
      stoneTabsContainer.querySelectorAll(".cr-stone-tab").forEach(tab => {
        tab.addEventListener("click", () => {
          WebAudioFX.playClick();
          stoneTabsContainer.querySelectorAll(".cr-stone-tab").forEach(t => t.classList.remove("active"));
          tab.classList.add("active");
          const subtab = tab.getAttribute("data-subtab");
          if (subtab === "tournaments") {
            if (tournamentsEmptyView) tournamentsEmptyView.style.display = "block";
            if (battlesStreamContainer) battlesStreamContainer.style.display = "none";
          } else {
            if (tournamentsEmptyView) tournamentsEmptyView.style.display = "none";
            if (battlesStreamContainer) battlesStreamContainer.style.display = "block";
          }
        });
      });
    }
  },

  updateNavButtons: function(activeTab) {
    document.querySelectorAll(".nav-btn").forEach(b => {
      const isActive = (b.getAttribute("data-tab") === activeTab);
      b.classList.toggle("active", isActive);
      // Only scroll into view if it's in the top nav scrollable bar, not the fixed bottom dock
      if (isActive && !b.classList.contains("dock-btn")) {
        b.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    });
  },

  initPwa: function() {
    // 1. Register Service Worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").then((reg) => {
          console.log("Nexus Royale PWA Service Worker registered:", reg.scope);
        }).catch((err) => {
          console.log("Service Worker note:", err);
        });
      });
    }

    // 2. Client Environment & Platform Detection
    let deferredPrompt = null;
    const ua = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(ua);
    const isChromeIos = isIos && /crios/.test(ua);
    const isSafariIos = isIos && !isChromeIos;
    const isAndroid = /android/.test(ua);
    const isDesktop = !isIos && !isAndroid;

    const detectPlatform = () => {
      if (isSafariIos) return "ios-safari";
      if (isChromeIos) return "chrome-ios";
      if (isAndroid) return "chrome-android";
      return "desktop";
    };

    const isStandalone = () => {
      return (window.matchMedia("(display-mode: standalone)").matches) || (window.navigator.standalone === true);
    };

    const installBtn = document.getElementById("btn-install-pwa");
    if (installBtn) {
      if (isStandalone()) {
        installBtn.classList.add("installed");
        installBtn.innerHTML = `<span class="install-icon">✓</span> <span class="install-txt">INSTALLED</span>`;
        installBtn.title = "Nexus Royale is installed in standalone app mode";
      } else {
        installBtn.style.display = "inline-flex";
      }
    }

    // Capture Chromium / Android BeforeInstallPrompt
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (installBtn && !isStandalone()) {
        installBtn.style.display = "inline-flex";
      }
    });

    // Content templates for each platform
    const getPlatformInstructions = (platform) => {
      if (platform === "ios-safari") {
        return `
          <div class="pwa-guide-header cyan">
            <span>🍏 Safari on iPhone / iPad (2-Step Setup)</span>
            <span class="pwa-inline-chip">Official iOS PWA</span>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">1</div>
            <div class="pwa-step-text">
              Tap the <strong>Share button</strong> <span class="pwa-inline-chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Share</span> in the bottom toolbar of Safari.
            </div>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">2</div>
            <div class="pwa-step-text">
              Scroll down the menu and tap <strong>"Add to Home Screen"</strong> <span class="pwa-inline-chip gold"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> Add</span>.
            </div>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">3</div>
            <div class="pwa-step-text">
              Tap <strong>"Add"</strong> in the top-right corner. Nexus Royale will appear on your Home Screen with zero browser bars and high-speed offline caching!
            </div>
          </div>
        `;
      } else if (platform === "chrome-android") {
        const hasPrompt = !!deferredPrompt;
        return `
          <div class="pwa-guide-header gold">
            <span>🤖 Android & Chrome 1-Tap Install</span>
            <span class="pwa-inline-chip gold">Native Web App</span>
          </div>
          <button type="button" class="pwa-btn-install-direct" id="btn-trigger-native-install">
            📲 ${hasPrompt ? "Tap to Install Nexus Royale Now" : "Launch Chrome App Install"}
          </button>
          <div class="pwa-step-card">
            <div class="pwa-step-num">1</div>
            <div class="pwa-step-text">
              Tap the <strong>Install button</strong> above to trigger the 1-tap browser prompt.
            </div>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">2</div>
            <div class="pwa-step-text">
              If the prompt doesn't appear, tap Chrome's menu <span class="pwa-inline-chip">⋮ Three Dots</span> in the top-right corner.
            </div>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">3</div>
            <div class="pwa-step-text">
              Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong> and tap Confirm.
            </div>
          </div>
        `;
      } else if (platform === "chrome-ios") {
        return `
          <div class="pwa-guide-header cyan">
            <span>🍎 Google Chrome on iPhone / iPad</span>
            <span class="pwa-inline-chip">iOS Chrome</span>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">1</div>
            <div class="pwa-step-text">
              In Chrome for iOS, tap the <strong>Share icon</strong> <span class="pwa-inline-chip"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg> Share</span> next to the URL bar, or tap the <span class="pwa-inline-chip">⋯ More</span> menu in the bottom-right corner.
            </div>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">2</div>
            <div class="pwa-step-text">
              Scroll down and tap <strong>"Add to Home Screen"</strong> <span class="pwa-inline-chip gold">⊞</span>.
            </div>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">3</div>
            <div class="pwa-step-text">
              Tap <strong>"Add"</strong> in the top-right corner to place Nexus Royale right next to your Clash Royale app!
            </div>
          </div>
        `;
      } else {
        // Desktop
        return `
          <div class="pwa-guide-header cyan">
            <span>💻 Desktop (Chrome, Edge & Brave on Mac/PC)</span>
            <span class="pwa-inline-chip">Desktop App</span>
          </div>
          ${deferredPrompt ? `
            <button type="button" class="pwa-btn-install-direct" id="btn-trigger-native-install">
              🖥️ Install Nexus Royale Desktop Window
            </button>
          ` : ''}
          <div class="pwa-step-card">
            <div class="pwa-step-num">1</div>
            <div class="pwa-step-text">
              Look at the <strong>right side of your browser's address bar</strong> at the top of your screen.
            </div>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">2</div>
            <div class="pwa-step-text">
              Click the <strong>Install icon</strong> <span class="pwa-inline-chip">🖥️⬇️ Install</span>, OR open browser menu <span class="pwa-inline-chip">⋮</span> → <strong>"Save and share"</strong> → <strong>"Install Nexus Royale..."</strong>.
            </div>
          </div>
          <div class="pwa-step-card">
            <div class="pwa-step-num">3</div>
            <div class="pwa-step-text">
              Click <strong>"Install"</strong> to launch Nexus Royale in its own native, borderless desktop window with instant multi-tasking shortcuts.
            </div>
          </div>
        `;
      }
    };

    let currentPwaTab = detectPlatform();

    const switchPwaTab = (platform) => {
      currentPwaTab = platform;
      const box = document.getElementById("pwa-instructions-box");
      if (box) {
        box.innerHTML = getPlatformInstructions(platform);
      }

      // Update tab active classes
      document.querySelectorAll(".pwa-tab-btn").forEach(btn => {
        if (btn.getAttribute("data-pwa-tab") === platform) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      // Hook direct install button if rendered
      setTimeout(() => {
        const directBtn = document.getElementById("btn-trigger-native-install");
        if (directBtn) {
          directBtn.addEventListener("click", async () => {
            if (deferredPrompt) {
              try {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === "accepted") {
                  this.showToast("🎉 Nexus Royale installed to your Home Screen!");
                  WebAudioFX.playSuccess();
                  const modal = document.getElementById("pwa-install-modal");
                  if (modal) modal.style.display = "none";
                }
                deferredPrompt = null;
              } catch (err) {
                console.warn("Install prompt error:", err);
              }
            } else {
              this.showToast("Tap browser menu (⋮) and select 'Install app' or 'Add to Home screen'");
            }
          });
        }
      }, 50);
    };

    // Open PWA modal
    const openPwaModal = (targetPlatform) => {
      const modal = document.getElementById("pwa-install-modal");
      if (!modal) return;

      const userPlatform = detectPlatform();
      const activePlatform = targetPlatform || userPlatform;

      // Show detected tag on user's device tab
      const detectedTag = document.getElementById(`tag-detected-${userPlatform}`);
      if (detectedTag) detectedTag.style.display = "inline-block";

      switchPwaTab(activePlatform);
      modal.style.display = "flex";
      WebAudioFX.playSuccess();

      // Show animated bottom pointer if on iPhone Safari
      if (isSafariIos && window.innerWidth <= 768) {
        const pointer = document.getElementById("ios-safari-pointer");
        if (pointer) pointer.style.display = "block";
      }
    };

    // 3. Smart Install Button Click Handler
    const handleInstallClick = async () => {
      if (isStandalone()) {
        this.showToast("⚡ Nexus Royale is already installed and running in fullscreen app mode!");
        WebAudioFX.playClick();
        return;
      }

      // If browser has native 1-tap install ready, trigger it immediately!
      if (deferredPrompt) {
        try {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === "accepted") {
            this.showToast("🎉 Nexus Royale added to your Home Screen!");
            WebAudioFX.playSuccess();
            deferredPrompt = null;
            return;
          }
          deferredPrompt = null;
        } catch (err) {
          console.warn("Deferred prompt error:", err);
        }
      }

      // Otherwise (or if declined / on iOS), open the interactive guide
      openPwaModal();
    };

    if (installBtn) {
      installBtn.addEventListener("click", handleInstallClick);
    }

    // Connect footer install button
    const footerInstallBtn = document.getElementById("footer-btn-install");
    if (footerInstallBtn) {
      footerInstallBtn.addEventListener("click", () => openPwaModal());
    }

    // Connect Tab click events
    document.querySelectorAll(".pwa-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-pwa-tab");
        if (tab) switchPwaTab(tab);
      });
    });

    // Close handlers
    const closeBtn = document.getElementById("btn-close-pwa-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        const modal = document.getElementById("pwa-install-modal");
        if (modal) modal.style.display = "none";
      });
    }

    const doneBtn = document.getElementById("btn-pwa-modal-done");
    if (doneBtn) {
      doneBtn.addEventListener("click", () => {
        const modal = document.getElementById("pwa-install-modal");
        if (modal) modal.style.display = "none";
      });
    }

    const modalOverlay = document.getElementById("pwa-install-modal");
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) modalOverlay.style.display = "none";
      });
    }

    // Close iOS bottom pointer
    const closePointerBtn = document.getElementById("btn-close-ios-pointer");
    if (closePointerBtn) {
      closePointerBtn.addEventListener("click", () => {
        const pointer = document.getElementById("ios-safari-pointer");
        if (pointer) pointer.style.display = "none";
      });
    }
  },

  showView: function(viewId) {
    const views = ["gateway", "account", "battles", "heroes", "radar", "recall", "studio", "simulator", "meta", "videos"];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.style.display = (v === viewId) ? "block" : "none";
    });
    if (viewId === "battles") {
      this.renderBattleStream("all");
    }
    if (viewId === "videos") {
      this.renderVideos("all");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  showToast: function(msg, actionHtml = null, duration = 3500) {
    const toast = document.getElementById("toast-bar");
    if (!toast) return;
    toast.innerHTML = "";
    const msgSpan = document.createElement("span");
    msgSpan.innerHTML = msg;
    toast.appendChild(msgSpan);

    if (actionHtml) {
      const actionWrap = document.createElement("span");
      actionWrap.style.display = "inline-flex";
      actionWrap.style.alignItems = "center";
      actionWrap.style.marginLeft = "auto";
      actionWrap.innerHTML = actionHtml;
      toast.appendChild(actionWrap);
    }

    toast.classList.add("show");
    if (this._toastTimeout) clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  },

  // High-converting Creator Code conversion toast with instant 1-tap copy
  showCreatorCodeToast: function(headline = "📋 In-game deck link copied!") {
    const actionBtn = `<button type="button" id="toast-copy-nexus-btn" class="btn-copy-code" style="padding:0.3rem 0.65rem; font-size:0.75rem; font-weight:800; background:#facc15; color:#080a10; border:none; border-radius:4px; cursor:pointer; vertical-align:middle; box-shadow:0 0 10px rgba(250,204,21,0.5); display:inline-flex; align-items:center; gap:0.25rem;"><span>COPY</span><strong>NEXUS</strong></button>`;
    this.showToast(`${headline} <span style="color:#facc15; font-weight:700; font-size:0.8rem; margin-left:0.25rem;">💎 Code NEXUS</span>`, actionBtn, 5500);
    setTimeout(() => {
      const btn = document.getElementById("toast-copy-nexus-btn");
      if (btn) {
        btn.onclick = (e) => {
          e.stopPropagation();
          WebAudioFX.playSuccess();
          this.copyToClipboard("NEXUS").then(() => {
            btn.innerHTML = "<span>✅ COPIED</span>";
            setTimeout(() => {
              btn.innerHTML = "<span>COPY</span><strong>NEXUS</strong>";
            }, 2000);
          });
        };
      }
    }, 50);
  },

  // Robust Clipboard Copy with Executive Fallback
  copyToClipboard: function(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(() => {
        return this.fallbackCopy(text);
      });
    }
    return this.fallbackCopy(text);
  },

  fallbackCopy: function(text) {
    return new Promise((resolve) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      textArea.style.opacity = "0";
      textArea.setAttribute("readonly", "");
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      if (textArea.setSelectionRange) {
        textArea.setSelectionRange(0, 999999);
      }
      try {
        document.execCommand("copy");
      } catch (err) {
        console.warn("Fallback copy error:", err);
      }
      document.body.removeChild(textArea);
      resolve();
    });
  },

  // Interactive In-Game Deck Copy Modal & Launcher
  showDeckCopyModal: function(links, deckName = "Deck") {
    const modal = document.getElementById("deck-copy-modal");
    if (!modal) {
      window.open(links.webLink, "_blank");
      return;
    }

    const titleEl = document.getElementById("deck-modal-title");
    const subEl = document.getElementById("deck-modal-subtitle");
    const gridEl = document.getElementById("deck-modal-cards-grid");
    const openBtn = document.getElementById("deck-modal-open-btn");
    const copyBtn = document.getElementById("deck-modal-copy-btn");
    const urlInput = document.getElementById("deck-modal-url-input");

    if (titleEl) titleEl.textContent = deckName.toUpperCase();
    if (subEl) subEl.textContent = `Official Clash Royale Link (${links.count}/8 Cards)`;

    if (gridEl) {
      gridEl.innerHTML = "";
      (links.cards || []).forEach(c => {
        const item = document.createElement("div");
        item.className = "deck-modal-card-item";
        item.innerHTML = `
          <img src="${c.icon || (c.iconUrls && c.iconUrls.medium) || 'https://api-assets.clashroyale.com/cards/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png'}" alt="${c.name}">
          <span class="mini-caption">${c.name}</span>
        `;
        gridEl.appendChild(item);
      });
    }

    const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase());

    if (openBtn) {
      openBtn.href = isMobile ? links.deepLink : links.webLink;
      if (isMobile) {
        openBtn.removeAttribute("target");
      } else {
        openBtn.setAttribute("target", "_blank");
      }
      openBtn.onclick = (e) => {
        WebAudioFX.playClick();
        this.copyToClipboard(links.webLink);
        this.showCreatorCodeToast("⚔️ Launching Clash Royale!");
        if (isMobile) {
          window.location.href = links.deepLink;
          setTimeout(() => {
            window.location.href = links.webLink;
          }, 1200);
          e.preventDefault();
        }
      };
    }

    if (urlInput) {
      urlInput.value = links.webLink;
    }

    const qrImg = document.getElementById("deck-modal-qr-img");
    if (qrImg && links.webLink) {
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(links.webLink)}`;
    }

    const creatorCopyBtn = document.getElementById("deck-modal-copy-creator-btn");
    if (creatorCopyBtn) {
      creatorCopyBtn.onclick = () => {
        WebAudioFX.playSuccess();
        this.copyToClipboard("NEXUS").then(() => {
          creatorCopyBtn.innerHTML = "<span>✅ COPIED</span><strong>NEXUS</strong>";
          setTimeout(() => {
            creatorCopyBtn.innerHTML = "<span>COPY</span><strong>NEXUS</strong>";
          }, 2500);
          this.showToast("💎 Creator Code NEXUS copied! Remember to enter it in Clash Royale shop.");
        });
      };
    }

    const quickCopyBtn = document.getElementById("deck-modal-quick-copy-btn");
    if (quickCopyBtn) {
      quickCopyBtn.onclick = () => {
        WebAudioFX.playSuccess();
        this.copyToClipboard(links.webLink).then(() => {
          quickCopyBtn.textContent = "COPIED!";
          setTimeout(() => { quickCopyBtn.textContent = "COPY"; }, 2000);
          this.showCreatorCodeToast("📋 In-game deck link copied!");
        });
      };
    }

    if (copyBtn) {
      copyBtn.innerHTML = "📋 Copy Shareable Link to Clipboard";
      copyBtn.onclick = () => {
        WebAudioFX.playSuccess();
        this.copyToClipboard(links.webLink).then(() => {
          copyBtn.innerHTML = "✅ Copied to Clipboard!";
          this.showCreatorCodeToast("📋 In-game deck link copied!");
          setTimeout(() => {
            copyBtn.innerHTML = "📋 Copy Shareable Link to Clipboard";
          }, 2500);
        });
      };
    }

    const closeBtn = document.getElementById("btn-close-deck-modal");
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = "none"; };

    const doneBtn = document.getElementById("btn-done-deck-modal");
    if (doneBtn) doneBtn.onclick = () => { modal.style.display = "none"; };

    modal.onclick = (e) => {
      if (e.target === modal) modal.style.display = "none";
    };

    modal.style.display = "flex";
    WebAudioFX.playSuccess();
  },

  handleCopyDeck: function(cards, deckName = "Deck") {
    WebAudioFX.playClick();
    if (navigator.vibrate) {
      try { navigator.vibrate([15, 30, 15]); } catch(e) {}
    }

    const links = SimulatorEngine.generateCopyLinks(cards);
    if (!links || !links.ids || links.count === 0) {
      this.showToast("⚠️ Could not generate deck link - check card list.");
      return;
    }

    // Automatically copy to clipboard immediately with high-converting Creator Code toast
    this.copyToClipboard(links.webLink).then(() => {
      this.showCreatorCodeToast("📋 In-game deck link copied!");
    });

    const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase());
    if (isMobile) {
      // Trigger instant app launch prompt on mobile
      try {
        window.location.href = links.deepLink;
      } catch (err) {
        console.warn("Mobile deep link trigger:", err);
      }
    }

    // Show interactive export sheet with direct app launcher
    this.showDeckCopyModal(links, deckName);
  },

  // --- 3. 3D CARD STAGE MOUSE & TOUCH TILT PHYSICS ---
  setupCardPhysics: function() {
    const container = document.querySelector(".card-stage-container");
    const card = document.getElementById("interactive-hero-card");
    if (!container || !card) return;

    let bounds;
    function refreshBounds() {
      bounds = container.getBoundingClientRect();
    }
    window.addEventListener("resize", refreshBounds);
    refreshBounds();

    container.addEventListener("mouseenter", () => {
      refreshBounds();
      card.style.transition = "transform 0.1s ease-out";
    });

    container.addEventListener("mousemove", (e) => {
      if (!bounds) refreshBounds();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const xPct = (mouseX / bounds.width) - 0.5;
      const yPct = (mouseY / bounds.height) - 0.5;

      const rotX = -yPct * 24; // tilt up/down
      const rotY = xPct * 24;  // tilt left/right

      card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    container.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });

    // Touch support for mobile devices
    container.addEventListener("touchmove", (e) => {
      if (!bounds) refreshBounds();
      const touch = e.touches[0];
      if (!touch) return;
      const mouseX = touch.clientX - bounds.left;
      const mouseY = touch.clientY - bounds.top;

      const xPct = (mouseX / bounds.width) - 0.5;
      const yPct = (mouseY / bounds.height) - 0.5;

      const rotX = -yPct * 20;
      const rotY = xPct * 20;

      card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    }, { passive: true });

    container.addEventListener("touchend", () => {
      card.style.transition = "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)";
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  },

  // --- 4. FLOATING ELIXIR & SPARK BACKGROUND CANVAS ---
  setupAmbientCanvas: function() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    // Particle swarm
    const particles = [];
    const count = 38;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.5 + 1.2,
        speedY: -(Math.random() * 0.45 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.2,
        color: Math.random() > 0.4 ? "rgba(38, 236, 232, " : "rgba(216, 184, 120, " // Prismatic Cyan or Champagne Gold
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color + "0.6)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  },

  // --- 5. CEO TELEMETRY & MONETIZATION CLOCK ---
  startCeoTelemetryClock: function() {
    setInterval(() => {
      // Gentle real-time traffic pulse (+1 to +3 visitors)
      this.ceoMetrics.monthlyTraffic += Math.floor(Math.random() * 3) + 1;
      this.updateCeoStatsUI();
    }, 4500);
  },

  updateCeoStatsUI: function() {
    const trafficCard = document.querySelector("#view-aiops .kpi-card:nth-child(1) .kpi-value");
    const revCard = document.querySelector("#view-aiops .kpi-card:nth-child(2) .kpi-value");
    const codeCard = document.querySelector("#view-aiops .kpi-card:nth-child(3) .kpi-value");

    if (trafficCard) trafficCard.textContent = this.ceoMetrics.monthlyTraffic.toLocaleString();
    if (revCard) {
      const rev = (this.ceoMetrics.monthlyTraffic * (this.ceoMetrics.cpm / 1000)).toFixed(2);
      revCard.textContent = `$${rev}`;
    }
    if (codeCard) codeCard.textContent = this.ceoMetrics.creatorCodeUses.toLocaleString();
  },

  // --- 6. SUPERCELL API FETCH & ROBUST DATA INGESTION ---
  fetchPlayerData: async function(tag) {
    const rawTag = (tag || "Y0JJY80").replace(/^#/, "").trim().toUpperCase();
    const cleanTag = encodeURIComponent(`#${rawTag}`);
    const encodedSupercellTag = `%23${rawTag}`;
    const errorBox = document.getElementById("search-error");
    const syncBtn = document.getElementById("btn-sync");
    const syncText = document.getElementById("btn-sync-text");
    const vipBtn = document.getElementById("btn-quick-login-muk");

    if (errorBox) errorBox.innerHTML = "";
    if (syncBtn) syncBtn.disabled = true;
    if (syncText) syncText.textContent = "Connecting Live...";
    if (vipBtn) {
      vipBtn.classList.add("loading");
      vipBtn.innerHTML = `<span>⚡ Connecting Muk Telemetry...</span>`;
    }

    try {
      let profileData = null;
      let battlesData = null;

      // Tier 1: Try local python server if developing locally on localhost:3000
      if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);
          const pRes = await fetch(`/api/clashroyale/players/${cleanTag}?_t=${Date.now()}`, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (pRes.ok) {
            profileData = await pRes.json();
            const bRes = await fetch(`/api/clashroyale/players/${cleanTag}/battlelog?_t=${Date.now()}`);
            if (bRes.ok) battlesData = await bRes.json();
          }
        } catch (e) {
          console.warn("Local server proxy unreachable, trying direct RoyaleAPI proxy:", e);
        }
      }

      // Tier 2: Direct RoyaleAPI Gateway (Works 100% on live nexusroyale.online / GitHub Pages with CORS)
      if (!profileData) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);
        try {
          const pRes = await fetch(`https://proxy.royaleapi.dev/v1/players/${encodedSupercellTag}?_t=${Date.now()}`, {
            headers: {
              "Authorization": `Bearer ${SUPERCELL_PROXY_TOKEN}`,
              "Accept": "application/json"
            },
            signal: controller.signal
          });
          clearTimeout(timeoutId);
          if (pRes.ok) {
            profileData = await pRes.json();
            const bRes = await fetch(`https://proxy.royaleapi.dev/v1/players/${encodedSupercellTag}/battlelog?_t=${Date.now()}`, {
              headers: {
                "Authorization": `Bearer ${SUPERCELL_PROXY_TOKEN}`,
                "Accept": "application/json"
              }
            });
            if (bRes.ok) battlesData = await bRes.json();
          }
        } catch (e) {
          clearTimeout(timeoutId);
          console.warn("RoyaleAPI proxy fetch error:", e);
        }
      }

      if (profileData) {
        this.activePlayer = profileData;
        this.activeTag = rawTag;
        localStorage.setItem("linked_player_tag", this.activeTag);
        this.activeBattles = (battlesData && battlesData.length > 0) ? battlesData : [];

        const chip = document.getElementById("user-status-chip");
        const chipName = document.getElementById("chip-player-name");
        const accountNav = document.getElementById("nav-btn-account");

        if (chip) chip.style.display = "flex";
        if (chipName) chipName.textContent = this.activePlayer.name || `#${rawTag}`;
        if (accountNav) accountNav.style.display = "inline-block";

        WebAudioFX.playSuccess();
        this.renderPlayerDashboard();
        this.renderBattleStream("all");
        this.showView("account");
        this.updateNavButtons("account");
        this.showToast(`👑 Live Supercell Link Active: ${this.activePlayer.name}!`);
        return;
      }

      // Tier 3: Verified fallback if user is completely offline
      this.loadDemoProfile(rawTag);

    } catch (err) {
      console.warn("Telemetry ingest error:", err);
      this.loadDemoProfile(rawTag);
    } finally {
      if (syncBtn) syncBtn.disabled = false;
      if (syncText) syncText.textContent = "Sync Account";
      if (vipBtn) {
        vipBtn.classList.remove("loading");
        vipBtn.innerHTML = `<span>⚡ 1-Click Instant Login</span>`;
      }
    }
  },

  // Fallback verified profile (Muk #Y0JJY80 authentic data or Mohamed Light #8UQP9G0 or custom tag)
  loadDemoProfile: function(tag) {
    const raw = (tag || "Y0JJY80").replace(/^#/, "").trim().toUpperCase();
    const isMuk = (!tag || raw.includes("Y0JJY80") || raw === "MUK");

    if (isMuk) {
      this.activePlayer = {
        name: "Muk",
        tag: "#Y0JJY80",
        expLevel: 81,
        trophies: 14030,
        bestTrophies: 14060,
        wins: 17057,
        losses: 14798,
        threeCrownWins: 5916,
        clan: { name: "The Darkness", badgeId: 16000000 },
        arena: { name: "Seasonal Arena I" },
        currentFavouriteCard: { name: "Minion Giant" },
        tournamentCardsWon: 18420,
        challengeMaxWins: 12,
        challengeCardsWon: 12000,
        progress: {
          "2v2League_202609": { "trophies": 2216, "bestTrophies": 2303 },
          "seasonal-trophy-road-202609": { "trophies": 14030, "bestTrophies": 14060 }
        },
        currentDeck: [
          { id: 26000045, name: "Executioner", elixirCost: 5, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/9XL5BP2mqzV8kza6KF8rOxrpCZTyuGLp2l413DTjEoM.png", evolutionMedium: "https://api-assets.clashroyale.com/cardevolutions/300/9XL5BP2mqzV8kza6KF8rOxrpCZTyuGLp2l413DTjEoM.png" } },
          { id: 26000103, name: "Boss Bandit", elixirCost: 6, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/nuceG9o7rAyvyc7D3sp2QSiRYtSOEgraq0NJkDf729s.png" } },
          { id: 26000022, name: "Minion Horde", elixirCost: 5, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/Wyjq5l0IXHTkX9Rmpap6HaH08MvjbxFp1xBO9a47YSI.png", evolutionMedium: "https://api-assets.clashroyale.com/cardevolutions/300/Wyjq5l0IXHTkX9Rmpap6HaH08MvjbxFp1xBO9a47YSI.png" } },
          { id: 26000021, name: "Hog Rider", elixirCost: 4, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/Ubu0oUl8tZkusnkZf8Xv9Vno5IO29Y-jbZ4fhoNJ5oc.png" } },
          { id: 26000043, name: "Elite Barbarians", elixirCost: 6, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/C88C5JH_F3lLZj6K-tLcMo5DPjrFmvzIb1R2M6xCfTE.png", evolutionMedium: "https://api-assets.clashroyale.com/cardevolutions/300/C88C5JH_F3lLZj6K-tLcMo5DPjrFmvzIb1R2M6xCfTE.png" } },
          { id: 26000025, name: "Guards", elixirCost: 3, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/1ArKfLJxYo6_NU_S9cAeIrfbXqWH0oULVJXedxBXQlU.png" } },
          { id: 28000005, name: "Freeze", elixirCost: 4, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/I1M20_Zs_p_BS1NaNIVQjuMJkYI_1-ePtwYZahn0JXQ.png" } },
          { id: 28000008, name: "Zap", elixirCost: 2, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/7dxh2-yCBy1x44GrBaL29vjqnEEeJXHEAlsi5g6D1eY.png", evolutionMedium: "https://api-assets.clashroyale.com/cardevolutions/300/7dxh2-yCBy1x44GrBaL29vjqnEEeJXHEAlsi5g6D1eY.png" } }
        ],
        currentDeckSupportCards: [
          { id: 159000000, name: "Tower Princess", elixirCost: 0, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/Nzo5Gjbh7NG6O3Hyu7ev54Pu5zK7vDMR2fbpGdVsS64.png" } }
        ]
      };
      this.activeTag = "Y0JJY80";
    } else {
      const isMo = (raw.includes("8UQP9G0") || raw.includes("MOHAMED"));
      this.activePlayer = {
        name: isMo ? "Mohamed Light" : `Royale Pro #${raw.slice(0, 6)}`,
        tag: `#${raw}`,
        expLevel: isMo ? 15 : 65,
        trophies: isMo ? 9000 : 8500,
        bestTrophies: isMo ? 9000 : 9000,
        wins: isMo ? 14779 : 9200,
        losses: isMo ? 4210 : 3800,
        threeCrownWins: 4834,
        clan: { name: isMo ? "Twisted Minds" : "The Darkness", badgeId: 16000000 },
        arena: { name: "Ultimate Champion" },
        currentFavouriteCard: { name: "Ice Wizard" },
        tournamentCardsWon: 18420,
        challengeMaxWins: 12,
        challengeCardsWon: 12000,
        currentDeck: [
          { id: 26000004, name: "P.E.K.K.A", elixirCost: 7, level: 15, iconUrls: { evolutionMedium: "https://api-assets.clashroyale.com/cardevolutions/300/Pekka.png" } },
          { id: 26000023, name: "Ice Wizard", elixirCost: 3, level: 15, iconUrls: { heroMedium: "https://api-assets.clashroyale.com/cardheroes/300/W3dkw0HTw9n1jB-zbknY2w3wHuyuLxSRIAV5fUT1SEY.png" } },
          { id: 26000000, name: "Knight", elixirCost: 3, level: 15, iconUrls: { heroMedium: "https://api-assets.clashroyale.com/cardheroes/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png" } },
          { id: 28000008, name: "Zap", elixirCost: 2, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/7dxh2232Ncgu03xM5uvZ-jp444U1KEOo_P1k821Wn40.png" } },
          { id: 28000009, name: "Poison", elixirCost: 4, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/98HDkG2189yACULBKGugstbfObOTVXiRpcYsUKmJhfA.png" } },
          { id: 26000084, name: "Electro Spirit", elixirCost: 1, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/WKtwc24479zV5Zymr-kdRcLs4880k9h3O0hZ1I0vB_o.png" } },
          { id: 26000046, name: "Bandit", elixirCost: 3, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/QWD6st8q-Yoa9z9b9f7a5y04Yk2vLqK0jH9A3Xg8G0U.png" } },
          { id: 26000015, name: "Baby Dragon", elixirCost: 4, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/cjC9n4AvEZJ3urkVh-rwBkJ-aRSsydIMqSAV48hAih0.png" } }
        ],
        currentDeckSupportCards: [
          { id: 26000095, name: "Cannoneer", elixirCost: 0, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/cannoneer.png" } }
        ]
      };
      this.activeTag = raw;
    }

    localStorage.setItem("linked_player_tag", this.activeTag);

    const myDeck = this.activePlayer.currentDeck || [];
    
    // Opponent Decks
    const mohamedDeck = [
      { name: "Ice Wizard", id: 26000023, elixirCost: 3, level: 15, isHero: true },
      { name: "P.E.K.K.A", id: 26000004, elixirCost: 7, level: 15, isEvo: true },
      { name: "Knight", id: 26000000, elixirCost: 3, level: 15 },
      { name: "Zap", id: 28000008, elixirCost: 2, level: 15 },
      { name: "Poison", id: 28000009, elixirCost: 4, level: 15 },
      { name: "Electro Spirit", id: 26000084, elixirCost: 1, level: 15 },
      { name: "Bandit", id: 26000046, elixirCost: 3, level: 15 },
      { name: "Baby Dragon", id: 26000015, elixirCost: 4, level: 15 }
    ];

    const ryleyDeck = [
      { name: "Knight", id: 26000000, elixirCost: 3, level: 15, isHero: true },
      { name: "Goblin Barrel", id: 28000004, elixirCost: 3, level: 15, isEvo: true },
      { name: "Valkyrie", id: 26000011, elixirCost: 4, level: 15 },
      { name: "Princess", id: 26000026, elixirCost: 3, level: 15 },
      { name: "The Log", id: 28000011, elixirCost: 2, level: 15 },
      { name: "Rocket", id: 28000003, elixirCost: 6, level: 15 },
      { name: "Ice Spirit", id: 26000030, elixirCost: 1, level: 15 },
      { name: "Goblin Gang", id: 26000041, elixirCost: 3, level: 15 }
    ];

    const surgicalViperDeck = [
      { name: "Lava Hound", id: 26000029, elixirCost: 7, level: 15 },
      { name: "Balloon", id: 26000006, elixirCost: 5, level: 15 },
      { name: "Mega Minion", id: 26000039, elixirCost: 3, level: 15 },
      { name: "Guards", id: 26000025, elixirCost: 3, level: 15 },
      { name: "Tombstone", id: 27000009, elixirCost: 3, level: 15 },
      { name: "Zap", id: 28000008, elixirCost: 2, level: 15 },
      { name: "Fireball", id: 28000000, elixirCost: 4, level: 15 },
      { name: "Arrows", id: 28000001, elixirCost: 3, level: 15 }
    ];

    const ianDeck = [
      { name: "Hog Rider", id: 26000021, elixirCost: 4, level: 15 },
      { name: "Earthquake", id: 28000014, elixirCost: 3, level: 15 },
      { name: "Firecracker", id: 26000064, elixirCost: 3, level: 15, isEvo: true },
      { name: "Ice Spirit", id: 26000030, elixirCost: 1, level: 15 },
      { name: "Cannon", id: 27000000, elixirCost: 3, level: 15 },
      { name: "The Log", id: 28000011, elixirCost: 2, level: 15 },
      { name: "Skeletons", id: 26000010, elixirCost: 1, level: 15 },
      { name: "Knight", id: 26000000, elixirCost: 3, level: 15 }
    ];

    const mortenDeck = [
      { name: "Miner", id: 26000032, elixirCost: 3, level: 15 },
      { name: "Poison", id: 28000009, elixirCost: 4, level: 15 },
      { name: "The Log", id: 28000011, elixirCost: 2, level: 15 },
      { name: "Knight", id: 26000000, elixirCost: 3, level: 15 },
      { name: "Bats", id: 26000049, elixirCost: 2, level: 15 },
      { name: "Musketeer", id: 26000014, elixirCost: 4, level: 15 },
      { name: "Ice Spirit", id: 26000030, elixirCost: 1, level: 15 },
      { name: "Bomb Tower", id: 27000004, elixirCost: 4, level: 15 }
    ];

    const lightKingDeck = [
      { name: "Royal Giant", id: 26000024, elixirCost: 6, level: 15, isEvo: true },
      { name: "Fisherman", id: 26000061, elixirCost: 3, level: 15 },
      { name: "Monk", id: 26000077, elixirCost: 5, level: 15 },
      { name: "Phoenix", id: 26000087, elixirCost: 4, level: 15 },
      { name: "Mother Witch", id: 26000083, elixirCost: 4, level: 15 },
      { name: "The Log", id: 28000011, elixirCost: 2, level: 15 },
      { name: "Fireball", id: 28000000, elixirCost: 4, level: 15 },
      { name: "Electro Spirit", id: 26000084, elixirCost: 1, level: 15 }
    ];

    const oyassuuDeck = [
      { name: "Hog Rider", id: 26000021, elixirCost: 4, level: 15 },
      { name: "Musketeer", id: 26000014, elixirCost: 4, level: 15 },
      { name: "Cannon", id: 27000000, elixirCost: 3, level: 15 },
      { name: "Ice Golem", id: 26000038, elixirCost: 2, level: 15 },
      { name: "Ice Spirit", id: 26000030, elixirCost: 1, level: 15 },
      { name: "Skeletons", id: 26000010, elixirCost: 1, level: 15 },
      { name: "Fireball", id: 28000000, elixirCost: 4, level: 15 },
      { name: "The Log", id: 28000011, elixirCost: 2, level: 15 }
    ];

    const guarrilloDeck = [
      { name: "Firecracker", id: 26000064, elixirCost: 3, level: 16, hasEvolution: true },
      { name: "Knight", id: 26000000, elixirCost: 3, level: 16 },
      { name: "Monk", id: 26000077, elixirCost: 5, level: 16, isChampion: true },
      { name: "Cannon", id: 27000000, elixirCost: 3, level: 16 },
      { name: "Ram Rider", id: 26000051, elixirCost: 5, level: 16 },
      { name: "Earthquake", id: 28000014, elixirCost: 3, level: 16 },
      { name: "Skeletons", id: 26000010, elixirCost: 1, level: 16 },
      { name: "Electro Spirit", id: 26000084, elixirCost: 1, level: 16 }
    ];

    const giluDeck = [
      { name: "Bats", id: 26000049, elixirCost: 2, level: 16, hasEvolution: true },
      { name: "Skeleton Army", id: 26000012, elixirCost: 3, level: 16 },
      { name: "Goblin Gang", id: 26000041, elixirCost: 3, level: 16 },
      { name: "Ice Spirit", id: 26000030, elixirCost: 1, level: 16 },
      { name: "Mirror", id: 28000006, elixirCost: 1, level: 16 },
      { name: "Electro Wizard", id: 26000042, elixirCost: 4, level: 16 },
      { name: "The Log", id: 28000011, elixirCost: 2, level: 16 },
      { name: "Mega Knight", id: 26000055, elixirCost: 7, level: 16 }
    ];

    const mikeDeck = [
      { name: "Hog Rider", id: 26000021, elixirCost: 4, level: 16 },
      { name: "Valkyrie", id: 26000011, elixirCost: 4, level: 16 },
      { name: "Musketeer", id: 26000014, elixirCost: 4, level: 16 },
      { name: "Skeletons", id: 26000010, elixirCost: 1, level: 16 },
      { name: "Cannon", id: 27000000, elixirCost: 3, level: 16 },
      { name: "Ice Spirit", id: 26000030, elixirCost: 1, level: 16 },
      { name: "Fireball", id: 28000000, elixirCost: 4, level: 16 },
      { name: "The Log", id: 28000011, elixirCost: 2, level: 16 }
    ];

    this.activeBattles = [
      {
        id: "battle_guarrillo",
        type: "Ranked 1v1 League 4",
        timeAgo: "36min ago",
        odds: { userWinProb: 48, oppWinProb: 52, label: "Tight Interaction" },
        outcomeAnalysis: {
          interaction: "Guarrillo's Monk deflection timing absorbed Fireball support while Ram Rider broke through the opposite lane.",
          elixirAdvantage: "Cannon + Earthquake defense held a +1.2 elixir cycle advantage against heavy Lava Hound pushes.",
          coachTip: "Bait Monk's Pensive Protection ability with Boss Bandit before committing spells."
        },
        team: [{ name: this.activePlayer.name, tag: this.activePlayer.tag, clan: { name: "The Darkness" }, crowns: 1, cards: myDeck }],
        opponent: [{ name: "[♧]", tag: "#P9928QV", clan: { name: "guarrillo" }, crowns: 2, cards: guarrilloDeck }]
      },
      {
        id: "battle_gilu",
        type: "Ranked 1v1 League 4",
        timeAgo: "4h 9min ago",
        odds: { userWinProb: 46, oppWinProb: 54, label: "Heavy Swarm Matchup" },
        outcomeAnalysis: {
          interaction: "Gilu's Mega Knight counter-push combined with Mirrored Bats overwhelmed air defense during single elixir.",
          elixirAdvantage: "Baiting Zap with Skeleton Army allowed Bats to deal massive undefended tower damage.",
          coachTip: "Save Fireball for Bats and Goblin Gang clusters; use Tombstone to pull Mega Knight into king tower range."
        },
        team: [{ name: this.activePlayer.name, tag: this.activePlayer.tag, clan: { name: "The Darkness" }, crowns: 1, cards: myDeck }],
        opponent: [{ name: "Gilu", tag: "#8J92LL0", clan: { name: "No Clan" }, crowns: 2, cards: giluDeck }]
      },
      {
        id: "battle_mike",
        type: "Ranked 1v1 League 4",
        timeAgo: "8h ago",
        odds: { userWinProb: 65, oppWinProb: 35, label: "Dominant Defense" },
        outcomeAnalysis: {
          interaction: "Lava Hound + Minion Horde push overwhelmed Mike's solo Musketeer defense before 2.6 Hog could reset cycle.",
          elixirAdvantage: "Controlled trades throughout double elixir (+2.4 advantage).",
          coachTip: "Flawless air beatdown execution. Opponent lacked secondary air splash."
        },
        team: [{ name: this.activePlayer.name, tag: this.activePlayer.tag, clan: { name: "The Darkness" }, crowns: 1, cards: myDeck }],
        opponent: [{ name: "Mike", tag: "#29UJQLP", clan: { name: "ASTRORAPTORS" }, crowns: 0, cards: mikeDeck }]
      },
      {
        id: "battle_5",
        type: "Grand Challenge 12-Win",
        timeAgo: "8h ago",
        odds: { userWinProb: 61, oppWinProb: 39, label: "Favorable Control" },
        outcomeAnalysis: {
          interaction: "Knight and Ice Golem caught every Miner placement, keeping chip damage under 400 total HP across the entire match.",
          elixirAdvantage: "Controlled tempo throughout single and double elixir.",
          coachTip: "Top-tier defensive positioning on Miner prediction."
        },
        team: [{ name: this.activePlayer.name, tag: this.activePlayer.tag, clan: { name: "The Darkness" }, crowns: 2, cards: myDeck }],
        opponent: [{ name: "Morten", tag: "#8GJL90", clan: { name: "SK Gaming" }, crowns: 0, cards: mortenDeck }]
      },
      {
        id: "battle_6",
        type: "Ranked 1v1 Ultimate Champion",
        timeAgo: "1d ago",
        odds: { userWinProb: 55, oppWinProb: 45, label: "Even Matchup" },
        outcomeAnalysis: {
          interaction: "Minion Horde cleanly melted Royal Giant before Monk's Pensive Protection could be activated.",
          elixirAdvantage: "Forced negative trades on Fisherman pulls.",
          coachTip: "Great timing on air swarms against ground beatdown."
        },
        team: [{ name: this.activePlayer.name, tag: this.activePlayer.tag, clan: { name: "The Darkness" }, crowns: 1, cards: myDeck }],
        opponent: [{ name: "LightKing", tag: "#4902LKP", clan: { name: "Tribe Gaming" }, crowns: 0, cards: lightKingDeck }]
      },
      {
        id: "battle_7",
        type: "Ranked Path of Legends",
        timeAgo: "1d ago",
        odds: { userWinProb: 48, oppWinProb: 52, label: "Tight Cycle Match" },
        outcomeAnalysis: {
          interaction: "Oyassuu's 2.6 cycle was 0.8s faster than yours, cycling Cannon before your second Hog could break through.",
          elixirAdvantage: "Even trades, but Cannon positioning denied tower contact.",
          coachTip: "Counter-deck recommendation: Swap Zap for The Log or Tornado to activate King Tower early and shut down Hog."
        },
        team: [{ name: this.activePlayer.name, tag: this.activePlayer.tag, clan: { name: "The Darkness" }, crowns: 0, cards: myDeck }],
        opponent: [{ name: "Oyassuu", tag: "#9L208UP", clan: { name: "FA Gaming" }, crowns: 1, cards: oyassuuDeck }]
      }
    ];

    const chip = document.getElementById("user-status-chip");
    const chipName = document.getElementById("chip-player-name");
    const accountNav = document.getElementById("nav-btn-account");

    if (chip) chip.style.display = "flex";
    if (chipName) chipName.textContent = this.activePlayer.name;
    if (accountNav) accountNav.style.display = "inline-block";

    WebAudioFX.playSuccess();
    this.renderPlayerDashboard();
    this.showView("account");
    this.updateNavButtons("account");
    this.showToast(`👑 Synced ${this.activePlayer.name} (${this.activePlayer.tag}) Telemetry!`);
  },

  updateTopBarPlayerStats: function() {
    if (!this.activePlayer) return;
    const trophyEl = document.getElementById("top-trophy-count");
    const goldEl = document.getElementById("top-gold-count");
    const gemEl = document.getElementById("top-gem-count");

    // Live or Seasonal Trophies
    if (trophyEl) {
      const tro = this.activePlayer.trophies || (this.activePlayer.progress && this.activePlayer.progress["2v2League_202609"] ? this.activePlayer.progress["2v2League_202609"].trophies : 2208);
      trophyEl.textContent = Number(tro).toLocaleString();
    }

    // Gold Reserve
    if (goldEl) {
      const gold = this.activePlayer.gold || 140999;
      goldEl.textContent = Number(gold).toLocaleString();
    }

    // Gems
    if (gemEl) {
      const gems = this.activePlayer.gems || 295;
      gemEl.textContent = Number(gems).toLocaleString();
    }
  },

  // --- 7. RENDER PLAYER PROFILE DASHBOARD ---
  renderPlayerDashboard: function() {
    const p = this.activePlayer;
    if (!p) return;
    this.updateTopBarPlayerStats();

    const nameEl = document.getElementById("profile-name");
    const tagEl = document.getElementById("profile-tag");
    const clanEl = document.getElementById("profile-clan");
    const levelEl = document.getElementById("profile-level");
    const arenaEl = document.getElementById("profile-arena");
    const trophiesEl = document.getElementById("profile-trophies");
    const bestTrophiesEl = document.getElementById("profile-best-trophies");
    const winrateEl = document.getElementById("profile-winrate");

    if (nameEl) nameEl.textContent = p.name || "Challenger";
    if (tagEl) tagEl.textContent = p.tag || `#${this.activeTag}`;
    if (clanEl) clanEl.textContent = p.clan ? p.clan.name : "No Clan";
    if (levelEl) levelEl.textContent = `LEVEL ${p.expLevel || 15}`;
    if (arenaEl) arenaEl.textContent = p.arena ? p.arena.name : "Arena 24";

    let displayTrophies = p.trophies || 0;
    let displayBestTrophies = p.bestTrophies || displayTrophies;
    let twoVTwoTrophies = 0;
    let twoVTwoBest = 0;

    // Supercell modern 2025/2026 telemetry: Seasonal Trophy Road & 2v2 League are stored under p.progress
    if (p.progress) {
      for (const k in p.progress) {
        const prog = p.progress[k];
        if (!prog) continue;
        if (k.toLowerCase().includes("2v2")) {
          if (typeof prog.trophies === "number") twoVTwoTrophies = prog.trophies;
          if (typeof prog.bestTrophies === "number") twoVTwoBest = prog.bestTrophies;
        } else if (k.toLowerCase().includes("seasonal") || k.toLowerCase().includes("trophy") || !k) {
          if (typeof prog.trophies === "number" && prog.trophies > displayTrophies) {
            displayTrophies = prog.trophies;
          }
          if (typeof prog.bestTrophies === "number" && prog.bestTrophies > displayBestTrophies) {
            displayBestTrophies = prog.bestTrophies;
          }
        }
      }
    }

    if (trophiesEl) trophiesEl.textContent = displayTrophies.toLocaleString();
    if (bestTrophiesEl) bestTrophiesEl.textContent = displayBestTrophies.toLocaleString();

    const twoVTwoEl = document.getElementById("profile-2v2-trophies");
    if (twoVTwoEl) {
      twoVTwoEl.textContent = (twoVTwoTrophies > 0 ? twoVTwoTrophies : 2216).toLocaleString();
    }

    // Automatically sync 2v2 Radar with the user's live rating!
    const effective2v2 = twoVTwoTrophies > 0 ? twoVTwoTrophies : 2216;
    if (typeof this.updateRadarLive === "function") {
      this.updateRadarLive(effective2v2);
    }

    const wins = p.wins || 0;
    const losses = p.losses || 0;
    const total = wins + losses;
    const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : "50.0";
    if (winrateEl) winrateEl.textContent = `${winRate}%`;

    const kpiWins = document.getElementById("kpi-wins");
    const kpiTotal = document.getElementById("kpi-total-games");
    const kpiThree = document.getElementById("kpi-three-crowns");
    const kpiFav = document.getElementById("kpi-fav-card");
    const kpiTourney = document.getElementById("kpi-tourney-cards");
    const kpiChallenge = document.getElementById("kpi-challenge-wins");

    if (kpiWins) kpiWins.textContent = wins.toLocaleString();
    if (kpiTotal) kpiTotal.textContent = `${total.toLocaleString()} Recorded Matches`;
    if (kpiThree) kpiThree.textContent = (p.threeCrownWins || 0).toLocaleString();
    if (kpiFav) kpiFav.textContent = p.currentFavouriteCard ? p.currentFavouriteCard.name : "Knight";
    if (kpiTourney) kpiTourney.textContent = (p.tournamentCardsWon || 0).toLocaleString();
    if (kpiChallenge) kpiChallenge.textContent = `${p.challengeMaxWins || 12}-Win Badge (${(p.challengeCardsWon || 0).toLocaleString()} cards)`;

    // Handle 7 cards deck + Tower Troop support card if present (e.g. Muk #Y0JJY80)
    let fullDeck = [...(p.currentDeck || [])];
    if (fullDeck.length < 8 && p.currentDeckSupportCards && p.currentDeckSupportCards.length > 0) {
      fullDeck = fullDeck.concat(p.currentDeckSupportCards.slice(0, 8 - fullDeck.length));
    }

    this.renderLiveDeck(fullDeck);
    this.renderLuckyDrops();
    this.renderLiveBattles();
  },

  renderLiveDeck: function(deckCards) {
    const container = document.getElementById("profile-deck-grid");
    if (!container) return;
    container.innerHTML = "";

    // Sync into Tactical Studio
    this.studioDeck = deckCards.map(dc => {
      const match = CLASH_CARDS.find(c => c.name.toLowerCase() === dc.name.toLowerCase() || c.id === dc.id);
      return match || {
        id: dc.id,
        name: dc.name,
        elixir: dc.elixirCost || 3,
        icon: dc.iconUrls ? (dc.iconUrls.medium || dc.iconUrls.evolutionMedium || dc.iconUrls.heroMedium) : ""
      };
    });

    let totalElixir = 0;
    let cardCount = 0;

    deckCards.forEach((card, idx) => {
      const elixir = card.elixirCost !== undefined ? card.elixirCost : 3;
      if (elixir > 0) {
        totalElixir += elixir;
        cardCount++;
      }

      const match = CLASH_CARDS.find(c => c.name.toLowerCase() === card.name.toLowerCase() || c.id === card.id);
      const isHero = match && match.hasHero;

      let img = card.iconUrls ? (card.iconUrls.evolutionMedium || card.iconUrls.heroMedium || card.iconUrls.medium) : "";
      if (isHero && match.heroIcon && idx === 1) {
        img = match.heroIcon;
      }
      if (!img && match) {
        img = match.icon;
      }

      const cardEl = document.createElement("div");
      cardEl.className = "deck-card-unit";
      if (idx === 0) cardEl.style.borderColor = "#a855f7"; // Slot 1 Evo
      if (idx === 1) cardEl.style.borderColor = "#eab308"; // Slot 2 Hero
      if (idx === 2) cardEl.style.borderColor = "#06b6d4"; // Slot 3 Wild

      let badge = `LVL ${card.level || 16}`;
      if (idx === 0) badge = "🟣 EVO";
      else if (idx === 1 && isHero) badge = "🟡 HERO";
      else if (idx === 2) badge = "🔵 WILD";

      cardEl.innerHTML = `
        <div class="card-elixir-dot">${elixir}</div>
        <img src="${img}" class="card-artwork" alt="${card.name}" onerror="this.onerror=null;this.style.opacity='0.3';this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22120%22 viewBox=%220 0 100 120%22%3E%3Crect width=%22100%22 height=%22120%22 rx=%228%22 fill=%22%230d1117%22 stroke=%22%2326eceb%22 stroke-width=%221.5%22/%3E%3Ctext x=%2250%22 y=%2268%22 font-size=%2228%22 text-anchor=%22middle%22 fill=%22%2326eceb%22%3E%E2%9A%94%EF%B8%8F%3C/text%3E%3C/svg%3E'">
        <div class="card-caption">${card.name}</div>
        <div class="card-lvl-tag">${badge}</div>
      `;
      container.appendChild(cardEl);
    });

    const avg = cardCount > 0 ? (totalElixir / cardCount).toFixed(1) : "3.5";
    const statsLine = document.getElementById("deck-stats-line");
    if (statsLine) {
      statsLine.textContent = `Average Elixir: ${avg} • 8 Battle Cards Synced (2026 Slot Alignment)`;
    }

    this.renderStudioDeck();
    this.renderStudioCatalog();
  },

  renderLuckyDrops: function() {
    const container = document.getElementById("profile-lucky-drops-grid");
    if (!container) return;

    const luckyTiers = [
      {
        tier: "COMMON",
        odds: "51.2%",
        color: "#94a3b8",
        bg: "rgba(148, 163, 184, 0.08)",
        border: "rgba(148, 163, 184, 0.25)",
        icon: "⚪",
        drops: "Gold (1.5k), Common Wild Cards (200), Banner Tokens"
      },
      {
        tier: "RARE",
        odds: "28.0%",
        color: "#f59e0b",
        bg: "rgba(245, 158, 11, 0.08)",
        border: "rgba(245, 158, 11, 0.3)",
        icon: "🟠",
        drops: "Gold (8k), Rare Wild Cards (50), Rare Book of Cards"
      },
      {
        tier: "EPIC",
        odds: "15.0%",
        color: "#c084fc",
        bg: "rgba(192, 132, 252, 0.08)",
        border: "rgba(192, 132, 252, 0.35)",
        icon: "🟣",
        drops: "Epic Wild Cards (20), 10,000 Elite Wild Cards, Epic Book"
      },
      {
        tier: "LEGENDARY",
        odds: "4.3%",
        color: "#38bdf8",
        bg: "rgba(56, 189, 248, 0.08)",
        border: "rgba(56, 189, 248, 0.4)",
        icon: "💠",
        drops: "Legendary Wild Card, Legendary Book of Cards, Wild Shards"
      },
      {
        tier: "CHAMPION",
        odds: "1.5%",
        color: "#f43f5e",
        bg: "rgba(244, 63, 94, 0.12)",
        border: "rgba(244, 63, 94, 0.5)",
        icon: "👑",
        drops: "Book of Books (Jackpot), 50,000 Elite Wild Cards, Champion Card"
      }
    ];

    container.innerHTML = luckyTiers.map(t => `
      <div class="lucky-drop-card" style="background: ${t.bg}; border: 1px solid ${t.border}; border-radius: var(--radius-md); padding: 0.85rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.35rem;">
            <span style="font-size: 1.1rem;">${t.icon}</span>
            <strong style="color: ${t.color}; font-size: 0.82rem; letter-spacing: 0.04em;">${t.tier}</strong>
          </div>
          <span style="font-size: 0.78rem; font-weight: 800; color: #fff; background: rgba(0,0,0,0.4); padding: 0.15rem 0.45rem; border-radius: 4px;">
            ${t.odds}
          </span>
        </div>
        <div style="font-size: 0.73rem; color: var(--text-secondary); line-height: 1.35;">
          ${t.drops}
        </div>
      </div>
    `).join('');
  },

  // --- 7.5 DECK AI BATTLE LOG & MATCH ANALYSIS SUITE ---
  getCardDisplayInfo: function(card) {
    const PLACEHOLDER = '';  // neutral — triggers onerror SVG
    if (!card) return { name: "Unknown", icon: PLACEHOLDER, elixir: 3, lvl: "Lvl 15", isEvo: false, isHero: false };
    const cName = card.name || "";
    const match = CLASH_CARDS.find(c => c.name.toLowerCase() === cName.toLowerCase() || c.id === card.id || c.key === card.key);
    let icon = "";
    if (card.iconUrls) {
      icon = card.iconUrls.evolutionMedium || card.iconUrls.heroMedium || card.iconUrls.medium || "";
    }
    if (!icon && match) {
      icon = match.icon;
    }
    // No fallback to Knight — let onerror handler show neutral placeholder
    const elixir = (match && match.elixir) ? match.elixir : (card.elixirCost || 3);
    const isHero = card.isHero || (match && match.hasHero && cName.toLowerCase().includes("hero"));
    const isEvo = card.isEvo || card.evolutionLevel > 0 || (card.iconUrls && card.iconUrls.evolutionMedium) || (match && match.hasEvolution && cName.toLowerCase().includes("evo"));
    return {
      id: (match && match.id) ? match.id : (card.id || 0),
      name: match ? match.name : cName,
      icon: icon,
      elixir: elixir,
      lvl: card.level ? `Lvl ${card.level}` : "Lvl 15",
      isEvo: !!isEvo,
      isHero: !!isHero
    };
  },

  generateHardCounter: function(oppCards, oppName = "Opponent") {
    WebAudioFX.playHeroAura();
    const oppNames = (oppCards || []).map(c => (c.name || "").toLowerCase());

    // Algorithmic Counter Archetype Matching
    let counterKeys = [];
    if (oppNames.some(n => n.includes("lava") || n.includes("balloon"))) {
      // Counter: Heavy Air Denial / Executioner Tornado Control
      counterKeys = ["executioner", "tornado", "electro-dragon", "inferno-dragon", "mega-minion", "poison", "zap", "miner"];
    } else if (oppNames.some(n => n.includes("pekka") || n.includes("golem") || n.includes("royal giant"))) {
      // Counter: Swarm & Tank Shredder Control
      counterKeys = ["inferno-tower", "guards", "ice-wizard", "knight", "firecracker", "poison", "the-log", "hog-rider"];
    } else if (oppNames.some(n => n.includes("barrel") || n.includes("princess") || n.includes("gang"))) {
      // Counter: Triple Spell Anti-Bait
      counterKeys = ["the-log", "valkyrie", "arrows", "bowler", "electro-spirit", "poison", "goblin-drill", "knight"];
    } else if (oppNames.some(n => n.includes("hog") || n.includes("earthquake"))) {
      // Counter: Anti-Hog Tornado Defense
      counterKeys = ["tornado", "cannon", "hunter", "knight", "the-log", "fireball", "ice-spirit", "graveyard"];
    } else {
      // Counter: World Championship Season 87 Hero Ice Wizard PEKKA Control
      counterKeys = ["ice-wizard", "pekka", "knight", "zap", "poison", "electro-spirit", "bandit", "baby-dragon"];
    }

    this.studioDeck = counterKeys.map(k => {
      const match = CLASH_CARDS.find(c => c.key === k || c.name.toLowerCase() === k.replace("-", " "));
      return match || { id: 26000000, name: k, elixir: 3, icon: "" };
    });

    this.renderStudioDeck();
    this.showView("studio");
    this.updateNavButtons("studio");
    this.showToast(`🎯 Built Hard-Counter Deck vs ${oppName}! Loaded into Studio.`);
  },

  buildDeckAIBattleCard: function(b) {
    const teamPlayer1 = (b.team && b.team[0]) ? b.team[0] : {};
    const oppPlayer1 = (b.opponent && b.opponent[0]) ? b.opponent[0] : {};

    const is2v2 = (b.team && b.team.length > 1) || (b.type && b.type.toLowerCase().includes("2v2"));
    const myCrowns = teamPlayer1.crowns !== undefined ? teamPlayer1.crowns : 0;
    const oppCrowns = oppPlayer1.crowns !== undefined ? oppPlayer1.crowns : 0;
    const isWin = myCrowns > oppCrowns;

    const myRawCards = teamPlayer1.cards || (this.activePlayer ? this.activePlayer.currentDeck : []) || [];
    const oppRawCards = oppPlayer1.cards || [];

    const myCards = myRawCards.slice(0, 8).map(c => this.getCardDisplayInfo(c));
    const oppCards = oppRawCards.slice(0, 8).map(c => this.getCardDisplayInfo(c));

    const myAvg = myCards.length > 0 ? (myCards.reduce((acc, c) => acc + c.elixir, 0) / myCards.length).toFixed(1) : "3.4";
    const oppAvg = oppCards.length > 0 ? (oppCards.reduce((acc, c) => acc + c.elixir, 0) / oppCards.length).toFixed(1) : "3.8";

    const elixirDiff = (parseFloat(oppAvg) - parseFloat(myAvg)).toFixed(1);
    const elixirAdvLabel = parseFloat(elixirDiff) > 0 ? `+${elixirDiff} cycle adv` : `${elixirDiff} cycle`;

    const odds = b.odds || { userWinProb: isWin ? 64 : 45, oppWinProb: isWin ? 36 : 55, label: isWin ? "Favorable Matchup" : "Challenging Matchup" };
    const analysis = b.outcomeAnalysis || {
      interaction: "Clean defensive positioning and elixir management decided the match outcome.",
      elixirAdvantage: "Controlled positive trades during high-density pushes.",
      coachTip: "Capitalize on opponent spell commitments with opposite lane counter-attacks."
    };

    const cardEl = document.createElement("div");
    cardEl.className = "cr-battle-log-card";
    cardEl.innerHTML = `
      <!-- Match Status Header: DEFEAT / VICTORY + Crowns Score -->
      <div class="cr-battle-header-row">
        <div class="cr-match-status-text ${isWin ? "victory" : "defeat"}">
          ${isWin ? "VICTORY" : "DEFEAT"}
        </div>
        <div class="cr-crowns-score-pill">
          <span style="color:#38bdf8;">👑 ${myCrowns}</span>
          <span style="color:#94a3b8; font-size: 0.9rem; margin: 0 3px;">-</span>
          <span style="color:#f43f5e;">${oppCrowns} 👑</span>
        </div>
      </div>

      <!-- Combatants Row (1:1 with Screenshot 3) -->
      <div class="cr-battle-arena-row">
        <!-- You: 8 Cards in 2x4 -->
        <div class="cr-combatant-column">
          <div class="cr-combatant-header you">
            <span class="cr-crest-badge">🌙</span>
            <div class="cr-combatant-meta">
              <div class="cr-combatant-name" title="${teamPlayer1.name || "Muk"}">${teamPlayer1.name || "Muk"}</div>
              <div class="cr-combatant-clan" title="${teamPlayer1.clan ? teamPlayer1.clan.name : "The Darkness"}">${teamPlayer1.clan ? teamPlayer1.clan.name : "The Darkness"}</div>
            </div>
            <span class="cr-tower-lvl-badge">15</span>
          </div>
          <div class="cr-cards-matrix">
            ${myCards.map(c => `
              <div class="cr-matrix-slot ${c.isEvo ? "evo-slot" : ""} ${c.isHero ? "hero-slot" : ""}" title="${c.name} (${c.elixir}💧)">
                ${c.isEvo ? '<div class="cr-evo-gem"></div>' : ''}
                ${c.isHero ? '<div class="cr-hero-gem"></div>' : ''}
                <img src="${c.icon}" alt="${c.name}" loading="lazy" onerror="this.onerror=null;this.style.opacity='0.3';this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22120%22 viewBox=%220 0 100 120%22%3E%3Crect width=%22100%22 height=%22120%22 rx=%228%22 fill=%22%230d1117%22 stroke=%22%2326eceb%22 stroke-width=%221.5%22/%3E%3Ctext x=%2250%22 y=%2268%22 font-size=%2228%22 text-anchor=%22middle%22 fill=%22%2326eceb%22%3E%E2%9A%94%EF%B8%8F%3C/text%3E%3C/svg%3E'">
                <div class="cr-card-lvl-pill max">${c.lvl || "Lvl 15"}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Center Swords Divider -->
        <div class="cr-vs-center">
          <span class="cr-swords-icon">⚔️</span>
        </div>

        <!-- Opponent: 8 Cards in 2x4 -->
        <div class="cr-combatant-column">
          <div class="cr-combatant-header opp">
            <span class="cr-tower-lvl-badge">15</span>
            <div class="cr-combatant-meta text-right">
              <div class="cr-combatant-name" title="${oppPlayer1.name || "Opponent"}">${oppPlayer1.name || "Opponent"}</div>
              <div class="cr-combatant-clan" title="${oppPlayer1.clan ? oppPlayer1.clan.name : "No Clan"}">${oppPlayer1.clan ? oppPlayer1.clan.name : "No Clan"}</div>
            </div>
            <span class="cr-crest-badge">🛡️</span>
          </div>
          <div class="cr-cards-matrix">
            ${oppCards.map(c => `
              <div class="cr-matrix-slot ${c.isEvo ? "evo-slot" : ""} ${c.isHero ? "hero-slot" : ""}" title="${c.name} (${c.elixir}💧)">
                ${c.isEvo ? '<div class="cr-evo-gem"></div>' : ''}
                ${c.isHero ? '<div class="cr-hero-gem"></div>' : ''}
                <img src="${c.icon}" alt="${c.name}" loading="lazy" onerror="this.onerror=null;this.style.opacity='0.3';this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22120%22 viewBox=%220 0 100 120%22%3E%3Crect width=%22100%22 height=%22120%22 rx=%228%22 fill=%22%230d1117%22 stroke=%22%2326eceb%22 stroke-width=%221.5%22/%3E%3Ctext x=%2250%22 y=%2268%22 font-size=%2228%22 text-anchor=%22middle%22 fill=%22%2326eceb%22%3E%E2%9A%94%EF%B8%8F%3C/text%3E%3C/svg%3E'">
                <div class="cr-card-lvl-pill max">${c.lvl || "Lvl 15"}</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- AI Coach Interaction Snippet (Collapsible) -->
      <div class="deckai-coach-box" id="coach-tip-${b.id || Math.random().toString(36).slice(2, 7)}" style="display: none; margin-bottom: 0.65rem;">
        <div class="deckai-coach-item">
          <span class="deckai-coach-icon">🎯</span>
          <div><strong style="color: var(--cyan);">Key Interaction:</strong> ${analysis.interaction}</div>
        </div>
        <div class="deckai-coach-item">
          <span class="deckai-coach-icon">⚡</span>
          <div><strong style="color: var(--gold);">Elixir Efficiency:</strong> ${analysis.elixirAdvantage}</div>
        </div>
        <div class="deckai-coach-item">
          <span class="deckai-coach-icon">💡</span>
          <div><strong style="color: #34d399;">AI Coach Tip:</strong> ${analysis.coachTip}</div>
        </div>
      </div>

      <!-- Match Footer: Mode + 3 Action Buttons (Screenshot 3: Practice, Share, Watch) -->
      <div class="cr-match-footer-row">
        <div class="cr-match-outcome-badge">
          <span class="outcome-icon">${isWin ? '🏆' : '🛡️'}</span>
          <div class="outcome-details">
            <span class="outcome-text ${isWin ? 'win' : 'loss'}">${isWin ? 'VICTORY' : 'DEFEAT'}</span>
            <span class="outcome-time">${b.timeAgo || this.formatBattleTime(b.battleTime)}</span>
          </div>
        </div>

        <div class="cr-match-action-buttons">
          <button type="button" class="cr-sub-btn-blue btn-battle-practice" title="Practice Matchup in Simulator">
            PRACTICE
          </button>
          <button type="button" class="cr-sub-btn-blue btn-battle-share" title="Copy & Share In-Game Deck Link">
            SHARE
          </button>
          <button type="button" class="cr-sub-btn-green btn-battle-watch" title="Watch AI Coach Analysis">
            WATCH
          </button>
        </div>
      </div>
    `;

    // 1. Wire Practice Button -> Loads Matchup into Combat Simulator
    const practiceBtn = cardEl.querySelector(".btn-battle-practice");
    if (practiceBtn) {
      practiceBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        if (oppRawCards && oppRawCards.length > 0) {
          this.studioDeck = oppRawCards.map(c => {
            const match = CLASH_CARDS.find(x => x.name.toLowerCase() === (c.name || "").toLowerCase() || x.id === c.id);
            return match || { id: c.id, name: c.name, elixir: c.elixirCost || 3, icon: "" };
          });
          this.showView("simulator");
          this.updateNavButtons("simulator");
          this.showToast(`⚔️ Loaded Matchup vs ${oppPlayer1.name || "Opponent"} into Combat Simulator!`);
        } else {
          this.showView("simulator");
          this.updateNavButtons("simulator");
        }
      });
    }

    // 2. Wire Share Button -> Copies Official Deck Link & Opens Share Modal
    const shareBtn = cardEl.querySelector(".btn-battle-share");
    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        WebAudioFX.playSuccess();
        const cardsToShare = (oppRawCards && oppRawCards.length >= 8) ? oppRawCards : myRawCards;
        this.handleCopyDeck(cardsToShare, `${oppPlayer1.name || "Match"}'s Battle Deck`);
      });
    }

    // 3. Wire Watch Button -> Toggles In-Game AI Coach Analysis Panel
    const watchBtn = cardEl.querySelector(".btn-battle-watch");
    const coachBox = cardEl.querySelector(".deckai-coach-box");
    if (watchBtn && coachBox) {
      watchBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        const isOpen = coachBox.style.display !== "none";
        coachBox.style.display = isOpen ? "none" : "block";
        watchBtn.textContent = isOpen ? "WATCH" : "CLOSE";
        if (!isOpen) {
          coachBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      });
    }

    return cardEl;
  },

  renderBattleStream: function(filter = "all") {
    const container = document.getElementById("battles-stream-container");
    if (!container) return;
    container.innerHTML = "";

    const battles = this.activeBattles || [];

    // Dynamically update Battle Log KPIs from real match data
    if (battles.length > 0) {
      const wins = battles.filter(b => {
        const myC = (b.team && b.team[0] && b.team[0].crowns !== undefined) ? b.team[0].crowns : 0;
        const oppC = (b.opponent && b.opponent[0] && b.opponent[0].crowns !== undefined) ? b.opponent[0].crowns : 0;
        return myC > oppC;
      }).length;
      const losses = battles.length - wins;
      const wrPercent = ((wins / battles.length) * 100).toFixed(1) + "%";
      const winrateEl = document.getElementById("battles-kpi-winrate");
      if (winrateEl) {
        winrateEl.textContent = wrPercent;
        const subText = winrateEl.nextElementSibling;
        if (subText) subText.textContent = `${wins}W - ${losses}L`;
      }
    }

    const filtered = battles.filter(b => {
      const myCrowns = (b.team && b.team[0] && b.team[0].crowns !== undefined) ? b.team[0].crowns : 0;
      const oppCrowns = (b.opponent && b.opponent[0] && b.opponent[0].crowns !== undefined) ? b.opponent[0].crowns : 0;
      const isWin = myCrowns > oppCrowns;
      const is2v2 = (b.team && b.team.length > 1) || (b.type && b.type.toLowerCase().includes("2v2"));

      if (filter === "all") return true;
      if (filter === "win") return isWin;
      if (filter === "loss") return !isWin;
      if (filter === "1v1") return !is2v2;
      if (filter === "2v2") return is2v2;
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem; padding: 2rem; text-align: center;">No matches match the selected filter.</div>`;
      return;
    }

    filtered.forEach(b => {
      container.appendChild(this.buildDeckAIBattleCard(b));
    });
  },

  renderLiveBattles: function() {
    const container = document.getElementById("profile-battles-feed");
    if (!container) return;
    container.innerHTML = "";

    if (!this.activeBattles || this.activeBattles.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem;">No recent battles recorded in battle log.</div>`;
      return;
    }

    // Render top 4 matches in profile feed
    this.activeBattles.slice(0, 4).forEach(b => {
      container.appendChild(this.buildDeckAIBattleCard(b));
    });
  },

  // --- 8. 2026 HEROES & ABILITIES SYSTEM CATALOG ---
  renderHeroesCatalog: function(filter = "all") {
    const container = document.getElementById("heroes-catalog-grid");
    if (!container) return;
    container.innerHTML = "";

    const items = (typeof HEROES_CATALOG !== "undefined" ? HEROES_CATALOG : []).filter(item => {
      if (filter === "all") return true;
      if (filter === "champion") return item.isChampion;
      return item.heroTier === filter;
    });

    items.forEach(item => {
      const isChamp = item.isChampion;
      const ability = isChamp ? item.championAbility : item.heroAbility;
      const tier = isChamp ? "CHAMPION" : `${item.heroTier}-TIER HERO`;
      const tierClass = isChamp ? "tier-champ" : `tier-${item.heroTier ? item.heroTier.toLowerCase() : "b"}`;
      const imgSrc = item.heroIcon || item.icon;

      const cardEl = document.createElement("div");
      cardEl.className = `hero-unit-card ${isChamp ? "champion-card" : ""}`;
      cardEl.innerHTML = `
        <div class="hero-card-top">
          <img src="${imgSrc}" class="hero-card-avatar" alt="${item.name}">
          <div class="hero-card-meta">
            <h3 class="hero-card-name-h3">${item.name}</h3>
            <div style="display: flex; gap: 0.4rem; align-items: center; margin-bottom: 0.35rem;">
              <span class="hero-tier-tag ${tierClass}">${tier}</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--elixir); font-weight: 800;">${item.elixir}⚡ Elixir</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted);">${isChamp ? "Champion Card Rarity" : "Base Card Hero Feature"}</div>
          </div>
        </div>

        <div class="hero-ability-box">
          <div class="ability-header-row">
            <span class="ability-name-txt">⚡ ${ability ? (ability.name || ability.abilityName) : "Active Ability"}</span>
            <span class="ability-cost-tag">${ability ? (ability.elixir || ability.abilityElixir) : 1}⚡</span>
          </div>
          <p class="ability-desc-txt">${ability ? ability.description : "Unlocks unique manual tactical ability in the arena."}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
            <span class="single-use-badge">
              ${ability && ability.singleUse === false ? "🔄 Multi-Use Cooldown: " + (ability.cooldown || 11) + "s" : "⚡ 1x Single-Use (Aug 26 Patch)"}
            </span>
            ${ability && ability.badge ? `<span style="font-size: 0.65rem; color: var(--gold); font-weight: 700;">${ability.badge}</span>` : ""}
          </div>
          ${ability && ability.proTip ? `<div class="pro-tip-callout">💡 Pro Tip: ${ability.proTip}</div>` : ""}
        </div>
      `;
      container.appendChild(cardEl);
    });
  },

  // --- 9. TACTICAL DECK STUDIO (3 SPECIAL SLOTS) ---
  setupDefaultStudioDeck: function() {
    // Default 8-card competitive deck aligned with 2026 Special Slots
    const defaultKeys = ["knight", "ice-wizard", "pekka", "zap", "poison", "electro-spirit", "bandit", "baby-dragon"];
    this.studioDeck = defaultKeys.map(k => CLASH_CARDS.find(c => c.key === k)).filter(Boolean);
    this.renderStudioDeck();
    this.renderStudioCatalog();
  },

  renderStudioDeck: function() {
    const container = document.getElementById("studio-deck-slots");
    if (!container) return;
    container.innerHTML = "";

    let totalElixir = 0;
    this.studioDeck.forEach((card, idx) => {
      totalElixir += card.elixir || 3;

      const isSlot0 = idx === 0; // Evolution Slot
      const isSlot1 = idx === 1; // Hero Slot
      const isSlot2 = idx === 2; // Wild Slot

      const cardImg = (isSlot1 && card.heroIcon) ? card.heroIcon : ((isSlot0 && card.evoIcon) ? card.evoIcon : card.icon);

      let slotBadge = `SLOT ${idx + 1}`;
      let slotBorder = "var(--border-subtle)";

      if (isSlot0) {
        slotBadge = card.hasEvolution ? "🟣 EVO ACTIVE" : "🟣 EVO SLOT";
        slotBorder = "#a855f7";
      } else if (isSlot1) {
        slotBadge = card.hasHero ? "🟡 HERO ACTIVE" : "🟡 HERO SLOT";
        slotBorder = "#eab308";
      } else if (isSlot2) {
        slotBadge = "🔵 WILD SLOT";
        slotBorder = "#06b6d4";
      }

      const slot = document.createElement("div");
      slot.className = "deck-card-unit";
      slot.style.borderColor = slotBorder;
      slot.innerHTML = `
        <div class="card-elixir-dot">${card.elixir || 3}</div>
        <img src="${cardImg || ""}" class="card-artwork" alt="${card.name}">
        <div class="card-caption">${card.name}</div>
        <div style="font-size: 0.62rem; font-weight: 800; color: #fff; margin-top: 0.15rem;">${slotBadge}</div>
        <div class="btn-remove-card" style="font-size: 0.65rem; color: var(--loss); cursor: pointer; margin-top: 0.2rem;">✕ Remove</div>
      `;

      const removeBtn = slot.querySelector(".btn-remove-card");
      if (removeBtn) {
        removeBtn.addEventListener("click", () => {
          WebAudioFX.playClick();
          this.studioDeck.splice(idx, 1);
          this.renderStudioDeck();
          this.renderStudioCatalog();
        });
      }

      container.appendChild(slot);
    });

    // Render empty placeholder slots to preserve exact 2x4 in-game grid (Game UI Database reference)
    for (let i = this.studioDeck.length; i < 8; i++) {
      const emptySlot = document.createElement("div");
      emptySlot.className = "deck-card-unit empty-slot";
      emptySlot.style.border = "2px dashed #475569";
      emptySlot.style.background = "rgba(15, 23, 42, 0.5)";
      emptySlot.style.minHeight = "110px";
      emptySlot.style.display = "flex";
      emptySlot.style.flexDirection = "column";
      emptySlot.style.alignItems = "center";
      emptySlot.style.justifyContent = "center";
      emptySlot.innerHTML = `
        <div style="font-size: 1.5rem; color: #64748b; line-height: 1;">➕</div>
        <div style="font-size: 0.62rem; font-weight: 800; color: #64748b; margin-top: 0.35rem; font-family: var(--font-clash);">SLOT ${i + 1}</div>
      `;
      container.appendChild(emptySlot);
    }

    const avg = this.studioDeck.length > 0 ? (totalElixir / this.studioDeck.length).toFixed(1) : "0.0";
    const avgEl = document.getElementById("studio-avg-elixir");
    if (avgEl) avgEl.textContent = avg;

    // Telemetry updates
    const cycleVal = document.getElementById("studio-cycle-val");
    const archVal = document.getElementById("studio-archetype-val");

    if (cycleVal) {
      const cycle = SimulatorEngine.getFourCardCycle(this.studioDeck);
      cycleVal.textContent = `${cycle} Elixir`;
    }
    if (archVal) {
      archVal.textContent = SimulatorEngine.detectArchetype(this.studioDeck);
    }
  },

  renderStudioCatalog: function() {
    const container = document.getElementById("studio-catalog-grid");
    if (!container) return;
    container.innerHTML = "";

    const category = this.catalogCategory || "all";

    const filtered = CLASH_CARDS.filter(c => {
      if (c.type === "tower-troop") return false;
      if (this.searchFilter && !c.name.toLowerCase().includes(this.searchFilter)) return false;

      if (category === "heroes") return c.hasHero;
      if (category === "evolutions") return c.hasEvolution;
      if (category === "champions") return c.isChampion;
      if (category === "spell") return c.rarity === "spell" || ["Zap", "The Log", "Fireball", "Arrows", "Lightning", "Poison", "Rocket", "Earthquake", "Tornado", "Freeze", "Void"].includes(c.name);
      if (category === "building") return ["Cannon", "Tesla", "Inferno Tower", "Bomb Tower", "X-Bow", "Mortar", "Tombstone", "Goblin Hut", "Barbarian Hut", "Furnace", "Elixir Collector"].includes(c.name);

      return true;
    });

    filtered.forEach(c => {
      const inDeck = this.studioDeck.some(x => x.id === c.id || x.name === c.name);
      const item = document.createElement("div");
      item.className = `catalog-card-item ${inDeck ? "disabled" : ""}`;

      const badgeText = c.hasHero ? "🟡 HERO" : (c.hasEvolution ? "🟣 EVO" : (c.isChampion ? "👑 CHAMP" : ""));

      item.innerHTML = `
        ${badgeText ? `<div style="position: absolute; top: 2px; left: 2px; font-size: 0.55rem; font-weight: 800; background: rgba(0,0,0,0.7); padding: 1px 4px; border-radius: 3px;">${badgeText}</div>` : ""}
        <img src="${c.icon || ""}" style="width: 100%; aspect-ratio: 3/4; object-fit: contain;">
        <div style="font-size: 0.68rem; font-weight: 700; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">${c.name}</div>
      `;

      item.onclick = () => {
        this.showCardDetailModal(c);
      };

      container.appendChild(item);
    });
  },

  // --- Card Detail & Upgrade Inspection Modal (Interface In Game: clash-royale-upgrade-card) ---
  showCardDetailModal: function(card) {
    if (!card) return;
    WebAudioFX.playHeroAura();

    const existing = document.getElementById("cr-card-detail-modal-root");
    if (existing) existing.remove();

    const info = this.getCardDisplayInfo(card);
    const match = CLASH_CARDS.find(c => c.name.toLowerCase() === (card.name || "").toLowerCase() || c.id === card.id);
    const rarity = (match && match.rarity) ? match.rarity.toUpperCase() : "COMMON";
    const type = (match && match.type) ? match.type.toUpperCase() : "TROOP";
    const desc = (match && match.description) ? match.description : "A versatile tactical unit deployed in the arena.";

    const backdrop = document.createElement("div");
    backdrop.className = "cr-card-modal-backdrop";
    backdrop.id = "cr-card-detail-modal-root";
    backdrop.innerHTML = `
      <div class="cr-card-modal-sheet">
        <button type="button" class="cr-modal-close-btn" id="btn-close-card-modal" title="Close">✖</button>
        
        <div class="cr-modal-card-top">
          <div>
            <div style="font-size: 0.65rem; color: var(--gold); font-weight: 800; text-transform: uppercase;">${rarity} • ${type}</div>
            <div class="cr-modal-card-name">${info.name}</div>
          </div>
          <div class="cr-currency-pill" style="background: rgba(225, 29, 72, 0.2); border-color: var(--elixir); color: #fff; font-size: 0.95rem;">
            💧 ${info.elixir}
          </div>
        </div>

        <div class="cr-modal-card-body">
          <div class="cr-modal-card-art-box">
            <img src="${info.icon}" alt="${info.name}" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22120%22%3E%3Crect width=%22100%22 height=%22120%22 fill=%22%230d1117%22/%3E%3Ctext x=%2250%22 y=%2265%22 fill=%22%23fff%22 text-anchor=%22middle%22%3E🃏%3C/text%3E%3C/svg%3E'">
            <div class="cr-card-lvl-pill max" style="position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%); width: 85%;">${info.lvl || "Lvl 15 Elite"}</div>
          </div>

          <div class="cr-modal-stat-grid">
            <div class="cr-modal-stat-tile">
              <div class="cr-modal-stat-label">Hitpoints</div>
              <div class="cr-modal-stat-val">❤️ 1,840</div>
            </div>
            <div class="cr-modal-stat-tile">
              <div class="cr-modal-stat-label">Damage</div>
              <div class="cr-modal-stat-val">⚔️ 380</div>
            </div>
            <div class="cr-modal-stat-tile">
              <div class="cr-modal-stat-label">Targets</div>
              <div class="cr-modal-stat-val">🎯 Ground</div>
            </div>
            <div class="cr-modal-stat-tile">
              <div class="cr-modal-stat-label">Hit Speed</div>
              <div class="cr-modal-stat-val">⏱️ 1.2s</div>
            </div>
          </div>
        </div>

        <div class="cr-modal-ability-box">
          <div style="font-weight: 800; font-family: var(--font-clash); margin-bottom: 2px;">
            ${info.isHero ? "👑 HERO ABILITY UNLOCKED" : (info.isEvo ? "🟣 EVOLUTION ACTIVE" : "📜 TACTICAL ROLE")}
          </div>
          <div>${desc}</div>
        </div>

        <div class="cr-modal-action-row">
          <button type="button" class="cr-sub-btn-blue" id="btn-modal-add-to-studio" style="flex: 1; padding: 0.55rem; font-size: 0.85rem;">
            🃏 ADD TO STUDIO
          </button>
          <button type="button" class="cr-sub-btn-green" id="btn-modal-sim-card" style="flex: 1; padding: 0.55rem; font-size: 0.85rem;">
            ⚔️ PRACTICE MATCHUP
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    // Close handlers
    const closeBtn = backdrop.querySelector("#btn-close-card-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        backdrop.remove();
      });
    }
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) backdrop.remove();
    });

    // Add to Studio button
    const addBtn = backdrop.querySelector("#btn-modal-add-to-studio");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        WebAudioFX.playCardLock();
        if (this.studioDeck.length < 8) {
          if (!this.studioDeck.some(c => c.id === info.id || c.name === info.name)) {
            this.studioDeck.push({ id: info.id, name: info.name, elixir: info.elixir, icon: info.icon });
            this.renderStudioDeck();
            this.showToast(`✅ Added ${info.name} to Studio Deck!`);
          } else {
            this.showToast(`⚠️ ${info.name} is already in your Studio Deck.`);
          }
        } else {
          this.showToast(`⚠️ Studio Deck is full (8/8 cards).`);
        }
        backdrop.remove();
      });
    }

    // Simulate Matchup button
    const simBtn = backdrop.querySelector("#btn-modal-sim-card");
    if (simBtn) {
      simBtn.addEventListener("click", () => {
        WebAudioFX.playClick();
        backdrop.remove();
        this.showView("simulator");
        this.updateNavButtons("simulator");
        this.showToast(`⚔️ Loaded ${info.name} into Combat Simulator!`);
      });
    }
  },

  // --- 10. MATCHUP ARENA SIMULATOR ---
  setupMatchupArena: function() {
    const deck1Keys = ["ice-wizard", "knight", "goblin-barrel", "princess", "the-log", "rocket", "goblin-gang", "ice-spirit"];
    const deck2Keys = ["pekka", "battle-ram", "bandit", "royal-ghost", "electro-wizard", "poison", "zap", "minions"];

    this.simDeck1 = deck1Keys.map(k => CLASH_CARDS.find(c => c.key === k)).filter(Boolean);
    this.simDeck2 = deck2Keys.map(k => CLASH_CARDS.find(c => c.key === k)).filter(Boolean);

    this.renderSimDecks();
  },

  renderSimDecks: function() {
    const d1Container = document.getElementById("sim-deck-1");
    const d2Container = document.getElementById("sim-deck-2");

    if (d1Container) {
      d1Container.innerHTML = this.simDeck1.map(c => `
        <div style="text-align: center;">
          <img src="${c.heroIcon || c.icon}" style="width: 100%; aspect-ratio: 3/4; object-fit: contain;">
          <div style="font-size: 0.65rem; color: var(--text-muted);">${c.name}</div>
        </div>
      `).join("");
    }

    if (d2Container) {
      d2Container.innerHTML = this.simDeck2.map(c => `
        <div style="text-align: center;">
          <img src="${c.heroIcon || c.icon}" style="width: 100%; aspect-ratio: 3/4; object-fit: contain;">
          <div style="font-size: 0.65rem; color: var(--text-muted);">${c.name}</div>
        </div>
      `).join("");
    }
  },

  runSimulation: function() {
    WebAudioFX.playSimulateHum();
    const verdictEl = document.getElementById("sim-outcome-verdict");
    if (!verdictEl) return;

    verdictEl.textContent = "Simulating 10,000 Micro-Exchanges...";

    setTimeout(() => {
      const result = SimulatorEngine.simulateMatchup(this.simDeck1, this.simDeck2);
      WebAudioFX.playSuccess();
      verdictEl.innerHTML = `
        <div style="color: var(--cyan); font-size: 1.45rem; font-weight: 900; margin-bottom: 0.35rem;">
          Deck 1 (${result.winRateA}%) vs Deck 2 (${result.winRateB}%)
        </div>
        <div style="font-size: 0.95rem; color: var(--gold); font-weight: 800; margin-bottom: 0.65rem;">
          ${result.verdict}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.5;">
          ${result.insights.join(" • ")}
        </div>
      `;
    }, 450);
  },

  // --- 11. META RANKINGS & SPECIAL SLOTS ---
  renderSupercellLiveNews: async function() {
    const banner = document.getElementById("supercell-live-news-banner");
    if (!banner) return;

    try {
      const res = await fetch("./official_news.json");
      if (!res.ok) throw new Error("Could not load official_news.json");
      const data = await res.json();
      const articles = data.articles || [];
      if (!articles.length) return;

      const balArticle = articles.find(a => a.title.toLowerCase().includes("september balance")) || articles[0];

      banner.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <span style="background: var(--cyan); color: #080a10; font-size: 0.7rem; font-weight: 900; padding: 0.2rem 0.5rem; border-radius: 4px; letter-spacing: 0.05em; text-transform: uppercase;">
              ⚡ Official Supercell Telemetry
            </span>
            <strong style="color: #fff; font-size: 0.95rem;">${balArticle.title}</strong>
          </div>
          <a href="${balArticle.url}" target="_blank" rel="noopener" style="font-size: 0.75rem; color: var(--cyan); text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 0.25rem;">
            Read Patch Notes on Supercell.com ↗
          </a>
        </div>
        <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.85rem;">
          Published by Supercell on <strong>${balArticle.publishDate ? balArticle.publishDate.substring(0, 10) : "Recent"}</strong>. Live balance adjustments directly synced into Nexus Royale ladder analytics.
        </div>
        ${balArticle.highlights && balArticle.highlights.length ? `
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.5rem;">
            ${balArticle.highlights.filter(h => h.title || h.text).slice(0, 4).map(h => `
              <div style="background: rgba(17, 24, 39, 0.65); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 6px; padding: 0.55rem 0.75rem; font-size: 0.75rem;">
                ${h.title ? `<strong style="color: var(--gold); display: block; margin-bottom: 2px;">${h.title}</strong>` : ''}
                <div style="color: var(--text-secondary); line-height: 1.4;">${h.text}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      `;
    } catch (e) {
      console.warn("Supercell news load note:", e);
    }
  },

  renderMetaRankings: function() {
    this.renderSupercellLiveNews();
    const container = document.getElementById("meta-tier-container");
    if (!container) return;
    container.innerHTML = "";

    const metaDecks = typeof PRO_META_DECKS !== "undefined" ? PRO_META_DECKS : [];

    metaDecks.forEach(deck => {
      const card = document.createElement("div");
      card.className = "section-panel";
      card.style.padding = "1.25rem";
      card.style.marginBottom = "1.25rem";

      const heroSlotCard = CLASH_CARDS.find(c => c.key === deck.specialSlots.heroSlot);
      const evoSlotCard = CLASH_CARDS.find(c => c.key === deck.specialSlots.evoSlot);
      const wildSlotCard = CLASH_CARDS.find(c => c.key === deck.specialSlots.wildSlot);

      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.85rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span style="font-size: 0.75rem; font-weight: 800; color: var(--gold); background: var(--gold-subtle); padding: 0.2rem 0.5rem; border-radius: var(--radius-sm);">${deck.tier} TIER</span>
              <strong style="font-size: 1.1rem; color: #fff;">${deck.name}</strong>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${deck.archetype} • Piloted by <strong>${deck.proPlayer}</strong> (${deck.rank})</div>
          </div>
          <div style="text-align: right;">
            <span style="font-size: 0.85rem; font-weight: 800; color: var(--win);">Win Rate: ${deck.winRate}%</span>
            <div style="font-size: 0.72rem; color: var(--text-muted);">Use Rate: ${deck.useRate}% • Avg: ${deck.avgElixir}⚡</div>
          </div>
        </div>

        <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 0.85rem; font-size: 0.72rem;">
          <span style="background: rgba(168, 85, 247, 0.15); border: 1px solid #a855f7; color: #c084fc; padding: 0.2rem 0.5rem; border-radius: var(--radius-sm);">
            🟣 Evo Slot: <strong>${evoSlotCard ? evoSlotCard.name : deck.specialSlots.evoSlot}</strong>
          </span>
          <span style="background: rgba(234, 179, 8, 0.15); border: 1px solid #eab308; color: #fde047; padding: 0.2rem 0.5rem; border-radius: var(--radius-sm);">
            🟡 Hero Slot: <strong>${heroSlotCard ? heroSlotCard.name : deck.specialSlots.heroSlot}</strong>
          </span>
          <span style="background: rgba(6, 182, 212, 0.15); border: 1px solid #06b6d4; color: #67e8f9; padding: 0.2rem 0.5rem; border-radius: var(--radius-sm);">
            🔵 Wild Slot: <strong>${wildSlotCard ? wildSlotCard.name : deck.specialSlots.wildSlot}</strong>
          </span>
        </div>

        <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 1rem;">
          ${deck.description}
        </p>

        <div class="deck-eight-grid" style="grid-template-columns: repeat(8, 1fr); gap: 6px;">
          ${deck.cards.map((k) => {
            const match = CLASH_CARDS.find(c => c.key === k);
            const isHero = match && match.hasHero && k === deck.specialSlots.heroSlot;
            const isEvo = match && match.hasEvolution && k === deck.specialSlots.evoSlot;
            const img = isHero && match.heroIcon ? match.heroIcon : (isEvo && match.evoIcon ? match.evoIcon : (match ? match.icon : ""));
            return `
              <div style="position: relative; text-align: center;">
                <img src="${img}" style="width: 100%; aspect-ratio: 3/4; object-fit: contain;">
                <div style="font-size: 0.62rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${match ? match.name : k}</div>
              </div>
            `;
          }).join("")}
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.85rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); flex-wrap: wrap;">
          <button type="button" class="btn-secondary btn-meta-studio" style="font-size: 0.75rem; padding: 0.4rem 0.75rem;">
            🛠️ Open in Studio
          </button>
          <button type="button" class="btn-primary-action btn-meta-copy" style="font-size: 0.75rem; padding: 0.4rem 0.9rem; background: linear-gradient(135deg, var(--cyan) 0%, var(--gold) 100%); color: #080a10; font-weight: 800;">
            ⚔️ Copy to Clash Royale
          </button>
        </div>
      `;

      const metaCopyBtn = card.querySelector(".btn-meta-copy");
      if (metaCopyBtn) {
        metaCopyBtn.addEventListener("click", () => {
          this.handleCopyDeck(deck.cards, deck.name);
        });
      }

      const metaStudioBtn = card.querySelector(".btn-meta-studio");
      if (metaStudioBtn) {
        metaStudioBtn.addEventListener("click", () => {
          WebAudioFX.playCardLock();
          this.studioDeck = deck.cards.map(k => CLASH_CARDS.find(c => c.key === k)).filter(Boolean);
          this.renderStudioDeck();
          this.showView("studio");
          this.updateNavButtons("studio");
          this.showToast(`Loaded ${deck.name} into Tactical Studio!`);
        });
      }

      container.appendChild(card);
    });
  },

  // --- 12. 2V2 COMPETITIVE LEAGUE GLOBAL RANK PREDICTOR ---
  setup2v2Radar: function() {
    const input = document.getElementById("radar-trophies-input");
    const slider = document.getElementById("radar-trophies-slider");
    const loadMyTagBtn = document.getElementById("btn-radar-load-my-tag");
    const presetBtns = document.querySelectorAll(".radar-preset-btn");

    const updateRadar = (trophies) => {
      trophies = parseInt(trophies, 10);
      if (isNaN(trophies)) trophies = 2273;
      if (input && input.value != trophies) input.value = trophies;
      if (slider && slider.value != trophies) slider.value = Math.min(3200, Math.max(1800, trophies));

      const rankEl = document.getElementById("radar-out-rank");
      const tierEl = document.getElementById("radar-out-tier");
      const neededEl = document.getElementById("radar-out-needed");
      const winsEl = document.getElementById("radar-out-wins");
      const badgeEl = document.getElementById("radar-out-safety-badge");
      const subEl = document.getElementById("radar-out-safety-sub");
      const barFill = document.getElementById("radar-out-bar-fill");
      const pctText = document.getElementById("radar-out-pct-text");

      const cutoff = 2450;
      let rank = 14200;
      let tier = "Grand Master II";

      if (trophies >= 3000) tier = "Ultimate Champion";
      else if (trophies >= 2800) tier = "Royal Champion";
      else if (trophies >= 2600) tier = "Grand Champion";
      else if (trophies >= 2450) tier = "Champion";
      else if (trophies >= 2200) tier = "Grand Master II";
      else if (trophies >= 2000) tier = "Master I";
      else tier = "Challenger";

      if (trophies >= cutoff) {
        rank = Math.max(1, Math.round(10000 * Math.pow(Math.E, -(trophies - cutoff) / 185)));
        if (neededEl) {
          neededEl.style.color = "var(--win)";
          neededEl.textContent = `+${trophies - cutoff} Buffer`;
        }
        if (winsEl) winsEl.textContent = "🏆 Inside Top 10,000 (Safe Finish)";
        if (badgeEl) {
          badgeEl.innerHTML = (rank <= 1000)
            ? `<span class="radar-zone-pill radar-zone-elite">🟣 ELITE TOP 1,000 (Rank #${rank.toLocaleString()})</span>`
            : `<span class="radar-zone-pill radar-zone-safe">🟢 SAFE IN TOP 10,000 (Rank #${rank.toLocaleString()})</span>`;
        }
        if (subEl) subEl.textContent = `Top 10k Finish Badge Secured!`;
      } else {
        const needed = cutoff - trophies;
        rank = Math.round(10000 + (needed * 42));
        const wins = Math.ceil(needed / 30);
        if (neededEl) {
          neededEl.style.color = "var(--gold)";
          neededEl.textContent = `+${needed} 🏆`;
        }
        if (winsEl) winsEl.textContent = `~${wins} Straight Wins Required (+30🏆/win)`;
        if (badgeEl) {
          if (needed <= 100) {
            badgeEl.innerHTML = `<span class="radar-zone-pill radar-zone-bubble">🟡 BUBBLE ZONE (Rank #${rank.toLocaleString()})</span>`;
            if (subEl) subEl.textContent = "Striking distance to Top 10k badge!";
          } else {
            badgeEl.innerHTML = `<span class="radar-zone-pill radar-zone-danger">🔴 CLIMBING (Rank #${rank.toLocaleString()})</span>`;
            if (subEl) subEl.textContent = `Needs ${needed} more trophies to qualify`;
          }
        }
      }

      if (rankEl) rankEl.textContent = `#${rank.toLocaleString()}`;
      if (tierEl) tierEl.textContent = tier;

      const pct = Math.min(100, Math.max(10, ((trophies - 1800) / (3000 - 1800)) * 100));
      if (barFill) barFill.style.width = `${pct.toFixed(1)}%`;
      if (pctText) pctText.textContent = `${((trophies / cutoff) * 100).toFixed(1)}% of Top 10k Threshold`;
    };

    this.updateRadarLive = updateRadar;

    if (input) {
      input.addEventListener("input", (e) => updateRadar(e.target.value));
    }
    if (slider) {
      slider.addEventListener("input", (e) => updateRadar(e.target.value));
    }
    presetBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        WebAudioFX.playClick();
        presetBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        updateRadar(btn.getAttribute("data-val"));
      });
    });
    if (loadMyTagBtn) {
      loadMyTagBtn.addEventListener("click", () => {
        WebAudioFX.playSuccess();
        let live2v2 = 2216;
        if (this.activePlayer && this.activePlayer.progress) {
          for (const k in this.activePlayer.progress) {
            if (k.toLowerCase().includes("2v2")) {
              const prog = this.activePlayer.progress[k];
              if (prog && typeof prog.trophies === "number") live2v2 = prog.trophies;
            }
          }
        }
        updateRadar(live2v2);
        this.showToast(`👑 Synced Muk's Live 2v2 Rating: ${live2v2.toLocaleString()} 🏆`);
      });
    }

    // Initialize with player's real telemetry
    let init2v2 = 2216;
    if (this.activePlayer && this.activePlayer.progress) {
      for (const k in this.activePlayer.progress) {
        if (k.toLowerCase().includes("2v2")) {
          const prog = this.activePlayer.progress[k];
          if (prog && typeof prog.trophies === "number") init2v2 = prog.trophies;
        }
      }
    }
    updateRadar(init2v2);
  },

  // --- 13. DECK RECALL MINIGAME CONTROLLER ---
  setupDeckRecallMinigame: function() {
    let recallSeconds = 5;
    let recallTargetDeck = [];
    let recallPicked = [];
    let recallTimer = null;
    let recallStartTime = null;

    const diffBtns = document.querySelectorAll(".recall-diff-btn");
    diffBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        WebAudioFX.playClick();
        diffBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        recallSeconds = parseInt(btn.getAttribute("data-sec"), 10) || 5;
      });
    });

    const startBtn = document.getElementById("btn-start-recall");
    const statusBanner = document.getElementById("recall-status-banner");
    const timerWrap = document.getElementById("recall-timer-bar-wrap");
    const timerNum = document.getElementById("recall-timer-num");
    const timerProgress = document.getElementById("recall-timer-progress");
    const slotsGrid = document.getElementById("recall-slots-grid");
    const pickerContainer = document.getElementById("recall-picker-container");
    const trayGrid = document.getElementById("recall-card-tray");
    const scoreCounter = document.getElementById("recall-score-counter");
    const resultsBox = document.getElementById("recall-results-box");
    const replayBtn = document.getElementById("btn-replay-recall");

    const renderEmptySlots = () => {
      if (!slotsGrid) return;
      slotsGrid.innerHTML = "";
      for (let i = 0; i < 8; i++) {
        const slot = document.createElement("div");
        slot.className = "recall-slot";
        slot.innerHTML = `<span>?</span>`;
        slotsGrid.appendChild(slot);
      }
    };
    renderEmptySlots();

    const startChallenge = () => {
      clearInterval(recallTimer);
      recallPicked = [];
      if (resultsBox) resultsBox.style.display = "none";
      if (pickerContainer) pickerContainer.style.display = "none";
      WebAudioFX.playCardLock();

      const cardsPool = (typeof CLASH_CARDS !== "undefined" ? CLASH_CARDS : []).filter(c => c.type !== "tower-troop");
      const shuffled = [...cardsPool].sort(() => 0.5 - Math.random());
      recallTargetDeck = shuffled.slice(0, 8);

      if (slotsGrid) {
        slotsGrid.innerHTML = "";
        recallTargetDeck.forEach(c => {
          const slot = document.createElement("div");
          slot.className = "recall-slot filled";
          slot.innerHTML = `
            <img src="${c.icon}" alt="${c.name}">
            <div style="position: absolute; bottom: 2px; left: 0; right: 0; font-size: 0.6rem; font-weight: 800; background: rgba(0,0,0,0.7); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 1px 2px;">${c.name}</div>
          `;
          slotsGrid.appendChild(slot);
        });
      }

      if (statusBanner) {
        statusBanner.textContent = `MEMORIZE THESE 8 CARDS! (${recallSeconds}s remaining)`;
        statusBanner.style.color = "var(--gold)";
      }

      if (timerWrap) timerWrap.style.display = "block";
      if (timerNum) timerNum.textContent = `${recallSeconds}s`;
      if (timerProgress) {
        timerProgress.style.width = "100%";
        timerProgress.style.transition = `width ${recallSeconds}s linear`;
        setTimeout(() => { timerProgress.style.width = "0%"; }, 50);
      }

      let timeLeft = recallSeconds;
      recallTimer = setInterval(() => {
        timeLeft--;
        if (timerNum) timerNum.textContent = `${timeLeft}s`;
        WebAudioFX.playTone(600, "sine", 0.04, 0.05);

        if (timeLeft <= 0) {
          clearInterval(recallTimer);
          hideAndStartPicking();
        }
      }, 1000);
    };

    const hideAndStartPicking = () => {
      WebAudioFX.playHeroAura();
      if (timerWrap) timerWrap.style.display = "none";
      if (statusBanner) {
        statusBanner.textContent = "REBUILD THE DECK FROM MEMORY!";
        statusBanner.style.color = "var(--cyan)";
      }

      renderEmptySlots();
      if (pickerContainer) pickerContainer.style.display = "block";
      if (scoreCounter) scoreCounter.textContent = `0 / 8 Picked`;
      recallStartTime = Date.now();

      const cardsPool = (typeof CLASH_CARDS !== "undefined" ? CLASH_CARDS : []).filter(c => c.type !== "tower-troop");
      const decoys = [...cardsPool].filter(c => !recallTargetDeck.some(t => t.id === c.id)).sort(() => 0.5 - Math.random()).slice(0, 16);
      const trayCards = [...recallTargetDeck, ...decoys].sort(() => 0.5 - Math.random());

      if (trayGrid) {
        trayGrid.innerHTML = "";
        trayCards.forEach(c => {
          const cardEl = document.createElement("div");
          cardEl.className = "recall-tray-card";
          cardEl.innerHTML = `
            <img src="${c.icon}" style="width: 100%; aspect-ratio: 3/4; object-fit: contain;">
            <div style="font-size: 0.62rem; color: #fff; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</div>
          `;

          cardEl.addEventListener("click", () => {
            if (cardEl.classList.contains("picked")) return;

            const isCorrect = recallTargetDeck.some(t => t.id === c.id);
            if (isCorrect) {
              WebAudioFX.playClick();
              cardEl.classList.add("picked");
              recallPicked.push(c);

              const slotIdx = recallPicked.length - 1;
              if (slotsGrid && slotsGrid.children[slotIdx]) {
                const s = slotsGrid.children[slotIdx];
                s.className = "recall-slot filled";
                s.innerHTML = `
                  <img src="${c.icon}" alt="${c.name}">
                  <div style="position: absolute; bottom: 2px; left: 0; right: 0; font-size: 0.6rem; font-weight: 800; background: rgba(0,0,0,0.7); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${c.name}</div>
                `;
              }

              if (scoreCounter) scoreCounter.textContent = `${recallPicked.length} / 8 Picked`;

              if (recallPicked.length === 8) {
                const elapsed = ((Date.now() - recallStartTime) / 1000).toFixed(1);
                WebAudioFX.playSuccess();
                if (statusBanner) statusBanner.textContent = "🏆 ALL 8 CARDS RECALLED PERFECTLY!";
                if (resultsBox) {
                  resultsBox.style.display = "block";
                  const title = document.getElementById("recall-res-title");
                  const desc = document.getElementById("recall-res-desc");
                  if (title) title.textContent = "🏆 PERFECT 8/8 RECALL!";
                  if (desc) desc.textContent = `You recalled the complete 8-card competitive deck in ${elapsed} seconds on ${recallSeconds}s difficulty!`;
                }
              }
            } else {
              WebAudioFX.playTone(180, "sawtooth", 0.15, 0.08);
              cardEl.style.borderColor = "var(--loss)";
              setTimeout(() => { cardEl.style.borderColor = "var(--border-subtle)"; }, 400);
            }
          });

          trayGrid.appendChild(cardEl);
        });
      }
    };

    if (startBtn) startBtn.addEventListener("click", startChallenge);
    if (replayBtn) replayBtn.addEventListener("click", startChallenge);
  }
};

// Initialize App when DOM is loaded
document.addEventListener("DOMContentLoaded", () => App.init());

// ============================================================
// NEXUS ROYALE TV — Curated Video Engine
// ============================================================
const NR_VIDEOS = [
  // ── Meta Decks ──────────────────────────────────────────────
  { id: "rEHFbf5DVKQ", title: "Best Meta Decks Sept 2026 — Season 87 Tier List", channel: "Surgical Goblin", cat: "meta", thumb: "https://img.youtube.com/vi/rEHFbf5DVKQ/mqdefault.jpg" },
  { id: "3MNGNqbXqZI", title: "HERO ICE WIZARD Is BROKEN — Full Guide 2026", channel: "Morten", cat: "meta", thumb: "https://img.youtube.com/vi/3MNGNqbXqZI/mqdefault.jpg" },
  { id: "OlYdOqyeVUE", title: "Top 5 Decks for Ladder — No Skill Needed", channel: "PropenYT", cat: "meta", thumb: "https://img.youtube.com/vi/OlYdOqyeVUE/mqdefault.jpg" },
  { id: "Xt67JUU03U8", title: "Goblin Giant Sparky Destroys Everyone Right Now", channel: "SirTagCR", cat: "meta", thumb: "https://img.youtube.com/vi/Xt67JUU03U8/mqdefault.jpg" },
  { id: "dYSQ1NF1hvw", title: "Lava Hound Balloon — BEST AIR DECK Season 87", channel: "Clash with Ash", cat: "meta", thumb: "https://img.youtube.com/vi/dYSQ1NF1hvw/mqdefault.jpg" },
  // ── Guides ──────────────────────────────────────────────────
  { id: "hFbU-aBLHJg", title: "How to Get to Legendary Arena — Complete F2P Guide", channel: "Orange Juice Gaming", cat: "guide", thumb: "https://img.youtube.com/vi/hFbU-aBLHJg/mqdefault.jpg" },
  { id: "b7aZy1Z_VtU", title: "Mastering Elixir Management — Pro Tips", channel: "Surgical Goblin", cat: "guide", thumb: "https://img.youtube.com/vi/b7aZy1Z_VtU/mqdefault.jpg" },
  { id: "qz-IfCUHOFo", title: "Ultimate 2v2 Guide — Win Every Match", channel: "Morten", cat: "guide", thumb: "https://img.youtube.com/vi/qz-IfCUHOFo/mqdefault.jpg" },
  { id: "V8cOLRg44aU", title: "How to Counter Every Meta Deck — Cheat Sheet", channel: "CWA", cat: "guide", thumb: "https://img.youtube.com/vi/V8cOLRg44aU/mqdefault.jpg" },
  { id: "WQkB6STTWTA", title: "Evolution Cards Explained — Everything You Need to Know", channel: "Clash Royale (Official)", cat: "guide", thumb: "https://img.youtube.com/vi/WQkB6STTWTA/mqdefault.jpg" },
  // ── Tournaments ─────────────────────────────────────────────
  { id: "YX0DFrAHFB0", title: "CRL World Finals 2026 — Full Match Highlights", channel: "Clash Royale Esports", cat: "tournament", thumb: "https://img.youtube.com/vi/YX0DFrAHFB0/mqdefault.jpg" },
  { id: "kJECto7LMNY", title: "$100,000 Crown Championship — Top 8 Matches", channel: "Clash Royale", cat: "tournament", thumb: "https://img.youtube.com/vi/kJECto7LMNY/mqdefault.jpg" },
  { id: "Hn_VnD8C9Gw", title: "Clash Royale Pro League S87 — Best Plays Compilation", channel: "Clash Royale Esports", cat: "tournament", thumb: "https://img.youtube.com/vi/Hn_VnD8C9Gw/mqdefault.jpg" },
  // ── Fun ─────────────────────────────────────────────────────
  { id: "GNl8H3G3u5k", title: "Using ONLY Heroes for 24 Hours — What Happened?", channel: "Orange Juice Gaming", cat: "fun", thumb: "https://img.youtube.com/vi/GNl8H3G3u5k/mqdefault.jpg" },
  { id: "bKpDYxEIiJ4", title: "The Most Broken Spell Deck You've Never Tried", channel: "Jxhn", cat: "fun", thumb: "https://img.youtube.com/vi/bKpDYxEIiJ4/mqdefault.jpg" },
  { id: "3RWs_0HRQQQ", title: "Lowest Elixir Deck Possible — Can It Win?", channel: "PropenYT", cat: "fun", thumb: "https://img.youtube.com/vi/3RWs_0HRQQQ/mqdefault.jpg" },
];

(function initVideos() {
  let activeFilter = "all";
  let activeVideo  = null;  // currently expanded iframe

  function buildCard(v) {
    const div = document.createElement("div");
    div.className = "video-card";
    div.dataset.cat = v.cat;
    div.style.cssText = `
      background: rgba(13,18,31,0.95);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
      transition: border-color 0.2s, transform 0.2s;
      display: flex;
      flex-direction: column;
    `;
    div.innerHTML = `
      <div class="vc-thumb" style="position:relative; background:#000; aspect-ratio:16/9; overflow:hidden;">
        <img src="${v.thumb}" alt="${v.title}" loading="lazy"
          style="width:100%;height:100%;object-fit:cover;display:block;"
          onerror="this.style.opacity='0.3'">
        <div class="vc-play" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.35);">
          <div style="width:48px;height:48px;background:rgba(255,0,0,0.9);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">▶</div>
        </div>
      </div>
      <div style="padding:0.85rem;">
        <div style="font-size:0.84rem;font-weight:700;color:#fff;margin-bottom:0.3rem;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${v.title}</div>
        <div style="font-size:0.73rem;color:var(--text-muted);">📺 ${v.channel}</div>
      </div>
    `;
    div.addEventListener("click", () => expandVideo(div, v));
    div.addEventListener("mouseenter", () => { div.style.borderColor = "rgba(0,200,220,0.5)"; div.style.transform = "translateY(-2px)"; });
    div.addEventListener("mouseleave", () => { div.style.borderColor = "rgba(255,255,255,0.08)"; div.style.transform = ""; });
    return div;
  }

  function expandVideo(div, v) {
    // collapse any open iframe
    if (activeVideo && activeVideo !== div) {
      const old = activeVideo.querySelector(".vc-embed");
      if (old) old.remove();
      const oldPlay = activeVideo.querySelector(".vc-play");
      if (oldPlay) oldPlay.style.display = "flex";
    }
    activeVideo = div;
    const existing = div.querySelector(".vc-embed");
    if (existing) { existing.remove(); activeVideo = null; const p = div.querySelector(".vc-play"); if (p) p.style.display = "flex"; return; }
    const thumbDiv = div.querySelector(".vc-thumb");
    const playBtn  = div.querySelector(".vc-play");
    if (playBtn) playBtn.style.display = "none";
    const iframe = document.createElement("iframe");
    iframe.className = "vc-embed";
    iframe.setAttribute("src", `https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`);
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
    iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:none;";
    thumbDiv.appendChild(iframe);
    div.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  App.renderVideos = function(filter) {
    activeFilter = filter || "all";
    const grid = document.getElementById("videos-grid");
    if (!grid) return;
    grid.innerHTML = "";

    // update filter buttons
    document.querySelectorAll("#video-filters .filter-btn-hero").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.vcat === activeFilter);
    });

    const filtered = activeFilter === "all" ? NR_VIDEOS : NR_VIDEOS.filter(v => v.cat === activeFilter);
    filtered.forEach(v => grid.appendChild(buildCard(v)));
  };

  // wire category filter buttons
  document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", e => {
      const btn = e.target.closest("#video-filters .filter-btn-hero");
      if (btn) {
        App.renderVideos(btn.dataset.vcat);
      }
    });
    const loadMore = document.getElementById("btn-load-more-videos");
    if (loadMore) {
      loadMore.addEventListener("click", () => {
        App.showToast("🎬 All available videos are loaded — more coming soon!");
      });
    }
  });
})();

// ============================================================
// NEXUS ROYALE — Compliance, Legal & Privacy Suite
// ============================================================
(function initLegalModal() {
  const modal = document.getElementById("legal-modal-overlay");
  const contentEl = document.getElementById("legal-modal-content");
  const closeBtn = document.getElementById("btn-close-legal-modal");
  if (!modal || !contentEl) return;

  const POLICIES = {
    privacy: `
      <h3 style="color:#fff;font-size:1.2rem;margin-bottom:0.75rem;">Privacy Policy</h3>
      <p style="margin-bottom:0.75rem;"><small style="color:var(--cyan);">Last Updated: September 18, 2026</small></p>
      <p style="margin-bottom:0.75rem;">At Nexus Royale (<strong>https://nexusroyale.online</strong>), we value your privacy. This policy explains what data we collect, how it is processed, and your rights.</p>
      
      <h4 style="color:var(--gold);margin-top:1rem;margin-bottom:0.4rem;">1. Data We Collect</h4>
      <p style="margin-bottom:0.75rem;">We do not require account registration or passwords. When you query player profiles, battle telemetry, or clan data, our servers query public endpoints of the Supercell Clash Royale API. We may store anonymized analytics regarding feature usage and general traffic patterns.</p>

      <h4 style="color:var(--gold);margin-top:1rem;margin-bottom:0.4rem;">2. Advertising & Cookies (Ezoic & Google AdSense)</h4>
      <p style="margin-bottom:0.75rem;">This site uses <strong>Ezoic Inc.</strong> and its monetization partners, including <strong>Google Ad Multiple Customer Management (MCM)</strong>. Ezoic and its partners use technologies such as cookies, web beacons, and device identifiers to personalize advertisements, measure performance, and deliver programmatic advertising. You can review Ezoic's detailed privacy disclosures or adjust your consent preferences at any time through our on-site Gatekeeper Consent CMP.</p>

      <h4 style="color:var(--gold);margin-top:1rem;margin-bottom:0.4rem;">3. Google Analytics 4</h4>
      <p style="margin-bottom:0.75rem;">We utilize Google Analytics 4 (GA4) to understand audience traffic, device categories, and page interactions. GA4 collects anonymized IP addresses and telemetry. You can opt out via Google's Ads Settings or browser opt-out add-ons.</p>

      <h4 style="color:var(--gold);margin-top:1rem;margin-bottom:0.4rem;">4. GDPR & CCPA Rights</h4>
      <p style="margin-bottom:0.75rem;">Visitors from the European Economic Area (EEA), UK, and California have statutory rights to access, rectify, or delete personal data, or object to data processing. Contact us at <strong>nexusroyaleonline@gmail.com</strong> with any inquiries.</p>
    `,
    terms: `
      <h3 style="color:#fff;font-size:1.2rem;margin-bottom:0.75rem;">Terms of Service</h3>
      <p style="margin-bottom:0.75rem;"><small style="color:var(--cyan);">Effective Date: September 18, 2026</small></p>

      <h4 style="color:var(--gold);margin-top:1rem;margin-bottom:0.4rem;">1. Permitted Use</h4>
      <p style="margin-bottom:0.75rem;">Nexus Royale is a free, fan-developed competitive intelligence and esports dashboard for players of Clash Royale. It is intended solely for personal, non-commercial entertainment and training purposes.</p>

      <h4 style="color:var(--gold);margin-top:1rem;margin-bottom:0.4rem;">2. Supercell Fan Content Disclaimer</h4>
      <p style="margin-bottom:0.75rem;">This material is unofficial and is not endorsed by Supercell. For more information see Supercell's Fan Content Policy: <a href="https://supercell.com/en/fan-content-policy/" target="_blank" rel="noopener" style="color:var(--cyan);">https://supercell.com/en/fan-content-policy/</a>. Clash Royale, its logos, cards, and game assets are trademarks of Supercell Oy.</p>

      <h4 style="color:var(--gold);margin-top:1rem;margin-bottom:0.4rem;">3. Limitation of Liability</h4>
      <p style="margin-bottom:0.75rem;">Nexus Royale provides telemetry and simulator data on an "as-is" and "as-available" basis without warranties of any kind. We are not liable for any discrepancies with in-game servers or balance patches.</p>
    `,
    about: `
      <h3 style="color:#fff;font-size:1.2rem;margin-bottom:0.75rem;">About Nexus Royale</h3>
      <p style="margin-bottom:0.75rem;">Nexus Royale was created to deliver ultra-fast, live Clash Royale telemetry, official 2026 Heroes system intelligence, 2v2 League rankings, and one-tap in-game deck export for mobile and desktop players worldwide.</p>

      <h4 style="color:var(--gold);margin-top:1rem;margin-bottom:0.4rem;">Creator Support & Community</h4>
      <p style="margin-bottom:0.75rem;">Support free updates by using Creator Code <strong>NEXUS</strong> in the Clash Royale shop.</p>

      <h4 style="color:var(--gold);margin-top:1rem;margin-bottom:0.4rem;">Contact & Inquiries</h4>
      <p style="margin-bottom:0.75rem;">Business inquiries, creator deck features, or bug reports:</p>
      <p style="margin-bottom:0.35rem;">✉️ Email: <a href="mailto:nexusroyaleonline@gmail.com" style="color:var(--cyan);">nexusroyaleonline@gmail.com</a></p>
      <p style="margin-bottom:0.35rem;">📸 Instagram: <a href="https://instagram.com/nexusroyale.online" target="_blank" rel="noopener" style="color:#f43f5e;">@nexusroyale.online</a></p>
      <p style="margin-bottom:0.35rem;">🌐 Web: <a href="https://nexusroyale.online" style="color:var(--cyan);">nexusroyale.online</a></p>
    `
  };

  function openPolicy(type) {
    contentEl.innerHTML = POLICIES[type] || POLICIES.privacy;
    document.querySelectorAll("#legal-modal-tabs button").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.legal === type);
    });
    modal.style.display = "flex";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const privacyLink = document.getElementById("link-open-privacy");
    const termsLink = document.getElementById("link-open-terms");
    const aboutLink = document.getElementById("link-open-about");

    if (privacyLink) privacyLink.addEventListener("click", (e) => { e.preventDefault(); openPolicy("privacy"); });
    if (termsLink) termsLink.addEventListener("click", (e) => { e.preventDefault(); openPolicy("terms"); });
    if (aboutLink) aboutLink.addEventListener("click", (e) => { e.preventDefault(); openPolicy("about"); });

    document.querySelectorAll("#legal-modal-tabs button").forEach(btn => {
      btn.addEventListener("click", () => openPolicy(btn.dataset.legal));
    });

    if (closeBtn) closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
  });
})();

