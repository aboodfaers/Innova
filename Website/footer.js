function renderFooter(lang = document.documentElement.lang) {
  const isAr = lang === 'ar';
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
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
}

window.renderFooter = renderFooter;
document.addEventListener('DOMContentLoaded', () => renderFooter(localStorage.getItem('lang') || document.documentElement.lang));
