// Aces Bar & Grill — nav toggle, header shrink, lightbox
(function(){
  var header = document.getElementById('header');
  var toggle = document.getElementById('nav-toggle');
  var navLeft = document.getElementById('nav-left');
  var navRight = document.getElementById('nav-right');

  toggle.addEventListener('click', function(){
    navLeft.classList.toggle('is-open');
    navRight.classList.toggle('is-open');
  });

  Array.prototype.slice.call(document.querySelectorAll('.aces-header__nav a')).forEach(function(a){
    a.addEventListener('click', function(){
      navLeft.classList.remove('is-open');
      navRight.classList.remove('is-open');
    });
  });

  window.addEventListener('scroll', function(){
    if (window.scrollY > 40) header.style.backgroundColor = 'rgba(10,10,10,.97)';
    else header.style.backgroundColor = 'rgba(10,10,10,.85)';
  }, { passive: true });

  // lightbox
  var lightbox = document.getElementById('lightbox');
  var lightboxInner = document.getElementById('lightbox-inner');
  var lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, type){
    lightboxInner.innerHTML = type === 'video'
      ? '<video src="' + src + '" controls autoplay loop muted playsinline></video>'
      : '<img src="' + src + '" alt="">';
    lightbox.classList.add('is-open');
  }
  function closeLightbox(){
    lightbox.classList.remove('is-open');
    lightboxInner.innerHTML = '';
  }

  if (lightbox && lightboxInner && lightboxClose){
    Array.prototype.slice.call(document.querySelectorAll('.aces-gallery__tile')).forEach(function(tile){
      tile.addEventListener('click', function(){
        openLightbox(tile.getAttribute('data-full'), tile.getAttribute('data-type'));
      });
      tile.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
          e.preventDefault();
          openLightbox(tile.getAttribute('data-full'), tile.getAttribute('data-type'));
        }
      });
    });
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e){ if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeLightbox(); });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
