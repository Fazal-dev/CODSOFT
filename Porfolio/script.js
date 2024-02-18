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

// dark mode toggle
document.addEventListener("DOMContentLoaded", () => {
  const icon = document.getElementById("icon");
  const body = document.body;
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  // Check if the user prefers dark mode
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  // Set initial dark mode state and update icon
  body.classList.toggle("dark", isDarkMode || prefersDarkMode);
  updateIcon(isDarkMode || prefersDarkMode);
  icon.addEventListener("click", (event) => {
    event.preventDefault();
    body.classList.toggle("dark");
    const currentMode = body.classList.contains("dark");
    localStorage.setItem("darkMode", currentMode.toString());
    // Update icon based on the new dark mode state
    updateIcon(currentMode);
  });

  function updateIcon(isDarkMode) {
    icon.src = isDarkMode ? "./img/sun.png" : "./img/moon.png";
    icon.alt = isDarkMode ? "Light Mode Icon" : "Dark Mode Icon";
  }
});
