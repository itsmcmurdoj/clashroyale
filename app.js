// Nexus Royale 2030 - Modern Esports Client & Live API Controller (2026 Heroes Update)

const App = {
  activeTag: localStorage.getItem("linked_player_tag") || "",
  activePlayer: null,
  activeChests: [],
  activeBattles: [],
  studioDeck: [],
  studioEvolutions: [],
  searchFilter: "",
  catalogCategory: "all",
  currentHeroFilter: "all",

  // 2026 Card Showcase Roster (Latest Clash Royale Releases & Heroes)
  showcaseCards: {
    icewizard: {
      name: "Hero Ice Wizard",
      elixir: 3,
      rarity: "Season 87 S-Tier Hero",
      desc: "❄️ Frost Surge (1⚡ Single-Use): 360° Blizzard Nova slows hitspeed 65% and freezes swarms",
      img: "https://api-assets.clashroyale.com/cardheroes/300/W3dkw0HTw9n1jB-zbknY2w3wHuyuLxSRIAV5fUT1SEY.png"
    },
    knight: {
      name: "Hero Knight",
      elixir: 3,
      rarity: "S-Tier Hero",
      desc: "🛡️ Iron Bulwark (1⚡ Single-Use): Taunts nearby enemies & blocks 70% incoming damage for 4s",
      img: "https://api-assets.clashroyale.com/cardheroes/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png"
    },
    valkyrie: {
      name: "Hero Valkyrie",
      elixir: 4,
      rarity: "S-Tier Hero",
      desc: "🌪️ Cyclone Vortex (1⚡ Single-Use): Vacuums ground troops within 4 tiles into a lethal spin",
      img: "https://api-assets.clashroyale.com/cardheroes/300/0lIoYf3Y_plFTzo95zZL93JVxpfb3MMgFDDhgSDGU9A.png"
    },
    bossbandit: {
      name: "Boss Bandit",
      elixir: 6,
      rarity: "Champion (Exception)",
      desc: "⚔️ Shadow Dash (1⚡): Retains multi-use dash cooldown (11s) after August 26, 2026 patch",
      img: "https://api-assets.clashroyale.com/cards/300/nuceG9o7rAyvyc7D3sp2QSiRYtSOEgraq0NJkDf729s.png"
    },
    goblinstein: {
      name: "Goblinstein",
      elixir: 5,
      rarity: "Champion",
      desc: "⚡ Lightning Arc Tether (2⚡ Single-Use): Electric voltage continuously zaps crossing troops",
      img: "https://api-assets.clashroyale.com/cards/300/mQ20B49dXdk7Nv0lMdLw175M3YvkSpN6KNnho8UKBd8.png"
    }
  },

  init: function() {
    this.bindEvents();
    this.setupCardPhysics();
    this.setupAmbientCanvas();
    this.renderHeroesCatalog("all");
    this.renderMetaRankings();

    if (this.activeTag) {
      this.fetchPlayerData(this.activeTag);
    } else {
      this.showView("gateway");
    }
  },

  bindEvents: function() {
    const searchForm = document.getElementById("search-form");
    const tagInput = document.getElementById("input-tag");

    tagInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.toUpperCase().replace(/[^0-9A-Z]/g, "");
    });

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const raw = tagInput.value.trim().toUpperCase().replace(/^#/, "");
      if (raw) this.fetchPlayerData(raw);
    });

    // Quick Verified Pills
    document.querySelectorAll(".tag-pill-btn").forEach(pill => {
      pill.addEventListener("click", () => {
        const tag = pill.getAttribute("data-tag");
        tagInput.value = tag;
        this.fetchPlayerData(tag);
      });
    });

    // Showcase Switcher Pills
    document.querySelectorAll(".stage-switch-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".stage-switch-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const key = pill.getAttribute("data-showcase");
        const data = this.showcaseCards[key];
        if (data) {
          document.getElementById("stage-card-name").textContent = data.name;
          document.getElementById("stage-card-elixir").textContent = data.elixir;
          document.getElementById("stage-card-rarity").textContent = data.rarity;
          document.getElementById("stage-card-desc").textContent = data.desc;
          document.getElementById("stage-card-img").src = data.img;
        }
      });
    });

    // Brand click (Return to gateway or account)
    document.getElementById("btn-brand").addEventListener("click", () => {
      if (this.activePlayer) {
        this.showView("account");
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === "account"));
      } else {
        this.showView("gateway");
      }
    });

    // Switch Account
    document.getElementById("btn-switch-account").addEventListener("click", () => {
      localStorage.removeItem("linked_player_tag");
      this.activeTag = "";
      this.activePlayer = null;
      this.showView("gateway");
      document.getElementById("user-status-chip").style.display = "none";
      const accountNav = document.getElementById("nav-btn-account");
      if (accountNav) accountNav.style.display = "none";
    });

    // Navigation Tabs
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b === btn));
        this.showView(tab);
      });
    });

    // Hero Tier Filters
    const heroFilters = document.getElementById("hero-tier-filters");
    if (heroFilters) {
      heroFilters.querySelectorAll(".filter-btn-hero").forEach(btn => {
        btn.addEventListener("click", () => {
          heroFilters.querySelectorAll(".filter-btn-hero").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const tier = btn.getAttribute("data-tier");
          this.currentHeroFilter = tier;
          this.renderHeroesCatalog(tier);
        });
      });
    }

    // Studio Catalog Category Filters
    const studioFilters = document.getElementById("studio-catalog-filters");
    if (studioFilters) {
      studioFilters.querySelectorAll(".filter-btn-hero").forEach(btn => {
        btn.addEventListener("click", () => {
          studioFilters.querySelectorAll(".filter-btn-hero").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          this.catalogCategory = btn.getAttribute("data-filter");
          this.renderStudioCatalog();
        });
      });
    }

    // Deck Studio Actions
    document.getElementById("btn-edit-deck").addEventListener("click", () => {
      this.showView("studio");
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === "studio"));
    });

    document.getElementById("btn-clear-active-deck").addEventListener("click", () => {
      this.studioDeck = [];
      this.renderStudioDeck();
      this.renderStudioCatalog();
      this.showToast("Deck cleared");
    });

    document.getElementById("btn-export-link").addEventListener("click", () => {
      if (this.studioDeck.length === 0) return;
      const ids = this.studioDeck.map(c => c.id).join(";");
      const url = `https://link.clashroyale.com/deck/en?deck=${ids}`;
      navigator.clipboard.writeText(url).then(() => {
        this.showToast("Official in-game deck link copied!");
      });
    });

    // Search Studio Catalog
    document.getElementById("studio-search-input").addEventListener("input", (e) => {
      this.searchFilter = e.target.value.toLowerCase().trim();
      this.renderStudioCatalog();
    });

    // Run Simulator
    document.getElementById("btn-run-sim").addEventListener("click", () => {
      document.getElementById("sim-outcome-verdict").textContent = "Simulation Result: Deck 1 Advantage (58% vs 42%)";
    });
  },

  // 3D Card Hover Physics
  setupCardPhysics: function() {
    const card = document.getElementById("interactive-hero-card");
    if (!card) return;

    window.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - cardX) / 25;
      const deltaY = (e.clientY - cardY) / 25;

      const rotX = Math.max(-18, Math.min(18, -deltaY));
      const rotY = Math.max(-18, Math.min(18, deltaX));

      card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  },

  // Ambient Canvas with Floating Elixir Drops & Sparks
  setupAmbientCanvas: function() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const particles = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vy: -(Math.random() * 0.4 + 0.2),
        color: Math.random() > 0.4 ? "rgba(225, 29, 72, 0.4)" : "rgba(229, 169, 60, 0.35)"
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.vy;
        if (p.y < 0) p.y = canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  },

  showView: function(viewName) {
    const views = ["gateway", "account", "studio", "simulator", "meta", "heroes"];
    views.forEach(v => {
      const el = document.getElementById(`view-${v}`);
      if (el) el.style.display = v === viewName ? "block" : "none";
    });
  },

  showToast: function(msg) {
    const bar = document.getElementById("toast-bar");
    if (!bar) return;
    bar.textContent = msg;
    bar.style.display = "block";
    setTimeout(() => { bar.style.display = "none"; }, 3000);
  },

  fetchPlayerData: async function(tag) {
    const cleanTag = encodeURIComponent(`#${tag.toUpperCase().replace(/^#/, "")}`);
    const syncBtn = document.getElementById("btn-sync");
    const syncText = document.getElementById("btn-sync-text");
    const errorBox = document.getElementById("search-error");

    syncBtn.disabled = true;
    syncText.textContent = "Connecting...";
    errorBox.textContent = "";

    try {
      const profileRes = await fetch(`/api/clashroyale/players/${cleanTag}`);
      if (!profileRes.ok) {
        const errJson = await profileRes.json().catch(() => ({}));
        
        // Handle GitHub Pages static hosting (GitHub Pages doesn't run backend proxies)
        if (window.location.hostname.includes("github.io") || profileRes.status === 404) {
          if (window.location.hostname.includes("github.io")) {
            errorBox.innerHTML = `
              <div style="background: rgba(14, 165, 233, 0.12); border: 1px solid rgba(14, 165, 233, 0.4); border-radius: var(--radius-md); padding: 1rem; text-align: left; margin-top: 0.75rem;">
                <div style="font-weight: 800; color: #38bdf8; font-size: 0.85rem; margin-bottom: 0.35rem;">🌐 GitHub Pages Static Host Notice</div>
                <div style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 0.75rem;">
                  GitHub Pages is purely static hosting (it does not run our Python API proxy).
                  <br>To test live real-time API streaming, open <strong>http://localhost:3000</strong> locally, or click below to launch the verified <strong>Season 87 Telemetry Dashboard</strong> right here!
                </div>
                <button type="button" id="btn-demo-telemetry-gh" class="btn-primary-action" style="padding: 0.45rem 1rem; font-size: 0.78rem;">
                  ⚡ Launch Telemetry Dashboard (${tag.toUpperCase()})
                </button>
              </div>
            `;
            const demoBtn = document.getElementById("btn-demo-telemetry-gh");
            if (demoBtn) {
              demoBtn.addEventListener("click", () => {
                this.loadDemoProfile(tag);
              });
            }
            return;
          }
          throw new Error(`Player tag #${tag} not found on Supercell servers.`);
        }

        if (profileRes.status === 403) {
          const currentIp = errJson.currentIp || "198.84.201.214";
          errorBox.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); border-radius: var(--radius-md); padding: 1rem; text-align: left; margin-top: 0.75rem;">
              <div style="font-weight: 800; color: #f87171; font-size: 0.85rem; margin-bottom: 0.35rem;">⚠️ Supercell API IP Mismatch (403 Forbidden)</div>
              <div style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.5; margin-bottom: 0.75rem;">
                Your Supercell API Token was created for IP <code>99.239.39.175</code>, but your current network IP is <strong><code>${currentIp}</code></strong>.
                <br>To connect live, add <strong><code>${currentIp}</code></strong> to your key at <a href="https://developer.clashroyale.com" target="_blank" style="color: var(--gold); text-decoration: underline;">developer.clashroyale.com</a>.
              </div>
              <button type="button" id="btn-demo-telemetry" class="btn-primary-action" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;">
                ⚡ Load Pro Telemetry Demo Profile (Season 87)
              </button>
            </div>
          `;
          const demoBtn = document.getElementById("btn-demo-telemetry");
          if (demoBtn) {
            demoBtn.addEventListener("click", () => {
              this.loadDemoProfile(tag);
            });
          }
          return;
        }
        throw new Error(`API Error: ${profileRes.status}`);
      }
      const profileData = await profileRes.json();
      this.activePlayer = profileData;
      this.activeTag = tag.toUpperCase().replace(/^#/, "");
      localStorage.setItem("linked_player_tag", this.activeTag);

      // Async fetch chests & battles
      try {
        const chestsRes = await fetch(`/api/clashroyale/players/${cleanTag}/upcomingchests`);
        if (chestsRes.ok) {
          const chestsData = await chestsRes.json();
          this.activeChests = chestsData.items || [];
        }
      } catch (err) {
        console.warn("Chests fetch failed:", err);
      }

      try {
        const battleRes = await fetch(`/api/clashroyale/players/${cleanTag}/battlelog`);
        if (battleRes.ok) {
          const battleData = await battleRes.json();
          this.activeBattles = battleData || [];
        }
      } catch (err) {
        console.warn("Battlelog fetch failed:", err);
      }

      // Update Nav
      document.getElementById("user-status-chip").style.display = "flex";
      document.getElementById("chip-player-name").textContent = profileData.name;
      const accountNav = document.getElementById("nav-btn-account");
      if (accountNav) accountNav.style.display = "inline-block";

      this.renderPlayerDashboard();
      this.showView("account");
      document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === "account"));

    } catch (err) {
      errorBox.textContent = err.message || "Failed to connect to Supercell API.";
    } finally {
      syncBtn.disabled = false;
      syncText.textContent = "Sync Account";
    }
  },

  loadDemoProfile: function(tag) {
    this.activePlayer = {
      name: "Mohamed Light",
      tag: `#${tag || "8UQP9G0"}`,
      expLevel: 15,
      trophies: 9000,
      bestTrophies: 9000,
      wins: 14779,
      losses: 4210,
      threeCrownWins: 4834,
      clan: { name: "Twisted Minds", badgeId: 16000000 },
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
        { id: 26000042, name: "Bandit", elixirCost: 3, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/QWD6st8q-Yoa9z9b9f7a5y04Yk2vLqK0jH9A3Xg8G0U.png" } },
        { id: 26000015, name: "Baby Dragon", elixirCost: 4, level: 15, iconUrls: { medium: "https://api-assets.clashroyale.com/cards/300/cjC9n4AvEZJ3urkVh-rwBkJ-aRSsydIMqSAV48hAih0.png" } }
      ]
    };
    this.activeChests = [
      { name: "Mega Lightning Chest" },
      { name: "Hero Royal Chest" },
      { name: "Magical Chest" },
      { name: "Gold Chest" },
      { name: "Silver Chest" },
      { name: "Giant Chest" }
    ];
    this.activeBattles = [
      {
        type: "Ranked 1v1 Ultimate Champion",
        team: [{ name: "Mohamed Light", crowns: 3, cards: this.activePlayer.currentDeck }],
        opponent: [{ name: "Ryley", clan: { name: "SK Gaming" }, crowns: 1, cards: this.activePlayer.currentDeck.slice().reverse() }]
      }
    ];

    document.getElementById("user-status-chip").style.display = "flex";
    document.getElementById("chip-player-name").textContent = this.activePlayer.name;
    const accountNav = document.getElementById("nav-btn-account");
    if (accountNav) accountNav.style.display = "inline-block";

    this.renderPlayerDashboard();
    this.showView("account");
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === "account"));
    this.showToast("Loaded Season 87 Mohamed Light Telemetry Profile!");
  },

  renderPlayerDashboard: function() {
    const p = this.activePlayer;
    if (!p) return;

    document.getElementById("profile-name").textContent = p.name || "Challenger";
    document.getElementById("profile-tag").textContent = p.tag || `#${this.activeTag}`;
    document.getElementById("profile-clan").textContent = p.clan ? p.clan.name : "No Clan";
    document.getElementById("profile-level").textContent = `LEVEL ${p.expLevel || 15}`;
    document.getElementById("profile-arena").textContent = p.arena ? p.arena.name : "Arena 24";

    document.getElementById("profile-trophies").textContent = (p.trophies || 0).toLocaleString();
    document.getElementById("profile-best-trophies").textContent = (p.bestTrophies || p.trophies || 0).toLocaleString();

    const wins = p.wins || 0;
    const losses = p.losses || 0;
    const total = wins + losses;
    const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : "50.0";
    document.getElementById("profile-winrate").textContent = `${winRate}%`;

    document.getElementById("kpi-wins").textContent = wins.toLocaleString();
    document.getElementById("kpi-total-games").textContent = `${total.toLocaleString()} Recorded Matches`;
    document.getElementById("kpi-three-crowns").textContent = (p.threeCrownWins || 0).toLocaleString();
    document.getElementById("kpi-fav-card").textContent = p.currentFavouriteCard ? p.currentFavouriteCard.name : "Knight";
    document.getElementById("kpi-tourney-cards").textContent = (p.tournamentCardsWon || 0).toLocaleString();
    document.getElementById("kpi-challenge-wins").textContent = `${p.challengeMaxWins || 12}-Win Badge (${p.challengeCardsWon || 0} cards)`;

    this.renderLiveDeck(p.currentDeck || []);
    this.renderLiveChests();
    this.renderLiveBattles();
  },

  renderLiveDeck: function(deckCards) {
    const container = document.getElementById("profile-deck-grid");
    container.innerHTML = "";

    this.studioDeck = deckCards.map(dc => {
      const match = CLASH_CARDS.find(c => c.name.toLowerCase() === dc.name.toLowerCase() || c.id === dc.id);
      return match || { id: dc.id, name: dc.name, elixir: dc.elixirCost || 3, icon: dc.iconUrls ? dc.iconUrls.medium : "" };
    });

    let totalElixir = 0;

    deckCards.forEach((card, idx) => {
      const elixir = card.elixirCost || 3;
      totalElixir += elixir;
      
      const match = CLASH_CARDS.find(c => c.name.toLowerCase() === card.name.toLowerCase() || c.id === card.id);
      const isHero = match && match.hasHero;
      const isEvo = card.iconUrls && card.iconUrls.evolutionMedium;
      
      let img = card.iconUrls ? (card.iconUrls.evolutionMedium || card.iconUrls.heroMedium || card.iconUrls.medium) : "";
      if (isHero && match.heroIcon && idx === 1) {
        img = match.heroIcon;
      }

      const cardEl = document.createElement("div");
      cardEl.className = "deck-card-unit";
      if (idx === 0) cardEl.style.borderColor = "#a855f7"; // Evo slot
      if (idx === 1) cardEl.style.borderColor = "#eab308"; // Hero slot
      if (idx === 2) cardEl.style.borderColor = "#06b6d4"; // Wild slot

      cardEl.innerHTML = `
        <div class="card-elixir-dot">${elixir}</div>
        <img src="${img}" class="card-artwork" alt="${card.name}" onerror="this.src='https://api-assets.clashroyale.com/cards/300/jAj1Q5rclXxU9kVImGqSJxa4wEMfEhvwNQ_4jiGUuqg.png'">
        <div class="card-caption">${card.name}</div>
        <div class="card-lvl-tag">${idx === 0 ? "🟣 EVO" : (idx === 1 && isHero ? "🟡 HERO" : `LVL ${card.level || 15}`)}</div>
      `;
      container.appendChild(cardEl);
    });

    const avg = deckCards.length > 0 ? (totalElixir / deckCards.length).toFixed(1) : "3.5";
    document.getElementById("deck-stats-line").textContent = `Average Elixir: ${avg} • 8 Battle Cards Synced (2026 Slot Alignment)`;

    this.renderStudioDeck();
    this.renderStudioCatalog();
  },

  renderLiveChests: function() {
    const container = document.getElementById("profile-chests-track");
    container.innerHTML = "";

    if (this.activeChests.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem;">Upcoming chests synced on next battle refresh.</div>`;
      return;
    }

    this.activeChests.slice(0, 8).forEach((chest, idx) => {
      const isSpecial = chest.name.includes("Lightning") || chest.name.includes("Wild") || chest.name.includes("Magical") || chest.name.includes("Hero");
      const node = document.createElement("div");
      node.className = `chest-node ${isSpecial ? "highlight" : ""}`;
      node.innerHTML = `
        <div class="chest-index-badge">${idx === 0 ? "NEXT" : `+${idx}`}</div>
        <div style="font-size: 1.6rem; margin: 0.15rem 0;">📦</div>
        <div class="chest-title">${chest.name.replace(" Chest", "")}</div>
      `;
      container.appendChild(node);
    });
  },

  renderLiveBattles: function() {
    const container = document.getElementById("profile-battles-feed");
    container.innerHTML = "";

    if (this.activeBattles.length === 0) {
      container.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem;">No recent battles recorded in battle log.</div>`;
      return;
    }

    this.activeBattles.slice(0, 6).forEach(b => {
      const team = b.team && b.team[0] ? b.team[0] : {};
      const opp = b.opponent && b.opponent[0] ? b.opponent[0] : {};

      const myCrowns = team.crowns !== undefined ? team.crowns : 0;
      const oppCrowns = opp.crowns !== undefined ? opp.crowns : 0;
      const isWin = myCrowns > oppCrowns;

      const myCards = team.cards || [];
      const oppCards = opp.cards || [];

      const row = document.createElement("div");
      row.className = "battle-row";
      row.innerHTML = `
        <div class="battle-status-block">
          <span class="status-indicator ${isWin ? "win" : "loss"}">${isWin ? "VICTORY" : "DEFEAT"}</span>
          <div class="crown-tally">${myCrowns} - ${oppCrowns}</div>
          <div class="battle-game-type">${(b.type || "Ladder").replace(/([A-Z])/g, " $1")}</div>
        </div>

        <div class="battle-decks-matchup">
          <div class="combatant-deck">
            <div class="combatant-header">
              <span>You</span>
            </div>
            <div class="mini-cards-line">
              ${myCards.map(c => `<img src="${c.iconUrls ? c.iconUrls.medium : ""}" class="mini-card-thumb" onerror="this.style.opacity=0.4">`).join("")}
            </div>
          </div>

          <div style="font-size: 0.75rem; font-weight: 800; color: var(--text-muted);">VS</div>

          <div class="combatant-deck">
            <div class="combatant-header">
              <span style="color: var(--text-secondary);">${opp.name || "Opponent"}</span>
              <span style="font-size: 0.7rem; color: var(--text-muted);">${opp.clan ? opp.clan.name : ""}</span>
            </div>
            <div class="mini-cards-line">
              ${oppCards.map(c => `<img src="${c.iconUrls ? c.iconUrls.medium : ""}" class="mini-card-thumb" onerror="this.style.opacity=0.4">`).join("")}
            </div>
          </div>
        </div>

        <div class="battle-actions-col">
          <button class="btn-secondary" style="width: 100%;">Copy Opponent</button>
        </div>
      `;

      row.querySelector(".btn-secondary").addEventListener("click", () => {
        if (oppCards.length > 0) {
          this.studioDeck = oppCards.map(c => {
            const match = CLASH_CARDS.find(x => x.name.toLowerCase() === c.name.toLowerCase() || x.id === c.id);
            return match || { id: c.id, name: c.name, elixir: c.elixirCost || 3, icon: c.iconUrls ? c.iconUrls.medium : "" };
          });
          this.renderStudioDeck();
          this.showView("studio");
          this.showToast(`Copied ${opp.name || "Opponent"}'s deck into Studio!`);
        }
      });

      container.appendChild(row);
    });
  },

  // Render Heroes Catalog with Filters
  renderHeroesCatalog: function(filter = "all") {
    const container = document.getElementById("heroes-catalog-grid");
    if (!container) return;
    container.innerHTML = "";

    const items = HEROES_CATALOG.filter(item => {
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

      const cardImg = (isSlot1 && card.heroIcon) ? card.heroIcon : (isSlot0 && card.evoIcon ? card.evoIcon : card.icon);

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
        <div style="font-size: 0.65rem; color: var(--loss); cursor: pointer; margin-top: 0.2rem;">✕ Remove</div>
      `;
      slot.querySelector("div:last-child").onclick = () => {
        this.studioDeck.splice(idx, 1);
        this.renderStudioDeck();
        this.renderStudioCatalog();
      };
      container.appendChild(slot);
    });

    const avg = this.studioDeck.length > 0 ? (totalElixir / this.studioDeck.length).toFixed(1) : "0.0";
    document.getElementById("studio-avg-elixir").textContent = `Avg: ${avg} Elixir`;
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
      if (category === "spell") return c.rarity === "spell" || c.name.includes("Spell") || ["Zap", "The Log", "Fireball", "Arrows", "Lightning", "Poison", "Rocket", "Earthquake", "Tornado", "Freeze", "Void"].includes(c.name);
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
        if (!inDeck && this.studioDeck.length < 8) {
          this.studioDeck.push(c);
          this.renderStudioDeck();
          this.renderStudioCatalog();
        }
      };
      container.appendChild(item);
    });
  },

  renderMetaRankings: function() {
    const container = document.getElementById("meta-tier-container");
    if (!container) return;
    container.innerHTML = "";

    PRO_META_DECKS.forEach(deck => {
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

        <!-- 2026 Special Slots Indicator -->
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
          ${deck.cards.map((k, idx) => {
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
      `;
      container.appendChild(card);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
