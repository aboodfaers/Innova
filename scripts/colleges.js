import { initializeFooter } from "./footer.js";
import { initializeHeader, updateNavigationLabels } from "./header.js";

let currentLang = localStorage.getItem("lang") || document.documentElement.lang || "ar";
let currentSlug = null;
const mobileBgStyleId = "college-mobile-background";

function resolveSlug() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("slug");
    if (fromQuery) return fromQuery.trim().toLowerCase();

    const filename = (window.location.pathname.split("/").pop() || "").replace(/\.html?$/i, "");
    return filename || null;
}

function applyBranding(settings = {}) {
    const { background_desktop, background_mobile, text_color } = settings;

    if (background_desktop) {
        document.body.style.background = `url("${background_desktop}") no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
    }

    if (text_color) {
        document.body.style.color = text_color;
    }

    let styleTag = document.getElementById(mobileBgStyleId);
    if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = mobileBgStyleId;
        document.head.appendChild(styleTag);
    }

    if (background_mobile) {
        styleTag.textContent = `@media (max-width: 768px) { body { background: #e3eaf6 url("${background_mobile}") no-repeat center center; background-size: cover; background-attachment: fixed; } }`;
    } else if (background_desktop) {
        styleTag.textContent = `@media (max-width: 768px) { body { background: url("${background_desktop}") no-repeat center center; background-size: cover; background-attachment: fixed; } }`;
    } else {
        styleTag.textContent = "";
    }
}

async function loadCollegeData() {
    try {
        currentSlug = resolveSlug();
        if (!currentSlug) throw new Error("Missing college slug.");

    const dataUrl = new URL("./colleges.json", import.meta.url);
        const res = await fetch(dataUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load colleges.json: ${res.status}`);
        const all = await res.json();
        const data = all[currentSlug];
        if (!data) {
            console.warn(`[Colleges] No data found for slug '${currentSlug}' in colleges.json`);
            window.collegeCourses = { title_ar: "", title_en: "", courses: [] };
            return;
        }
        applyBranding(data);
        window.collegeCourses = data;
    } catch (err) {
        console.error("[Colleges] Error loading college data:", err);
        if (!window.collegeCourses) {
            window.collegeCourses = { title_ar: "", title_en: "", courses: [] };
        }
    }
}

window.switchLang = function (lang) {
    currentLang = lang === "en" ? "en" : "ar";
    localStorage.setItem("lang", currentLang);

    const isAr = currentLang === "ar";
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";

    const titleEl = document.getElementById("main-title");
    if (titleEl && window.collegeCourses) {
        titleEl.textContent = isAr ? window.collegeCourses.title_ar : window.collegeCourses.title_en;
    }
    if (window.collegeCourses) {
        document.title = isAr ? window.collegeCourses.title_ar : window.collegeCourses.title_en;
    }

    updateNavigationLabels(currentLang);

    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.placeholder = isAr ? "بحث عن مادة" : "Search for a course";

    renderCourses(isAr ? "ar" : "en");

    if (typeof renderFooter === "function") renderFooter(currentLang);

    document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("open"));
};

function renderCourses(langKey) {
    const ul = document.getElementById("courses-ul");
    if (!ul || !window.collegeCourses) return;

    const courses = Array.isArray(window.collegeCourses.courses) ? window.collegeCourses.courses : [];

    ul.innerHTML = "";

    if (courses.length === 0) {
        const emptyLi = document.createElement("li");
        emptyLi.textContent = langKey === "ar" ? "لا توجد بيانات متاحة حالياً." : "No data available yet.";
        ul.appendChild(emptyLi);
        return;
    }

    courses.forEach(c => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = c.url;
        a.target = "_blank";
        a.textContent = c[langKey] || c.ar || c.en || "";
        li.appendChild(a);
        ul.appendChild(li);
    });
}

function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

function performSearch(query) {
    const resultsContainer = document.getElementById("search-results");
    const ul = document.getElementById("courses-ul");
    resultsContainer.innerHTML = "";
    if (!query || !window.collegeCourses || !Array.isArray(window.collegeCourses.courses)) {
        resultsContainer.style.display = "none";
        return;
    }

    const isAr = currentLang === "ar";
    const key = isAr ? "ar" : "en";

    const matches = window.collegeCourses.courses.filter(item =>
        item[key].toLowerCase().includes(query.toLowerCase())
    );

    if (matches.length > 0) {
        matches.forEach(match => {
            const div = document.createElement("div");
            const a = document.createElement("a");
            a.href = match.url;
            a.target = "_blank";
            a.textContent = match[key];
            div.className = "search-result-item";
            div.appendChild(a);
            div.onclick = () => {
                Array.from(ul.children).forEach(li => {
                    li.style.background = "";
                    if (li.textContent === match[key]) {
                        li.style.background = "#ffe082";
                        li.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                });
                resultsContainer.style.display = "none";
            };
            resultsContainer.appendChild(div);
        });
    } else {
        resultsContainer.innerHTML = `<p>${isAr ? "لا توجد نتائج." : "No results found."}</p>`;
    }
    resultsContainer.style.display = "block";
}

function initializeSearch() {
    const searchInput = document.getElementById("search-input");
    const resultsContainer = document.getElementById("search-results");

    if (searchInput) {
        searchInput.addEventListener("input", debounce(() => {
            const query = searchInput.value.trim();
            performSearch(query);
        }, 200));

        searchInput.addEventListener("focus", function () {
            if (this.value.trim() !== "" && resultsContainer.innerHTML.trim() !== "") {
                resultsContainer.style.display = "block";
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (searchInput && resultsContainer && !searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = "none";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    (async () => {
        initializeHeader();
        initializeFooter();
        await loadCollegeData();
        initializeSearch();
        window.switchLang(currentLang);
        if (!window.collegeCourses || !window.collegeCourses.courses) {
            const ul = document.getElementById("courses-ul");
            if (ul) ul.innerHTML = `<li>${currentLang === "ar" ? 'لا توجد بيانات متاحة حالياً.' : 'No data available yet.'}</li>`;
        }
    })();
});
