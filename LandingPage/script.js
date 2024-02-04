"use strict";
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for anchor links
  let links = document.querySelectorAll(".nav-link");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      let hash = this.hash;

      if (hash !== "") {
        event.preventDefault();

        let targetElement = document.querySelector(hash);

        let distanceToScroll = targetElement.offsetTop;

        scrollTo(document.documentElement, distanceToScroll, 800);

        history.pushState(null, null, hash);
      }
    });
  });

  // Function for smooth scrolling animation
  function scrollTo(element, to, duration) {
    let start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    let animateScroll = function () {
      currentTime += increment;
      let val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
});
//revel pages when scrolling
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElement = document.querySelectorAll(".hidden");
hiddenElement.forEach((el) => {
  observer.observe(el);
});
