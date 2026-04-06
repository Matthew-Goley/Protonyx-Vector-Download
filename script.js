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
const whiteLogo = "assets/company/protonyx_full_white.png";
const blackLogo = "assets/company/protonyx_full_black.png";

let currentLogo = "white";

if (navbarLogo) {
  new Image().src = whiteLogo;
  new Image().src = blackLogo;

  window.addEventListener("scroll", () => {
    const heroSection = document.querySelector(".hero");
    if (!heroSection) return;

    const heroHeight = heroSection.offsetHeight;
    const shouldBeWhite = window.scrollY < heroHeight - 80;

    if (shouldBeWhite && currentLogo === "white") return;
    if (!shouldBeWhite && currentLogo === "black") return;

    navbarLogo.style.opacity = 0;

    setTimeout(() => {
      if (shouldBeWhite) {
        navbarLogo.src = whiteLogo;
        currentLogo = "white";
      } else {
        navbarLogo.src = blackLogo;
        currentLogo = "black";
      }

      navbarLogo.style.opacity = 1;
    }, 200);
  });
}

const menuButton = document.querySelector(".navbar-menu-button");
const menuOverlay = document.getElementById("menuOverlay");
const menuCloseButton = document.getElementById("menuCloseButton");

if (menuButton && menuOverlay && menuCloseButton) {
  menuButton.addEventListener("click", () => {
    menuOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  menuCloseButton.addEventListener("click", () => {
    menuOverlay.classList.remove("open");
    document.body.style.overflow = "";
  });

  menuOverlay.addEventListener("click", (event) => {
    if (event.target === menuOverlay) {
      menuOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
}

menuButton.addEventListener("click", () => {
  menuOverlay.classList.add("open");
  document.body.style.overflow = "hidden";

  document.querySelector(".navbar").style.opacity = 0;
});

menuCloseButton.addEventListener("click", () => {
  menuOverlay.classList.remove("open");
  document.body.style.overflow = "";

  document.querySelector(".navbar").style.opacity = 1;
});