// Get saved language or default to Arabic
let currentLang = localStorage.getItem('lang') || 'ar';

// --- Language Switcher ---
function switchLang(lang) {
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

// --- Mobile nav & dropdowns ---
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
    }

    document.querySelectorAll('.dropdown > a').forEach(drop => {
        drop.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('open');
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== parent) d.classList.remove('open');
                });
            }
        });
    });
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', function () {
    switchLang(currentLang);
    initMobileNav();
});
