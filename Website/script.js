// --- Language Switcher (Arabic/English) ---
function switchLang(lang) {
    if (lang === 'en') {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
        document.getElementById('main-title').textContent = 'Colleges';
        document.getElementById('nav-home').textContent = 'Home';
        document.getElementById('nav-courses').textContent = 'Courses';
        document.getElementById('nav-more').textContent = 'More ▾';
        document.getElementById('nav-about').textContent = 'About Us';
        document.getElementById('nav-report').textContent = 'Report a Problem';
        document.getElementById('lang-label').textContent = 'Language';
        const buttons = [
            "Nursing & Health Sciences",
            "Educational Sciences",
            "Tourism & Archaeology",
            "Information Technology",
            "Engineering",
            "Literature",
            "Law",
            "Business",
            "Science",
            "Exam Simulation",
            "Study Plan"
        ];
        document.querySelectorAll('.button').forEach((btn, i) => {
            btn.textContent = buttons[i];
        });
        document.getElementById('search-input').placeholder = "Search for a subject";
    } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
        document.getElementById('main-title').textContent = 'الكليات';
        document.getElementById('nav-home').textContent = 'الرئيسية';
        document.getElementById('nav-courses').textContent = 'المساقات';
        document.getElementById('nav-more').textContent = 'المزيد ▾';
        document.getElementById('nav-about').textContent = 'من نحن';
        document.getElementById('nav-report').textContent = 'الإبلاغ عن مشكلة';
        document.getElementById('lang-label').textContent = 'اللغة';
        const buttons = [
            "التمريض والعلوم الصحية",
            "كلية العلوم التربوية",
            "السياحة والآثار",
            "تكنولوجيا المعلومات",
            "الهندسة",
            "الآداب",
            "القانون",
            "الأعمال",
            "العلوم",
            "محاكاة الاختبارات",
            "الخطة الدراسية"
        ];
        document.querySelectorAll('.button').forEach((btn, i) => {
            btn.textContent = buttons[i];
        });
        document.getElementById('search-input').placeholder = "بحث عن مادة";
    }
}

// --- Search Functionality ---
const filesToSearch = [
    { name_ar: "التمريض والعلوم الصحية", name_en: "Nursing & Health Sciences", file: "Colleges/html/nursing.html" },
    { name_ar: "كلية العلوم التربوية", name_en: "Educational Sciences", file: "Colleges/html/education.html" },
    { name_ar: "السياحة والآثار", name_en: "Tourism & Archaeology", file: "Colleges/html/tourism.html" },
    { name_ar: "تكنولوجيا المعلومات", name_en: "Information Technology", file: "Colleges/html/tech.html" },
    { name_ar: "الهندسة", name_en: "Engineering", file: "Colleges/html/engineering.html" },
    { name_ar: "الآداب", name_en: "Literature", file: "Colleges/html/arts.html" },
    { name_ar: "القانون", name_en: "Law", file: "Colleges/html/law.html" },
    { name_ar: "الأعمال", name_en: "Business", file: "Colleges/html/business.html" },
    { name_ar: "العلوم", name_en: "Science", file: "Colleges/html/science.html" },
    { name_ar: "محاكاة الاختبارات", name_en: "Exam Simulation", file: "Colleges/html/cbs.html" },
    { name_ar: "الخطة الدراسية", name_en: "Study Plan", file: "Colleges/html/mks.html" }
];

const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");

// Hide search results by default
resultsContainer.style.display = "none";

// Debounce function to limit search calls
function debounce(func, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

// Function to perform search (client-side, by name)
function performSearch(query) {
    resultsContainer.innerHTML = "";
    if (!query) {
        resultsContainer.style.display = "none";
        return;
    }

    // Detect current language
    const isArabic = document.documentElement.lang === "ar";
    const key = isArabic ? "name_ar" : "name_en";
    const lowerQuery = query.toLowerCase();

    // Filter matches
    const matches = filesToSearch.filter(item =>
        item[key].toLowerCase().includes(lowerQuery)
    );

    if (matches.length === 1) {
        window.location.href = matches[0].file;
        return;
    } else if (matches.length > 0) {
        const title = document.createElement("p");
        title.textContent = isArabic ? "نتائج البحث:" : "Search Results:";
        resultsContainer.appendChild(title);

        matches.forEach(match => {
            const link = document.createElement("a");
            link.href = match.file;
            link.textContent = `📁 ${match[key]}`;
            link.style.display = "block";
            resultsContainer.appendChild(link);
        });
    } else {
        resultsContainer.innerHTML = `<p>${isArabic ? "لا توجد نتائج." : "No results found."}</p>`;
    }
    resultsContainer.style.display = "block";
}

// Add input event listener with debounce for instant search
searchInput.addEventListener("input", debounce(() => {
    const query = searchInput.value.trim();
    performSearch(query);
}, 200));

// Hide results when clicking outside
document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.style.display = "none";
    }
});

// Show results when focusing if there is text
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
        // Only on mobile
        if (window.innerWidth <= 900) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('open');
            // Close other open dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== parent) d.classList.remove('open');
            });
        }
    });
});