import { initializeFooter } from "./footer.js";
import { initializeHeader, updateNavigationLabels } from "./header.js";

const aboutContent = {
  ar: {
    title: "من نحن",
    paragraphs: [
      "نحن فريق شغوف يسعى لتسهيل الأمور باستخدام التكنولوجيا، نعمل على تطوير وابتكار حلول رقمية تلبي احتياجات المستخدمين وتسهل حياتهم اليومية من خلال محتوى عصري ومبتكر يسهل على الجميع استخدامه والاعتياد عليه.",
      "ونؤمن بأن النجاح يبدأ من الفكرة الصحيحة، لذلك نركز على الإبداع والعمل الجماعي والمسؤولية في كل ما نقدمه."
    ]
  },
  en: {
    title: "About Us",
    paragraphs: [
      "We are a passionate team focused on making life easier through technology. We develop and innovate digital solutions that meet user needs and simplify everyday life with modern, creative content that everyone can easily use and grow comfortable with.",
      "We believe that success starts with the right idea, so we emphasize creativity, teamwork, and responsibility in everything we deliver."
    ]
  }
};

let currentLang = localStorage.getItem("lang") || document.documentElement.lang || "ar";

function renderContent(lang) {
  const data = aboutContent[lang] || aboutContent.ar;
  const titleEl = document.getElementById("about-title");
  const paragraphsEl = document.getElementById("about-paragraphs");
  if (!paragraphsEl) return;

  if (titleEl) titleEl.textContent = data.title;
  document.title = lang === "ar" ? "من نحن - مرجعي" : "About Us - Marja3i";

  paragraphsEl.innerHTML = "";
  data.paragraphs.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    paragraphsEl.appendChild(p);
  });
}

window.switchLang = function (lang) {
  currentLang = lang === "en" ? "en" : "ar";
  localStorage.setItem("lang", currentLang);

  const isAr = currentLang === "ar";
  document.documentElement.lang = currentLang;
  document.documentElement.dir = isAr ? "rtl" : "ltr";

  updateNavigationLabels(currentLang);
  renderContent(currentLang);

  if (typeof renderFooter === "function") {
    renderFooter(currentLang);
  }

  document.querySelectorAll(".dropdown").forEach(drop => drop.classList.remove("open"));
};

document.addEventListener("DOMContentLoaded", () => {
  initializeHeader();
  initializeFooter();
  switchLang(currentLang);
});
