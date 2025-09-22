// --- Language Switcher ---
function switchLang(lang) {
    if (!window.collegeCourses) return;
    if (lang === 'en') {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        document.getElementById('main-title').textContent = window.collegeCourses.title_en;
        document.getElementById('nav-home').textContent = 'Home';
        document.getElementById('nav-courses').textContent = 'Courses';
        document.getElementById('nav-more').textContent = 'More ▾';
        document.getElementById('nav-about').textContent = 'About Us';
        document.getElementById('nav-report').textContent = 'Report a Problem';
        document.getElementById('lang-label').textContent = 'Language';
        document.getElementById('search-input').placeholder = "Search for a course";
        renderCourses('en');
    } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        document.getElementById('main-title').textContent = window.collegeCourses.title_ar;
        document.getElementById('nav-home').textContent = 'الرئيسية';
        document.getElementById('nav-courses').textContent = 'المساقات';
        document.getElementById('nav-more').textContent = 'المزيد ▾';
        document.getElementById('nav-about').textContent = 'من نحن';
        document.getElementById('nav-report').textContent = 'الإبلاغ عن مشكلة';
        document.getElementById('lang-label').textContent = 'اللغة';
        document.getElementById('search-input').placeholder = "بحث عن مادة";
        renderCourses('ar');
    }
    if (typeof renderFooter === "function") renderFooter(lang);
}

// --- Render Courses List ---
function renderCourses(langKey) {
    const ul = document.getElementById('courses-ul');
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

// --- Search in this college only ---
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
    const isArabic = document.documentElement.lang === "ar";
    const key = isArabic ? "ar" : "en";
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
            div.appendChild(a);
            div.className = "search-result-item";
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
        resultsContainer.innerHTML = `<p>${isArabic ? "لا توجد نتائج." : "No results found."}</p>`;
    }
    resultsContainer.style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    searchInput.addEventListener("input", debounce(() => {
        const query = searchInput.value.trim();
        performSearch(query);
    }, 200));

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = "none";
        }
    });

    searchInput.addEventListener("focus", function () {
        if (this.value.trim() !== "" && resultsContainer.innerHTML.trim() !== "") {
            resultsContainer.style.display = "block";
        }
    });

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function () {
            mainNav.classList.toggle('open');
        });
    }

    // --- Dropdowns on Mobile ---
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

    // Initial render
    switchLang(document.documentElement.lang || 'ar');
});