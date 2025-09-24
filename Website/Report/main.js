(function() {
  emailjs.init("hwBZtkiS76Yp1Q8wl");
})();

function sendReport(e) {
  e.preventDefault();

  emailjs.sendForm("service_69x2r2u", "template_1fxkzer", "#reportForm")
    .then(function(response) {
      alert(document.documentElement.lang === "ar" ? "✅ تم إرسال البلاغ بنجاح، شكرًا لك!" : "✅ Report sent successfully, thank you!");
    }, function(error) {
      alert(document.documentElement.lang === "ar" ? "❌ حدث خطأ، حاول مرة أخرى." : "❌ An error occurred, please try again.");
      console.log(error);
    });
}

// Responsive nav toggle for mobile
document.addEventListener('DOMContentLoaded', function() {
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('main-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('show');
    });
  }
  // Render footer and language on load
  const lang = localStorage.getItem('lang') || document.documentElement.lang;
  switchLang(lang);
});

function renderFooter(lang = document.documentElement.lang) {
  const isAr = lang === 'ar';
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) {
    console.log('footer-container not found!');
    return;
  }
  footerContainer.innerHTML = `
    <footer class="footer">
      <div class="footer-links">
        <a href="mailto:innovaahujo@gmail.com"><i class="fas fa-envelope"></i> innovaahujo@gmail.com</a>
        <a href="https://wa.me/962795868995" target="_blank"><i class="fab fa-whatsapp"></i> ${isAr ? "واتساب" : "WhatsApp"}</a>
        <a href="https://www.ahu.edu.jo/" target="_blank"><i class="fas fa-globe"></i> ${isAr ? "موقع الجامعة" : "University Website"}</a>
        <a href="https://www.facebook.com/groups/431319921578977/?ref=share&mibextid=NSMWBT" target="_blank"><i class="fab fa-facebook"></i> ${isAr ? "فيسبوك" : "Facebook"}</a>
        <a href="https://www.instagram.com/innovahu" target="_blank"><i class="fab fa-instagram"></i> ${isAr ? "إنستقرام" : "Instagram"}</a>
      </div>
      <p>${isAr ? "تم التصميم والتطوير بواسطة Innova Team - جامعة الحسين بن طلال" : "Designed and developed by Innova Team - Al-Hussein Bin Talal University"}</p>
      <p>© 2025 Innova Team - ${isAr ? "جميع الحقوق محفوظة" : "All rights reserved"}</p>
    </footer>`;
}

function switchLang(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  localStorage.setItem('lang', lang);

  // الهيدر
  document.getElementById('nav-home').textContent = lang === 'ar' ? 'الرئيسية' : 'Home';
  document.getElementById('nav-courses').textContent = lang === 'ar' ? 'المساقات' : 'Courses';
  document.getElementById('nav-more').innerHTML = lang === 'ar' ? 'المزيد ▾' : 'More ▾';
  document.getElementById('nav-about').textContent = lang === 'ar' ? 'من نحن' : 'About';
  document.getElementById('nav-report').textContent = lang === 'ar' ? 'الإبلاغ عن مشكلة' : 'Report a Problem';
  document.getElementById('lang-label').textContent = lang === 'ar' ? 'اللغة' : 'Language';

  // عنوان الصفحة
  document.getElementById('form-title').textContent = lang === 'ar' ? 'إبلاغ عن مشكلة' : 'Report a Problem';

  // الفورم
  document.getElementById('label-name').textContent = lang === 'ar' ? 'الاسم (اختياري)' : 'Name (optional)';
  document.getElementById('name').placeholder = lang === 'ar' ? 'ادخل اسمك' : 'Enter your name';

  document.getElementById('label-email').textContent = lang === 'ar' ? 'البريد الإلكتروني (اختياري)' : 'Email (optional)';
  document.getElementById('email').placeholder = lang === 'ar' ? 'ادخل بريدك الإلكتروني' : 'Enter your email';

  document.getElementById('label-issueType').textContent = lang === 'ar' ? 'نوع المشكلة' : 'Problem Type';
  let issueType = document.getElementById('issueType');
  issueType.options[0].text = lang === 'ar' ? '-- اختر نوع المشكلة --' : '-- Select a problem --';
  issueType.options[1].text = lang === 'ar' ? 'مشكلة تسجيل الدخول' : 'Login Issue';
  issueType.options[2].text = lang === 'ar' ? 'مشكلة في التنقل' : 'Navigation Problem';
  issueType.options[3].text = lang === 'ar' ? 'محتوى غير صحيح' : 'Wrong Content';
  issueType.options[4].text = lang === 'ar' ? 'خطأ تقني' : 'Technical Error';
  issueType.options[5].text = lang === 'ar' ? 'أخرى' : 'Other';

  document.getElementById('label-description').textContent = lang === 'ar' ? 'وصف المشكلة' : 'Problem Description';
  document.getElementById('description').placeholder = lang === 'ar' ? 'يرجى وصف المشكلة بالتفصيل...' : 'Describe the problem in detail...';

  document.getElementById('submit-btn').textContent = lang === 'ar' ? 'إرسال البلاغ' : 'Submit Report';

  // الفوتر
  renderFooter(lang);
}