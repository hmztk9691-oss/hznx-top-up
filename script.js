
const WHATSAPP_NUMBER = "201114590575";

// الأسعار هنا أمثلة تجريبية وليست أسعار شحن مؤكدة.
const games = [
  {
    id: "pubg",
    name: "PUBG Mobile",
    short: "PUBG",
    category: "BATTLE ROYALE",
    description: "شد حيلك في ساحة المعركة",
    color: "#ff75b7",
    packages: [
      { name: "60 UC", price: 65 },
      { name: "325 UC", price: 310 },
      { name: "660 UC", price: 600 },
      { name: "1800 UC", price: 1450 }
    ]
  },
  {
    id: "freefire",
    name: "Free Fire",
    short: "FF",
    category: "BATTLE ROYALE",
    description: "جهّز نفسك للمواجهة",
    color: "#ff4fa3",
    packages: [
      { name: "100 Diamonds", price: 50 },
      { name: "310 Diamonds", price: 145 },
      { name: "520 Diamonds", price: 235 },
      { name: "1060 Diamonds", price: 470 }
    ]
  },
  {
    id: "cod",
    name: "Call of Duty Mobile",
    short: "COD",
    category: "ACTION",
    description: "استعد للمعركة",
    color: "#b58aff",
    packages: [
      { name: "80 CP", price: 55 },
      { name: "400 CP", price: 220 },
      { name: "800 CP", price: 440 },
      { name: "2000 CP", price: 1050 }
    ]
  },
  {
    id: "mlbb",
    name: "Mobile Legends",
    short: "ML",
    category: "MOBA",
    description: "اختار بطلك وابدأ",
    color: "#c38cff",
    packages: [
      { name: "86 Diamonds", price: 65 },
      { name: "172 Diamonds", price: 125 },
      { name: "257 Diamonds", price: 185 },
      { name: "706 Diamonds", price: 490 }
    ]
  },
  {
    id: "valorant",
    name: "Valorant",
    short: "VAL",
    category: "TACTICAL FPS",
    description: "العبها باحتراف",
    color: "#ff729e",
    packages: [
      { name: "475 VP", price: 250 },
      { name: "1000 VP", price: 480 },
      { name: "2050 VP", price: 950 },
      { name: "3650 VP", price: 1650 }
    ]
  },
  {
    id: "genshin",
    name: "Genshin Impact",
    short: "GI",
    category: "ADVENTURE RPG",
    description: "اكتشف عالماً جديداً",
    color: "#b78bff",
    packages: [
      { name: "60 Genesis Crystals", price: 65 },
      { name: "300 + 30 Crystals", price: 260 },
      { name: "980 + 110 Crystals", price: 750 },
      { name: "Blessing of the Welkin Moon", price: 250 }
    ]
  }
];

const gamesGrid = document.getElementById("gamesGrid");
const searchInput = document.getElementById("gameSearch");
const gamesCount = document.getElementById("gamesCount");
const emptyState = document.getElementById("emptyState");
const selectedGame = document.getElementById("selectedGame");
const packageSelect = document.getElementById("packageSelect");
const playerId = document.getElementById("playerId");
const priceDisplay = document.getElementById("priceDisplay");
const orderForm = document.getElementById("orderForm");
const formStatus = document.getElementById("formStatus");

const money = value =>
  new Intl.NumberFormat("ar-EG", {
    maximumFractionDigits: 0
  }).format(value);

