/* NAN Portfolio — interactions */
(function(){
  'use strict';

  /* Preloader */
  window.addEventListener('load', function(){
    setTimeout(function(){ document.getElementById('loader').classList.add('done'); }, 700);
  });

  /* Nav scroll */
  var nav = document.getElementById('nav');
  var topBtn = document.getElementById('top');
  window.addEventListener('scroll', function(){
    nav.classList.toggle('scrolled', window.scrollY > 40);
    topBtn.classList.toggle('show', window.scrollY > 600);
  }, {passive:true});
  topBtn.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

  /* Mobile menu */
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function(){ links.classList.toggle('open'); });
  links.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ links.classList.remove('open'); });
  });

  /* Scroll reveal */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  /* Animated counters */
  function animateCount(el){
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1600, start = null;
    function tick(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var cio = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ animateCount(e.target); cio.unobserve(e.target); }
    });
  }, {threshold:0.5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  /* Footer year */
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* Smooth anchor offset for fixed nav */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(ev){
      var id = a.getAttribute('href');
      if(id.length > 1){
        var t = document.querySelector(id);
        if(t){
          ev.preventDefault();
          var y = t.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({top:y, behavior:'smooth'});
        }
      }
    });
  });
})();
