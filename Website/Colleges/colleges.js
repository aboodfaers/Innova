import { initializeFooter } from "../scripts/footer.js";
import { initializeHeader } from "../scripts/header.js";

// --- Global Language ---
let currentLang = localStorage.getItem('lang') || 'ar';

// --- Switch Language ---
window.switchLang = function(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    const isAr = lang === 'ar';
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';

    // Header
    document.getElementById('main-title').textContent = isAr ? window.collegeCourses.title_ar : window.collegeCourses.title_en;
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

    ul.innerHTML = "";
    window.collegeCourses.courses.forEach(c => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = c.url;
        a.target = "_blank";
        a.textContent = c[langKey];
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
    if (!query) {
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
    initializeHeader();
    initializeFooter();
    initializeSearch();
    switchLang(currentLang);
});