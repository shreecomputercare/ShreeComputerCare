// BEGIN ai-assisted - Cursor Composer
(function () {
  "use strict";
  var root = document.querySelector("[data-carousel]");
  if (!root) return;

  var track = root.querySelector(".carousel-track");
  var slides = root.querySelectorAll(".carousel-slide");
  var dotsBox = root.querySelector(".carousel-dots");
  var prev = root.querySelector(".carousel-prev");
  var next = root.querySelector(".carousel-next");
  var n = slides.length;
  var i = 0;
  var timer;

  function reducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function go(index) {
    i = (index + n) % n;
    track.style.transform = "translateX(-" + i * 100 + "%)";
    var dots = dotsBox.querySelectorAll(".carousel-dot");
    for (var d = 0; d < dots.length; d++) {
      dots[d].classList.toggle("is-active", d === i);
    }
  }

  function resetAutoplay() {
    clearInterval(timer);
    if (reducedMotion() || n < 2) return;
    timer = setInterval(function () {
      go(i + 1);
    }, 7800);
  }

  for (var j = 0; j < n; j++) {
    (function (index) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "carousel-dot" + (index === 0 ? " is-active" : "");
      b.setAttribute("aria-label", "Slide " + (index + 1));
      b.addEventListener("click", function () {
        go(index);
        resetAutoplay();
      });
      dotsBox.appendChild(b);
    })(j);
  }

  prev.addEventListener("click", function () {
    go(i - 1);
    resetAutoplay();
  });
  next.addEventListener("click", function () {
    go(i + 1);
    resetAutoplay();
  });

  resetAutoplay();
})();
// END ai-assisted- Cursor Composer
