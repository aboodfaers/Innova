const filesToSearch = [
    { name: "التمريض", file: "Colleges/html/nursing.html" },
    { name: "التربية", file: "Colleges/html/education.html" },
    { name: "السياحة", file: "Colleges/html/tourism.html" },
    { name: "تكنولوجيا المعلومات", file: "Colleges/html/tech.html" },
    { name: "الهندسة", file: "Colleges/html/engineering.html" },
    { name: "الآداب", file: "Colleges/html/arts.html" },
    { name: "القانون", file: "Colleges/html/law.html" },
    { name: "الأعمال", file: "Colleges/html/business.html" },
    { name: "العلوم", file: "Colleges/html/science.html" },
];

const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");

searchInput.addEventListener("keydown", async function (e) {
    if (e.key === "Enter") {
        const query = this.value.trim().toLowerCase();
        resultsContainer.innerHTML = "";

        if (!query) return;

        let matches = [];

        for (const item of filesToSearch) {
            try {
                const response = await fetch(item.file);
                const text = await response.text();
                if (text.toLowerCase().includes(query)) {
                    matches.push(item);
                }
            } catch (err) {
                console.error(`فشل تحميل الملف: ${item.file}`, err);
            }
        }

        if (matches.length === 1) {
            window.location.href = matches[0].file;
        } else if (matches.length > 1) {
            const title = document.createElement("p");
            title.textContent = "نتائج البحث:";
            resultsContainer.appendChild(title);

            matches.forEach((match) => {
                const link = document.createElement("a");
                link.href = match.file;
                link.textContent = `📁 ${match.name}`;
                resultsContainer.appendChild(link);
            });
        } else {
            resultsContainer.innerHTML = "<p>لا توجد نتائج.</p>";
        }
    }
});

document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.innerHTML = "";
    }
});
