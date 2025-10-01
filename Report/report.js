import { initializeFooter } from "../scripts/footer.js";
import { initializeHeader } from "../scripts/header.js";

// Initialize EmailJS
(function () {
  emailjs.init("hwBZtkiS76Yp1Q8wl");
})();

// Send report function
function sendReport(e) {
  e.preventDefault();
  emailjs.sendForm("service_69x2r2u", "template_1fxkzer", "#reportForm")
    .then(response => {
      alert(document.documentElement.lang === "ar" ? "✅ تم إرسال البلاغ بنجاح، شكرًا لك!" : "✅ Report sent successfully, thank you!");
    }, error => {
      alert(document.documentElement.lang === "ar" ? "❌ حدث خطأ، حاول مرة أخرى." : "❌ An error occurred, please try again.");
      console.log(error);
    });
}

// Get saved language or default
let currentLang = localStorage.getItem('lang') || 'ar';

// Language switcher
window.switchLang = function(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const isAr = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = isAr ? 'rtl' : 'ltr';

  // Header links
  document.getElementById('nav-home').textContent = isAr ? 'الرئيسية' : 'Home';
  document.getElementById('nav-courses').textContent = isAr ? 'المساقات' : 'Courses';
  document.getElementById('nav-more').textContent = isAr ? 'المزيد ▾' : 'More ▾';
  document.getElementById('nav-about').textContent = isAr ? 'من نحن' : 'About';
  document.getElementById('nav-report').textContent = isAr ? 'الإبلاغ عن مشكلة' : 'Report a Problem';
  document.getElementById('lang-label').textContent = isAr ? 'اللغة' : 'Language';

  // Form labels
  document.getElementById('form-title').textContent = isAr ? 'إبلاغ عن مشكلة' : 'Report a Problem';
  document.getElementById('label-name').textContent = isAr ? 'الاسم (اختياري)' : 'Name (optional)';
  document.getElementById('name').placeholder = isAr ? 'ادخل اسمك' : 'Enter your name';
  document.getElementById('label-email').textContent = isAr ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)';
  document.getElementById('email').placeholder = isAr ? 'ادخل بريدك الإلكتروني' : 'Enter your email';
  document.getElementById('label-issueType').textContent = isAr ? 'نوع المشكلة' : 'Problem Type';

  let issueType = document.getElementById('issueType');
  issueType.options[0].text = isAr ? '-- اختر نوع المشكلة --' : '-- Select a problem --';
  issueType.options[1].text = isAr ? 'مشكلة في التنقل' : 'Navigation Problem';
  issueType.options[2].text = isAr ? 'محتوى غير صحيح' : 'Wrong Content';
  issueType.options[3].text = isAr ? 'خطأ تقني' : 'Technical Error';
  issueType.options[4].text = isAr ? 'أخرى' : 'Other';

  document.getElementById('label-description').textContent = isAr ? 'وصف المشكلة' : 'Problem Description';
  document.getElementById('description').placeholder = isAr ? 'يرجى وصف المشكلة بالتفصيل...' : 'Describe the problem in detail...';

  document.getElementById('submit-btn').textContent = isAr ? 'إرسال البلاغ' : 'Submit Report';

  // Render footer
  if (typeof renderFooter === 'function') renderFooter(lang);
}

document.addEventListener('DOMContentLoaded', function () {
    initializeHeader();
    initializeFooter();
    switchLang(currentLang);
});