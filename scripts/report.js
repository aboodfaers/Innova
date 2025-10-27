import { initializeFooter } from "./footer.js";
import { initializeHeader, updateNavigationLabels } from "./header.js";

(function () {
  emailjs.init("hwBZtkiS76Yp1Q8wl");
})();

function sendReport(event) {
  event.preventDefault();
  emailjs
    .sendForm("service_69x2r2u", "template_1fxkzer", "#reportForm")
    .then(() => {
      alert(document.documentElement.lang === "ar" ? "✅ تم إرسال البلاغ بنجاح، شكرًا لك!" : "✅ Report sent successfully, thank you!");
    })
    .catch(error => {
      alert(document.documentElement.lang === "ar" ? "❌ حدث خطأ، حاول مرة أخرى." : "❌ An error occurred, please try again.");
      console.log(error);
    });
}

window.sendReport = sendReport;

let currentLang = localStorage.getItem("lang") || document.documentElement.lang || "ar";

function updateFormLabels(lang) {
  const isAr = lang === "ar";

  const formTitle = document.getElementById("form-title");
  if (formTitle) formTitle.textContent = isAr ? "إبلاغ عن مشكلة" : "Report a Problem";

  const labelName = document.getElementById("label-name");
  if (labelName) labelName.textContent = isAr ? "الاسم (اختياري)" : "Name (optional)";

  const nameInput = document.getElementById("name");
  if (nameInput) nameInput.placeholder = isAr ? "ادخل اسمك" : "Enter your name";

  const labelEmail = document.getElementById("label-email");
  if (labelEmail) labelEmail.textContent = isAr ? "البريد الإلكتروني (اختياري)" : "Email (optional)";

  const emailInput = document.getElementById("email");
  if (emailInput) emailInput.placeholder = isAr ? "ادخل بريدك الإلكتروني" : "Enter your email";

  const labelIssueType = document.getElementById("label-issueType");
  if (labelIssueType) labelIssueType.textContent = isAr ? "نوع المشكلة" : "Problem Type";

  const issueType = document.getElementById("issueType");
  if (issueType && issueType.options.length >= 5) {
    issueType.options[0].text = isAr ? "-- اختر نوع المشكلة --" : "-- Select a problem --";
    issueType.options[1].text = isAr ? "مشكلة في التنقل" : "Navigation Problem";
    issueType.options[2].text = isAr ? "محتوى غير صحيح" : "Wrong Content";
    issueType.options[3].text = isAr ? "خطأ تقني" : "Technical Error";
    issueType.options[4].text = isAr ? "أخرى" : "Other";
  }

  const labelDescription = document.getElementById("label-description");
  if (labelDescription) labelDescription.textContent = isAr ? "وصف المشكلة" : "Problem Description";

  const description = document.getElementById("description");
  if (description) description.placeholder = isAr ? "يرجى وصف المشكلة بالتفصيل..." : "Describe the problem in detail...";

  const submitBtn = document.getElementById("submit-btn");
  if (submitBtn) submitBtn.textContent = isAr ? "إرسال البلاغ" : "Submit Report";
}

window.switchLang = function (lang) {
  currentLang = lang === "en" ? "en" : "ar";
  localStorage.setItem("lang", currentLang);

  const isAr = currentLang === "ar";
  document.documentElement.lang = currentLang;
  document.documentElement.dir = isAr ? "rtl" : "ltr";

  updateNavigationLabels(currentLang);
  updateFormLabels(currentLang);

  if (typeof renderFooter === "function") {
    renderFooter(currentLang);
  }

  document.querySelectorAll(".dropdown").forEach(drop => drop.classList.remove("open"));
};

document.addEventListener("DOMContentLoaded", () => {
  initializeHeader();
  initializeFooter();
  window.switchLang(currentLang);
});
