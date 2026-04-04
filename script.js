const heroVideoSources = [
  "assets/video/1vector_demo.mp4",
  "assets/video/2city.mp4",
  "assets/video/3codingdemo.mp4",
  "assets/video/4stockmarket.mp4",
  "assets/video/5codingdemo.mp4"
];

let currentHeroVideoIndex = 0;

const heroVideoElement = document.getElementById("heroVideo");

setInterval(() => {
  currentHeroVideoIndex =
    (currentHeroVideoIndex + 1) % heroVideoSources.length;

  heroVideoElement.src = heroVideoSources[currentHeroVideoIndex];
  heroVideoElement.play();
}, 4000);

const navbarLogo = document.getElementById("navbarLogo");

const whiteLogo = "assets/company/protonyx_full_white.png";
const blackLogo = "assets/company/protonyx_full_black.png";

let currentLogo = "white"; // track state

window.addEventListener("scroll", () => {
  const heroHeight = document.querySelector(".hero").offsetHeight;

  const shouldBeWhite = window.scrollY < heroHeight - 80;

  // prevent unnecessary swaps (IMPORTANT for smoothness)
  if (shouldBeWhite && currentLogo === "white") return;
  if (!shouldBeWhite && currentLogo === "black") return;

  // fade out
  navbarLogo.style.opacity = 0;

  setTimeout(() => {
    // swap image
    if (shouldBeWhite) {
      navbarLogo.src = whiteLogo;
      currentLogo = "white";
    } else {
      navbarLogo.src = blackLogo;
      currentLogo = "black";
    }

    // fade back in
    navbarLogo.style.opacity = 1;
  }, 200); // match CSS transition
});

new Image().src = whiteLogo;
new Image().src = blackLogo;