function renderGames(query = "") {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredGames = games.filter(game =>
    `${game.name} ${game.short} ${game.category}`
      .toLowerCase()
      .includes(normalizedQuery)
  );

  gamesGrid.innerHTML = "";
  gamesCount.textContent = String(filteredGames.length).padStart(2, "0");
  emptyState.hidden = filteredGames.length !== 0;

  filteredGames.forEach((game, index) => {
    const card = document.createElement("article");
    card.className = "game-card";
    card.style.setProperty("--delay", `${index * 90}ms`);
    card.style.setProperty("--game-color", game.color);
    card.style.setProperty(
      "--game-glow",
      game.id === "genshin" || game.id === "mlbb"
        ? "rgba(164,91,255,.15)"
        : "rgba(255,79,163,.14)"
    );

    const lowestPrice = Math.min(...game.packages.map(item => item.price));

    card.innerHTML = `
      <div class="game-top">
        <div class="game-symbol"></div>
        <span class="game-tag"></span>
      </div>
      <h3></h3>
      <p></p>
      <div class="game-card-bottom">
        <div class="game-price">باقات تبدأ من <b></b> ج.م</div>
        <button class="game-pick" type="button">اختار اللعبة ↗</button>
      </div>
    `;

    card.querySelector(".game-symbol").textContent = game.short;
    card.querySelector(".game-tag").textContent = game.category;
    card.querySelector("h3").textContent = game.name;
    card.querySelector("p").textContent = game.description;
    card.querySelector(".game-price b").textContent = money(lowestPrice);

    card.querySelector(".game-pick").addEventListener("click", () => {
      selectedGame.value = game.id;
      updatePackages();
      document.getElementById("order").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      formStatus.textContent = `اخترت ${game.name}. كمّل بيانات الطلب.`;
    });

    gamesGrid.appendChild(card);
  });
}

function populateGameOptions() {
  games.forEach(game => {
    const option = document.createElement("option");
    option.value = game.id;
    option.textContent = game.name;
    selectedGame.appendChild(option);
  });
}

function updatePackages() {
  const game = games.find(item => item.id === selectedGame.value);

  packageSelect.innerHTML = "";

  if (!game) {
    packageSelect.disabled = true;
    packageSelect.add(new Option("اختار اللعبة الأول", ""));
    priceDisplay.innerHTML = '— <small>EGP</small>';
    return;
  }

  packageSelect.disabled = false;
  packageSelect.add(new Option("اختار الباقة", ""));

  game.packages.forEach((pack, index) => {
    const option = new Option(
      `${pack.name} — ${money(pack.price)} ج.م`,
      String(index)
    );
    packageSelect.add(option);
  });

  priceDisplay.innerHTML = '— <small>EGP</small>';
}

function updatePrice() {
  const game = games.find(item => item.id === selectedGame.value);
  const pack = game && packageSelect.value !== ""
    ? game.packages[Number(packageSelect.value)]
    : null;

  priceDisplay.innerHTML = pack
    ? `${money(pack.price)} <small>EGP</small>`
    : '— <small>EGP</small>';
}

searchInput.addEventListener("input", event => {
  renderGames(event.target.value);
});

selectedGame.addEventListener("change", () => {
  updatePackages();
  formStatus.textContent = "";
});

packageSelect.addEventListener("change", () => {
  updatePrice();
  formStatus.textContent = "";
});

orderForm.addEventListener("submit", event => {
  event.preventDefault();

  const game = games.find(item => item.id === selectedGame.value);
  const pack = game && packageSelect.value !== ""
    ? game.packages[Number(packageSelect.value)]
    : null;

  const id = playerId.value.trim();

  if (!game || !pack || !id) {
    formStatus.textContent = "من فضلك اختار اللعبة والباقة واكتب Player ID.";
    return;
  }

  if (WHATSAPP_NUMBER === "201000000000") {
    formStatus.textContent = "لازم تضيف رقم واتساب المتجر الصحيح في الكود.";
    return;
  }

  const message = [
    "طلب جديد من HZNX TOP UP",
    "-------------------------",
    `اللعبة: ${game.name}`,
    `الباقة: ${pack.name}`,
    `Player ID: ${id}`,
    `السعر المعروض: ${pack.price} جنيه`,
    "-------------------------",
    "من فضلك أكد السعر والتوافر قبل الدفع."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
  formStatus.textContent = "راجع تفاصيل الطلب في واتساب قبل الإرسال.";
});

// إظهار العناصر أثناء النزول في الصفحة
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

populateGameOptions();
renderGames();
