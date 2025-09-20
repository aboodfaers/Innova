const footerContainer = document.getElementById("footer-container");

if (footerContainer) {
    footerContainer.innerHTML = `
    <footer class="footer">
      <div class="footer-links">
        <a href="mailto:innovaahujo@gmail.com"><i class="fas fa-envelope"></i> innovaahujo@gmail.com</a>
        <a href="https://wa.me/962795868995" target="_blank"><i class="fab fa-whatsapp"></i> واتساب</a>
        <a href="https://www.ahu.edu.jo/" target="_blank"><i class="fas fa-globe"></i> موقع الجامعة</a>
        <a href="https://www.facebook.com/groups/431319921578977/?ref=share&mibextid=NSMWBT" target="_blank"><i class="fab fa-facebook"></i> فيسبوك</a>
        <a href="https://www.instagram.com/innovahu" target="_blank"><i class="fab fa-instagram"></i> إنستقرام</a>
      </div>
      <p>تم التصميم والتطوير بواسطة Innova Team - جامعة الحسين بن طلال</p>
      <p>© 2025 PDF_AHU - جميع الحقوق محفوظة</p>
    </footer>
  `;
}