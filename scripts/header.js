const NAV_TRANSLATIONS = {
  ar: {
    home: "الرئيسية",
    courses: "المساقات",
    more: "المزيد ▾",
    about: "من نحن",
    report: "الإبلاغ عن مشكلة",
    lang: "اللغة",
    menuLabel: "القائمة",
  },
  en: {
    home: "Home",
    courses: "Courses",
    more: "More ▾",
    about: "About Us",
    report: "Report a Problem",
    lang: "Language",
    menuLabel: "Menu",
  },
};

export function initializeHeader() {
  const header = document.getElementById("header");

  header.innerHTML = `
    <div class="logo">
        <img src="/images/logo.webp" alt="Logo">
        <span>Marja3i</span>
    </div>
    <button class="nav-toggle" id="nav-toggle" aria-label="القائمة">
        <i class="fa fa-bars"></i>
    </button>
    <nav id="main-nav">
        <a href="/index.html" id="nav-home">الرئيسية</a>
        <a href="Courses/courses.html" id="nav-courses">المساقات</a>
        <div class="dropdown">
            <a href="#" id="nav-more">المزيد ▾</a>
            <div class="dropdown-content">
                <a href="/about.html" id="nav-about">من نحن</a>
                <a href="/report.html" id="nav-report">الإبلاغ عن مشكلة</a>
            </div>
        </div>
        <div class="dropdown">
            <a href="#" id="lang-switcher"><i class="fa-solid fa-globe"></i> <span id="lang-label">اللغة</span></a>
            <div class="dropdown-content">
                <a href="#" onclick="switchLang('ar'); return false;">العربية</a>
                <a href="#" onclick="switchLang('en'); return false;">English</a>
            </div>
        </div>
    </nav>
    `;

  const savedLang =
    localStorage.getItem("lang") || document.documentElement.lang || "ar";
  updateNavigationLabels(savedLang);
  initMobileNav();
}

function initMobileNav() {
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => mainNav.classList.toggle("open"));
  }

  document.querySelectorAll(".dropdown > a").forEach((drop) => {
    drop.addEventListener("click", function (e) {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle("open");
        document.querySelectorAll(".dropdown").forEach((d) => {
          if (d !== parent) d.classList.remove("open");
        });
      }
    });
  });
}

export function updateNavigationLabels(lang = "ar") {
  const locale = lang === "en" ? "en" : "ar";
  const texts = NAV_TRANSLATIONS[locale];

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  setText("nav-home", texts.home);
  setText("nav-courses", texts.courses);
  setText("nav-more", texts.more);
  setText("nav-about", texts.about);
  setText("nav-report", texts.report);
  setText("lang-label", texts.lang);

  const toggle = document.getElementById("nav-toggle");
  if (toggle) toggle.setAttribute("aria-label", texts.menuLabel);
}
