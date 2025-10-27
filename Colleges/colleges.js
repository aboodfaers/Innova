import { initializeFooter } from "../scripts/footer.js";
import { initializeHeader } from "../scripts/header.js";

// --- Global Language ---
let currentLang = localStorage.getItem('lang') || 'ar';
let currentSlug = null;
const mobileBgStyleId = 'college-mobile-background';

function resolveSlug() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('slug');
    if (fromQuery) return fromQuery.trim().toLowerCase();

    const filename = (window.location.pathname.split('/').pop() || '').replace(/\.html?$/i, '');
    return filename || null;
}

function applyBranding(settings = {}) {
    const { background_desktop, background_mobile, text_color } = settings;

    if (background_desktop) {
        document.body.style.background = `url("${background_desktop}") no-repeat center center fixed`;
        document.body.style.backgroundSize = 'cover';
    }

    if (text_color) {
        document.body.style.color = text_color;
    }

    let styleTag = document.getElementById(mobileBgStyleId);
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = mobileBgStyleId;
        document.head.appendChild(styleTag);
    }

    if (background_mobile) {
        styleTag.textContent = `@media (max-width: 768px) { body { background: #e3eaf6 url("${background_mobile}") no-repeat center center; background-size: cover; background-attachment: fixed; } }`;
    } else if (background_desktop) {
        // Use desktop background on mobile if no dedicated asset provided
        styleTag.textContent = `@media (max-width: 768px) { body { background: url("${background_desktop}") no-repeat center center; background-size: cover; background-attachment: fixed; } }`;
    } else {
        styleTag.textContent = '';
    }
}

// --- Load college data from JSON (by page slug) ---
async function loadCollegeData() {
    try {
        currentSlug = resolveSlug();
        if (!currentSlug) throw new Error('Missing college slug.');

        const dataUrl = new URL('./colleges.json', import.meta.url);
        const res = await fetch(dataUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load colleges.json: ${res.status}`);
        const all = await res.json();
        const data = all[currentSlug];
        if (!data) {
            console.warn(`[Colleges] No data found for slug '${currentSlug}' in colleges.json`);
            window.collegeCourses = { title_ar: '', title_en: '', courses: [] };
            return;
        }
        applyBranding(data);
        window.collegeCourses = data;
    } catch (err) {
        console.error('[Colleges] Error loading college data:', err);
        // Graceful fallback
        if (!window.collegeCourses) {
            window.collegeCourses = { title_ar: '', title_en: '', courses: [] };
        }
    }
}

// --- Switch Language ---
window.switchLang = function(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    // Header
    const titleEl = document.getElementById('main-title');
    if (titleEl && window.collegeCourses) {
        titleEl.textContent = isAr ? window.collegeCourses.title_ar : window.collegeCourses.title_en;
    }
    if (window.collegeCourses) {
        document.title = isAr ? window.collegeCourses.title_ar : window.collegeCourses.title_en;
    }
    document.getElementById('nav-home').textContent = isAr ? 'الرئيسية' : 'Home';
    document.getElementById('nav-courses').textContent = isAr ? 'المساقات' : 'Courses';
    document.getElementById('nav-more').textContent = isAr ? 'المزيد ▾' : 'More ▾';
    document.getElementById('nav-about').textContent = isAr ? 'من نحن' : 'About Us';
    document.getElementById('nav-report').textContent = isAr ? 'الإبلاغ عن مشكلة' : 'Report a Problem';
    document.getElementById('lang-label').textContent = isAr ? 'اللغة' : 'Language';

    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = isAr ? 'بحث عن مادة' : 'Search for a course';

    // Courses list
    renderCourses(isAr ? 'ar' : 'en');

    // Footer
    if (typeof renderFooter === 'function') renderFooter(lang);

    // Close all dropdowns on language change
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
}

// --- Render Courses List ---
function renderCourses(langKey) {
    const ul = document.getElementById('courses-ul');
    if (!ul || !window.collegeCourses) return;

    const courses = Array.isArray(window.collegeCourses.courses) ? window.collegeCourses.courses : [];

    ul.innerHTML = "";

    if (courses.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.textContent = langKey === 'ar' ? 'لا توجد بيانات متاحة حالياً.' : 'No data available yet.';
        ul.appendChild(emptyLi);
        return;
    }

    courses.forEach(c => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = c.url;
        a.target = "_blank";
        a.textContent = c[langKey] || c.ar || c.en || '';
        li.appendChild(a);
        ul.appendChild(li);
    });
}

// --- Search in this college ---
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

function performSearch(query) {
    const resultsContainer = document.getElementById('search-results');
    const ul = document.getElementById('courses-ul');
    resultsContainer.innerHTML = "";
    if (!query || !window.collegeCourses || !Array.isArray(window.collegeCourses.courses)) {
        resultsContainer.style.display = "none";
        return;
    }

    const isAr = currentLang === 'ar';
    const key = isAr ? 'ar' : 'en';

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
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');

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

document.addEventListener('DOMContentLoaded', function () {
    (async () => {
        initializeHeader();
        initializeFooter();
        await loadCollegeData();
        initializeSearch();
        switchLang(currentLang);
        if (!window.collegeCourses || !window.collegeCourses.courses) {
            const ul = document.getElementById('courses-ul');
            if (ul) ul.innerHTML = `<li>${currentLang === 'ar' ? 'لا توجد بيانات متاحة حالياً.' : 'No data available yet.'}</li>`;
        }
    })();
});