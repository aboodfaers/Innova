import { initializeFooter } from "./footer.js";
import { initializeHeader, updateNavigationLabels } from "./header.js";

const aboutContent = {
  ar: {
    title: "من نحن",
    paragraphs: [
      "<span class=\"brand\">فريق Innova</span> — نحن فريق شغوف يسعى لتسهيل الأمور باستخدام التكنولوجيا. نعمل على تطوير وابتكار حلول رقمية تلبي احتياجات الطلاب وتسهل حياتهم الدراسية من خلال محتوى عصري ومُبتكر يسهل على الجميع التعامل معه.",
      "<span class=\"brand\">مرجعي</span> هو أوّل موقع جامعي إلكتروني في الجنوب الأردني، صُمّم خصيصًا لطلبة جامعة الحسين بن طلال. يهدف الموقع إلى توفير مكتبة طلابية إلكترونية تجمع المواد الدراسية لجميع التخصّصات، مع خطط دراسية ومراجع منظّمة تساعد الطالب في مسيرته الأكاديمية.",
      "نسعى لتبسيط عمليّة الدراسة وتوفير مصادر موثوقة وسهلة الوصول، سواء قبل الامتحانات أو أثناء الفصل الدراسي؛ لنكون المرجع الأوّل لكل طالب يبحث عن التنظيم والضمان والتميّز في دراسته الجامعية.",
      "نؤمن بأن النجاح يبدأ من الفكرة الصحيحة؛ لذلك نركّز على الإبداع والعمل الجماعي والمسؤولية في كل ما نقدّمه."
    ]
  },
  en: {
    title: "About Us",
    paragraphs: [
      "<span class=\"brand\">Innova Team</span> — we are a passionate team dedicated to making study life easier through technology. We develop and innovate digital solutions and student-focused content that simplify learning and daily academic tasks.",
      "<span class=\"brand\">Marja3i</span> is the first university portal in southern Jordan, designed especially for Al-Hussein Bin Talal University students. The site provides an electronic student library that gathers course materials across majors, along with organized study plans and references to support students' academic journeys.",
      "We aim to simplify the study process and provide reliable, easily accessible resources — whether before exams or during the semester — to be the first reference for every student seeking organization, assurance, and excellence in their university studies.",
      "We believe success starts with the right idea; therefore we focus on creativity, teamwork, and responsibility in everything we provide."
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
    // paragraphs may contain simple HTML (for emphasis), render as HTML
    p.innerHTML = text;
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
