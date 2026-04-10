const heroVideoSources = [
  "assets/video/1vector_demo.mp4",
  "assets/video/2city.mp4",
  "assets/video/3codingdemo.mp4",
  "assets/video/4stockmarket.mp4",
  "assets/video/5codingdemo.mp4"
];

let currentHeroVideoIndex = 0;

const heroVideoElement = document.getElementById("heroVideo");

if (heroVideoElement) {
  setInterval(() => {
    currentHeroVideoIndex =
      (currentHeroVideoIndex + 1) % heroVideoSources.length;

    heroVideoElement.src = heroVideoSources[currentHeroVideoIndex];
    heroVideoElement.play();
  }, 4000);
}

const navbarLogo = document.getElementById("navbarLogo");
const whiteLogo = "/assets/company/protonyx_full_white.png";
const blackLogo = "/assets/company/protonyx_full_black.png";

let currentLogo = null;

if (navbarLogo) {
  new Image().src = whiteLogo;
  new Image().src = blackLogo;

  const darkHeroSection = document.querySelector(".hero, .vector-hero, .products-hero");

  function shouldLogoBeWhite() {
    if (!darkHeroSection) return false;
    return window.scrollY < darkHeroSection.offsetHeight - 80;
  }

  function setLogo(isWhite, animate) {
    const target = isWhite ? "white" : "black";
    if (target === currentLogo) return;

    if (animate) {
      navbarLogo.style.opacity = 0;
      setTimeout(() => {
        navbarLogo.src = isWhite ? whiteLogo : blackLogo;
        currentLogo = target;
        navbarLogo.style.opacity = 1;
      }, 200);
    } else {
      navbarLogo.src = isWhite ? whiteLogo : blackLogo;
      currentLogo = target;
    }
  }

  // Set immediately on load (no animation)
  setLogo(shouldLogoBeWhite(), false);

  window.addEventListener("scroll", () => setLogo(shouldLogoBeWhite(), true));
}

const menuButton = document.querySelector(".navbar-menu-button");
const menuOverlay = document.getElementById("menuOverlay");
const menuCloseButton = document.getElementById("menuCloseButton");

const navbar = document.querySelector(".navbar");

function openMenu() {
  menuOverlay.classList.remove("open");
  void menuOverlay.offsetWidth; // force reflow so transitions restart
  menuOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
  if (navbar) navbar.style.opacity = 0;
}

function closeMenu() {
  menuOverlay.classList.remove("open");
  document.body.style.overflow = "";
  if (navbar) navbar.style.opacity = 1;
}

if (menuButton && menuOverlay && menuCloseButton) {
  menuButton.addEventListener("click", openMenu);
  menuCloseButton.addEventListener("click", closeMenu);

  menuOverlay.addEventListener("click", (event) => {
    if (event.target === menuOverlay) closeMenu();
  });
}