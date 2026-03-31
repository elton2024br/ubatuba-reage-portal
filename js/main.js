document.addEventListener('DOMContentLoaded', function() {
  var menuBtn = document.querySelector('.menu-btn');
  var navOverlay = document.querySelector('.nav-overlay');
  var closeBtn = document.querySelector('.nav-overlay .close-btn');
  
  if (menuBtn && navOverlay) {
    menuBtn.addEventListener('click', function() {
      navOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (closeBtn && navOverlay) {
    closeBtn.addEventListener('click', function() {
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (navOverlay) {
    navOverlay.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  var cookieBanner = document.getElementById('cookie-banner');
  var cookieBtn = document.getElementById('cookie-accept');
  
  if (cookieBanner && cookieBtn) {
    if (localStorage.getItem('cookies_accepted') === 'true') {
      cookieBanner.style.display = 'none';
    }
    cookieBtn.addEventListener('click', function() {
      localStorage.setItem('cookies_accepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  var forms = document.querySelectorAll('form[data-formspree]');
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.submit-btn');
      var originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      
      var formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(function(res) {
        if (res.ok) {
          btn.textContent = 'Enviado com sucesso!';
          btn.style.background = '#22c55e';
          form.reset();
          setTimeout(function() {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
          }, 3000);
        } else {
          btn.textContent = 'Erro. Tente novamente.';
          btn.style.background = '#dc2626';
          btn.disabled = false;
        }
      }).catch(function() {
        btn.textContent = 'Erro. Tente novamente.';
        btn.style.background = '#dc2626';
        btn.disabled = false;
      });
    });
  });
});
