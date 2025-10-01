import { initializeFooter } from "./scripts/footer.js";
import { initializeHeader } from "./scripts/header.js";

// Get saved language or default to Arabic
let currentLang = localStorage.getItem('lang') || 'ar';

// todo: add language switcher UI and call switchLang on change instead of hardcoding
// --- Language Switcher ---
window.switchLang = function(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    const isAr = lang === 'ar';

    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    // Header
    document.getElementById('main-title').textContent = isAr ? 'الكليات' : 'Colleges';
    document.getElementById('nav-home').textContent = isAr ? 'الرئيسية' : 'Home';
    document.getElementById('nav-courses').textContent = isAr ? 'المساقات' : 'Courses';
    document.getElementById('nav-more').textContent = isAr ? 'المزيد ▾' : 'More ▾';
    document.getElementById('nav-about').textContent = isAr ? 'من نحن' : 'About Us';
    document.getElementById('nav-report').textContent = isAr ? 'الإبلاغ عن مشكلة' : 'Report a Problem';
    document.getElementById('lang-label').textContent = isAr ? 'اللغة' : 'Language';

    // Buttons
    const buttons = isAr
        ? ["التمريض والعلوم الصحية", "كلية العلوم التربوية", "السياحة والآثار", "تكنولوجيا المعلومات", "الهندسة", "الآداب", "القانون", "الأعمال", "العلوم", "محاكاة الاختبارات", "الخطة الدراسية"]
        : ["Nursing & Health Sciences", "Educational Sciences", "Tourism & Archaeology", "Information Technology", "Engineering", "Literature", "Law", "Business", "Science", "Exam Simulation", "Study Plan"];
    document.querySelectorAll('.button').forEach((btn, i) => btn.textContent = buttons[i]);

    // Search placeholder
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.placeholder = isAr ? 'بحث عن مادة' : 'Search for a subject';

    // Update footer
    if (typeof renderFooter === 'function') renderFooter();
}

document.addEventListener('DOMContentLoaded', function () {
    initializeHeader();
    initializeFooter();
    switchLang(currentLang);
});