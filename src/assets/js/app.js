import "../css/app.css";

let sallaSdkPromise = null;
let sallaComponentsPromise = null;

const ensureSallaSDK = async () => {
  if (window.salla) return window.salla;
  if (!sallaSdkPromise) {
    sallaSdkPromise = import("@salla.sa/twilight")
      .then((module) => window.salla || module?.default || module?.salla || null)
      .catch(() => null);
  }
  return sallaSdkPromise;
};

const ensureSallaComponents = async () => {
  if (!sallaComponentsPromise) {
    sallaComponentsPromise = import("@salla.sa/twilight-components").catch(() => null);
  }
  return sallaComponentsPromise;
};

const onReady = (fn) => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", fn, { once: true });
    return;
  }
  fn();
};

onReady(() => {
  const hasSallaComponents = Boolean(
    document.querySelector("salla-product-card, salla-wishlist-button, salla-rating, salla-cart, salla-login-modal")
  );
  if (hasSallaComponents) {
    ensureSallaComponents();
  }

  const isArabic = document.documentElement.lang === "ar";
  const prayerNames = isArabic
    ? { Fajr: "الفجر", Dhuhr: "الظهر", Asr: "العصر", Maghrib: "المغرب", Isha: "العشاء" }
    : { Fajr: "Fajr", Dhuhr: "Dhuhr", Asr: "Asr", Maghrib: "Maghrib", Isha: "Isha" };

  const updateDateWidgets = () => {
    const locale = isArabic ? "ar-SA" : "en-US";
    const gregorianNode = document.querySelector("#vtw-gregorian-date");
    const hijriNode = document.querySelector("#vtw-hijri-date");
    if (gregorianNode) {
      const gregorian = new Intl.DateTimeFormat(locale, {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date());
      gregorianNode.textContent = gregorian;
    }

    if (hijriNode) {
      const hijri = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        calendar: "islamic-umalqura",
      }).format(new Date());
      hijriNode.textContent = hijri;
    }
  };

  const fetchPrayerAndWeather = async () => {
    const weatherNode = document.querySelector("#vtw-weather");
    const prayerNode = document.querySelector("#vtw-next-prayer");
    try {
      const lat = Number(document.body.dataset.lat || 24.7136);
      const lng = Number(document.body.dataset.lng || 46.6753);
      const [weatherRes, prayerRes] = await Promise.all([
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m`),
        fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lng}&method=4`),
      ]);

      if (weatherRes.ok && weatherNode) {
        const weatherJson = await weatherRes.json();
        const temp = weatherJson?.current?.temperature_2m;
        if (typeof temp === "number") {
          weatherNode.textContent = `${temp}°C`;
        }
      }

      if (prayerRes.ok && prayerNode) {
        const prayerJson = await prayerRes.json();
        const timings = prayerJson?.data?.timings || {};
        const nowMinutes = (() => {
          const n = new Date();
          return n.getHours() * 60 + n.getMinutes();
        })();

        const ordered = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        let nextPrayer = null;
        for (const key of ordered) {
          const value = String(timings[key] || "");
          const parts = value.split(":");
          if (parts.length !== 2) continue;
          const prayerMinutes = Number(parts[0]) * 60 + Number(parts[1]);
          if (prayerMinutes > nowMinutes) {
            nextPrayer = { key, value };
            break;
          }
        }
        if (!nextPrayer && ordered.length) {
          const first = ordered[0];
          nextPrayer = { key: first, value: String(timings[first] || "") };
        }
        if (nextPrayer?.value) {
          const localizedName = prayerNames[nextPrayer.key] || nextPrayer.key;
          prayerNode.textContent = `${localizedName}: ${nextPrayer.value}`;
        }
      }
    } catch (error) {
      if (weatherNode) weatherNode.textContent = "";
      if (prayerNode) prayerNode.textContent = "";
    }
  };

  updateDateWidgets();
  fetchPrayerAndWeather();

  const addToCartButtons = document.querySelectorAll("[data-add-to-cart]");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const sdk = await ensureSallaSDK();
      const id = Number(button.getAttribute("data-product-id"));
      const qtyInput = document.querySelector("[data-product-qty]");
      const dynamicQty = qtyInput ? Number(qtyInput.value || 1) : null;
      const qty = dynamicQty || Number(button.getAttribute("data-qty") || 1);
      if (!id || !sdk?.cart?.addItem) return;
      button.disabled = true;
      try {
        await sdk.cart.addItem(id, qty);
      } finally {
        button.disabled = false;
      }
    });
  });

  const wishlistButtons = document.querySelectorAll("[data-add-to-wishlist]");
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const sdk = await ensureSallaSDK();
      const id = Number(button.getAttribute("data-product-id"));
      if (!id || !sdk?.wishlist?.add) return;
      await sdk.wishlist.add(id);
    });
  });

  const loginButtons = document.querySelectorAll("[data-open-login]");
  loginButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector("salla-login-modal");
      if (modal?.show) {
        modal.show();
      }
    });
  });

  const loginForm = document.querySelector("[data-login-form]");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      const sdk = await ensureSallaSDK();
      const formData = new FormData(loginForm);
      const email = String(formData.get("email") || "");
      const password = String(formData.get("password") || "");
      if (!email || !password || !sdk?.auth?.login) return;
      event.preventDefault();
      await sdk.auth.login({ email, password });
    });
  }

  const checkoutForm = document.querySelector("[data-checkout-form]");
  if (checkoutForm) {
    const cardFieldsWrap = checkoutForm.querySelector("[data-card-fields]");
    const paymentRadios = checkoutForm.querySelectorAll('input[name="payment"]');
    const errorBox = checkoutForm.querySelector("[data-checkout-errors]");
    const cardFieldNames = ["card_name", "card_number", "card_expiry", "card_cvv"];

    const updateCardFieldsVisibility = () => {
      const selectedPayment = checkoutForm.querySelector('input[name="payment"]:checked')?.value;
      const shouldShowCard = selectedPayment === "card";
      if (cardFieldsWrap) {
        cardFieldsWrap.classList.toggle("hidden", !shouldShowCard);
      }
      cardFieldNames.forEach((name) => {
        const input = checkoutForm.querySelector(`[name="${name}"]`);
        if (!input) return;
        if (shouldShowCard) {
          input.setAttribute("required", "required");
        } else {
          input.removeAttribute("required");
        }
      });
    };

    paymentRadios.forEach((radio) => {
      radio.addEventListener("change", updateCardFieldsVisibility);
    });
    updateCardFieldsVisibility();

    checkoutForm.addEventListener("submit", async (event) => {
      const sdk = await ensureSallaSDK();
      const canCheckout = Boolean(sdk?.checkout?.createOrder);
      const isValid = checkoutForm.checkValidity();
      if (!isValid) {
        event.preventDefault();
        if (errorBox) {
          errorBox.classList.remove("hidden");
          errorBox.textContent = isArabic
            ? "يرجى التأكد من تعبئة الحقول المطلوبة بشكل صحيح."
            : "Please complete all required fields correctly.";
        }
        checkoutForm.querySelectorAll("input, textarea").forEach((field) => {
          if (field.checkValidity()) {
            field.classList.remove("border-red-400");
          } else {
            field.classList.add("border-red-400");
          }
        });
        return;
      }
      if (!canCheckout) return;
      event.preventDefault();
      const formData = new FormData(checkoutForm);
      const payload = Object.fromEntries(formData.entries());
      if (errorBox) {
        errorBox.classList.add("hidden");
        errorBox.textContent = "";
      }
      await sdk.checkout.createOrder(payload);
    });
  }

  const languageToggle = document.querySelector("[data-language-toggle]");
  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      const next = document.documentElement.lang === "ar" ? "en" : "ar";
      ensureSallaSDK().then((sdk) => {
        if (sdk?.lang?.set) sdk.lang.set(next);
      });
    });
  }

  const mobileMenuToggle = document.querySelector("[data-mobile-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  const categoryGrid = document.querySelector("[data-category-grid]");
  const categorySearch = document.querySelector("[data-category-search]");
  const categorySort = document.querySelector("[data-category-sort]");
  const categoryPills = document.querySelectorAll("[data-category-pill]");
  if (categoryGrid) {
    const items = Array.from(categoryGrid.querySelectorAll("[data-product-item]"));
    let activeCategory = "all";
    let activeSearch = "";

    const applyCategoryFilters = () => {
      items.forEach((item) => {
        const itemCategory = String(item.getAttribute("data-product-category") || "");
        const itemName = String(item.getAttribute("data-product-name") || "");
        const matchCategory = activeCategory === "all" || itemCategory === activeCategory;
        const matchSearch = !activeSearch || itemName.includes(activeSearch);
        item.classList.toggle("hidden", !(matchCategory && matchSearch));
      });
    };

    categoryPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        activeCategory = String(pill.getAttribute("data-category-value") || "all");
        categoryPills.forEach((other) => {
          const selected = other === pill;
          other.classList.toggle("bg-sky-600", selected);
          other.classList.toggle("text-white", selected);
          other.classList.toggle("border", !selected);
          other.classList.toggle("border-slate-300", !selected);
          other.classList.toggle("text-slate-700", !selected);
        });
        applyCategoryFilters();
      });
    });

    if (categorySearch) {
      categorySearch.addEventListener("input", () => {
        activeSearch = String(categorySearch.value || "").trim().toLowerCase();
        applyCategoryFilters();
      });
    }

    if (categorySort) {
      categorySort.addEventListener("change", () => {
        const value = String(categorySort.value || "default");
        const sorted = [...items];
        if (value === "name-asc") {
          sorted.sort((a, b) => String(a.getAttribute("data-product-name") || "").localeCompare(String(b.getAttribute("data-product-name") || "")));
        } else if (value === "name-desc") {
          sorted.sort((a, b) => String(b.getAttribute("data-product-name") || "").localeCompare(String(a.getAttribute("data-product-name") || "")));
        }
        sorted.forEach((item) => categoryGrid.appendChild(item));
      });
    }
  }
});
