// NAN AI Studio — Portfolio interactions

(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu when a link is tapped
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal-on-scroll animations
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything if IntersectionObserver is unavailable
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Subtle nav shadow on scroll
  var nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 10) {
          nav.style.boxShadow = "0 8px 30px rgba(0,0,0,0.35)";
        } else {
          nav.style.boxShadow = "none";
        }
      },
      { passive: true }
    );
  }
})();
