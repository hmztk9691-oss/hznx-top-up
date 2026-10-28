
const WHATSAPP_NUMBER = "201114590575";

// الأسعار أمثلة تجريبية، وليست أسعار شحن مؤكدة.
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

// تصميم القوائم المخصصة
function setupCustomDropdown(select, placeholder) {
  const wrapper = select.closest(".field-wrap");

  if (!wrapper || wrapper.dataset.customReady === "true") return;

  wrapper.dataset.customReady = "true";

  select.style.display = "none";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "hznx-dropdown-button";
  button.setAttribute("aria-expanded", "false");

  const menu = document.createElement("div");
  menu.className = "hznx-dropdown-menu";
  menu.hidden = true;

  // تنسيق القائمة بدون الحاجة لتعديل ملف CSS
  Object.assign(wrapper.style, {
    position: "relative"
  });

  Object.assign(button.style, {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    width: "100%",
    minHeight: "52px",
    padding: "14px 16px",
    border: "1px solid #8332a8",
    borderRadius: "12px",
    background: "#100b18",
    color: "#ffffff",
    fontFamily: "inherit",
    fontSize: "15px",
    textAlign: "right",
    cursor: "pointer"
  });

  Object.assign(menu.style, {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: "0",
    left: "0",
    zIndex: "9999",
    maxHeight: "260px",
    overflowY: "auto",
    padding: "6px",
    border: "1px solid #8332a8",
    borderRadius: "12px",
    background: "#100b18",
    boxShadow: "0 12px 35px rgba(0,0,0,.65)"
  });

  wrapper.insertBefore(button, select);
  wrapper.appendChild(menu);

  function refresh() {
    const currentOption = select.options[select.selectedIndex];

    button.innerHTML = "";

    const text = document.createElement("span");
    text.textContent =
      currentOption && currentOption.value
        ? currentOption.textContent
        : placeholder;

    const arrow = document.createElement("span");
    arrow.textContent = menu.hidden ? "⌄" : "⌃";
    arrow.style.color = "#ff3ebf";

    button.append(text, arrow);
    button.disabled = select.disabled;

    button.style.opacity = select.disabled ? "0.5" : "1";
    button.style.cursor = select.disabled ? "not-allowed" : "pointer";

    menu.innerHTML = "";

    Array.from(select.options).forEach(option => {
      const item = document.createElement("button");
      item.type = "button";
      item.textContent = option.textContent;
      item.disabled = option.disabled;
      item.setAttribute(
        "aria-selected",
        String(option.value === select.value && option.value !== "")
      );

      Object.assign(item.style, {
        display: "block",
        width: "100%",
        padding: "14px 12px",
        border: "0",
        borderRadius: "8px",
        background:
          option.value === select.value && option.value !== ""
            ? "rgba(255,62,191,.16)"
            : "transparent",
        color: option.value === "" ? "#a89caf" : "#ffffff",
        fontFamily: "inherit",
        fontSize: "14px",
        textAlign: "right",
        cursor: "pointer"
      });

      item.addEventListener("click", () => {
        if (option.disabled) return;

        select.value = option.value;
        select.dispatchEvent(new Event("change", { bubbles: true }));

        closeMenu();
        refresh();
      });

      menu.appendChild(item);
    });
  }

  function closeMenu() {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    refresh();
  }

  button.addEventListener("click", () => {
    if (select.disabled) return;

    const willOpen = menu.hidden;

    document.querySelectorAll(".hznx-dropdown-menu").forEach(otherMenu => {
      otherMenu.hidden = true;

      const otherButton = otherMenu.parentElement.querySelector(
        ".hznx-dropdown-button"
      );

      if (otherButton) {
        otherButton.setAttribute("aria-expanded", "false");
      }
    });

    menu.hidden = !willOpen;
    button.setAttribute("aria-expanded", String(willOpen));
    refresh();
  });

  select.addEventListener("change", refresh);

  const observer = new MutationObserver(refresh);
  observer.observe(select, {
    childList: true,
    subtree: true,
    attributes: true
  });

  refresh();

  return { refresh, closeMenu };
}

// عرض كروت الألعاب
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
      selectedGame.dispatchEvent(new Event("change", { bubbles: true }));

      document.getElementById("order").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      formStatus.textContent = `اخترت ${game.name}. كمّل بيانات الطلب.`;
    });

    gamesGrid.appendChild(card);
  });
}

// إضافة الألعاب لقائمة الاختيار الأصلية
function populateGameOptions() {
  games.forEach(game => {
    const option = document.createElement("option");
    option.value = game.id;
    option.textContent = game.name;
    selectedGame.appendChild(option);
  });
}

// تحديث الباقات عند اختيار اللعبة
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
    packageSelect.add(
      new Option(
        `${pack.name} — ${money(pack.price)} ج.م`,
        String(index)
      )
    );
  });

  priceDisplay.innerHTML = '— <small>EGP</small>';
}

// تحديث السعر
function updatePrice() {
  const game = games.find(item => item.id === selectedGame.value);

  const pack =
    game && packageSelect.value !== ""
      ? game.packages[Number(packageSelect.value)]
      : null;

  priceDisplay.innerHTML = pack
    ? `${money(pack.price)} <small>EGP</small>`
    : '— <small>EGP</small>';
}

// البحث عن الألعاب
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

// تجهيز طلب واتساب
orderForm.addEventListener("submit", event => {
  event.preventDefault();

  const game = games.find(item => item.id === selectedGame.value);

  const pack =
    game && packageSelect.value !== ""
      ? game.packages[Number(packageSelect.value)]
      : null;

  const id = playerId.value.trim();

  if (!game || !pack || !id) {
    formStatus.textContent =
      "من فضلك اختار اللعبة والباقة واكتب Player ID.";
    return;
  }

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    formStatus.textContent = "رقم واتساب المتجر غير صحيح.";
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

  // مناسب أكثر لبعض متصفحات الموبايل
  window.location.href = whatsappURL;

  formStatus.textContent = "جارٍ فتح واتساب لتأكيد طلبك.";
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

// تشغيل الموقع
populateGameOptions();

setupCustomDropdown(selectedGame, "اختار اللعبة");
setupCustomDropdown(packageSelect, "اختار الباقة الأول");

renderGames();
