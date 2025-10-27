import { initializeFooter } from "./scripts/footer.js";
import { initializeHeader } from "./scripts/header.js";

// Get saved language or default to Arabic
let currentLang = localStorage.getItem('lang') || 'ar';
let collegesMap = {};

async function loadColleges() {
    try {
        const res = await fetch('./Colleges/colleges.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load colleges.json: ${res.status}`);
        collegesMap = await res.json();
    } catch (error) {
        console.error('[Home] Unable to load colleges.json', error);
        collegesMap = {};
    }
}

function renderButtons() {
    const container = document.getElementById('buttons-container');
    if (!container) return;

    container.innerHTML = '';
    const entries = Object.entries(collegesMap);

    entries
        .sort(([, a], [, b]) => (a.order ?? 999) - (b.order ?? 999))
        .forEach(([slug, data]) => {
            const btn = document.createElement('div');
            btn.className = 'button';
            btn.textContent = currentLang === 'ar' ? (data.title_ar || slug) : (data.title_en || slug);
            btn.addEventListener('click', () => {
                window.location.href = `Colleges/college.html?slug=${slug}`;
            });
            container.appendChild(btn);
        });
}

// todo: add language switcher UI and call switchLang on change instead of hardcoding
// --- Language Switcher ---
window.switchLang = function(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    const isAr = lang === 'ar';

    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    // Header
    document.title = isAr ? 'مرجعي - الكليات' : 'Marja3i - Colleges';
    document.getElementById('main-title').textContent = isAr ? 'الكليات' : 'Colleges';
    document.getElementById('nav-home').textContent = isAr ? 'الرئيسية' : 'Home';
    document.getElementById('nav-courses').textContent = isAr ? 'المساقات' : 'Courses';
    document.getElementById('nav-more').textContent = isAr ? 'المزيد ▾' : 'More ▾';
    document.getElementById('nav-about').textContent = isAr ? 'من نحن' : 'About Us';
    document.getElementById('nav-report').textContent = isAr ? 'الإبلاغ عن مشكلة' : 'Report a Problem';
    document.getElementById('lang-label').textContent = isAr ? 'اللغة' : 'Language';

    renderButtons();

    // Search placeholder
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = isAr ? 'بحث عن مادة' : 'Search for a subject';

    // Update footer
    if (typeof renderFooter === 'function') renderFooter(lang);
}

document.addEventListener('DOMContentLoaded', function () {
    (async () => {
        initializeHeader();
        initializeFooter();
        await loadColleges();
        renderButtons();
        switchLang(currentLang);
    })();
});