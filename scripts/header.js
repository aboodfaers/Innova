
export function initializeHeader() { 
    const header = document.getElementById('header');
  
    header.innerHTML = `
    <div class="logo">
        <img src="/images/logo.png" alt="Logo">
        <span>Marja3i</span>
    </div>
    <button class="nav-toggle" id="nav-toggle" aria-label="القائمة">
        <i class="fa fa-bars"></i>
    </button>
    <nav id="main-nav">
        <a href="/index.html" id="nav-home">الرئيسية</a>
        <a href="Courses/courses.html" id="nav-courses">المساقات</a>
        <div class="dropdown">
            <a href="#" id="nav-more">المزيد ▾</a>
            <div class="dropdown-content">
                <a href="#" id="nav-about">من نحن</a>
                <a href="/Website/Report/report.html" id="nav-report">الإبلاغ عن مشكلة</a>
            </div>
        </div>
        <div class="dropdown">
            <a href="#" id="lang-switcher"><i class="fa-solid fa-globe"></i> <span id="lang-label">اللغة</span></a>
            <div class="dropdown-content">
                <a href="#" onclick="switchLang('ar'); return false;">العربية</a>
                <a href="#" onclick="switchLang('en'); return false;">English</a>
            </div>
        </div>
    </nav>
    `;

    initMobileNav();
}

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