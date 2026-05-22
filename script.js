// ─────────────────────────────────────────────
//  Navbar Logo  (all pages)
//
//  Swap between white/black Protonyx logo as the
//  user scrolls out of a dark hero section.
// ─────────────────────────────────────────────
const navbarLogo = document.getElementById("navbarLogo");
const whiteLogo = "/assets/company/protonyx_full_white.png";
const blackLogo = "/assets/company/protonyx_full_black.png";

let currentLogo = null;

if (navbarLogo) {
  new Image().src = whiteLogo;
  new Image().src = blackLogo;

  // Any background-dark section on the page. The navbar logo goes white
  // whenever the navbar is sitting over one of these.
  const darkSections = Array.from(
    document.querySelectorAll(".landing-hero, .products-hero, .lp-section.dark")
  );

  // Probe just below the floating navbar's baseline; a section "covers" the
  // navbar when its bounding rect straddles this y-coordinate.
  const NAVBAR_PROBE_Y = 80;

  function shouldLogoBeWhite() {
    if (!darkSections.length) return false;
    return darkSections.some((sec) => {
      const rect = sec.getBoundingClientRect();
      return rect.top <= NAVBAR_PROBE_Y && rect.bottom > NAVBAR_PROBE_Y;
    });
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

  setLogo(shouldLogoBeWhite(), false);
  window.addEventListener("scroll", () => setLogo(shouldLogoBeWhite(), true));
  window.addEventListener("resize", () => setLogo(shouldLogoBeWhite(), false));
}


// ─────────────────────────────────────────────
//  Menu Overlay  (all pages)
// ─────────────────────────────────────────────
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

  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) closeMenu();
  });
}


// ─────────────────────────────────────────────
//  Pricing billing-interval toggle  (landing page)
//
//  Switches the Professional plan price between
//  $10 / month and $100 / year. Default is annual.
//  Free plan stays "$0 / forever" regardless.
// ─────────────────────────────────────────────
const pricingToggle = document.querySelector(".pricing-toggle");

if (pricingToggle) {
  const group = pricingToggle.querySelector(".pricing-toggle-group");
  const options = pricingToggle.querySelectorAll(".pricing-toggle-option");
  const priceEls = document.querySelectorAll(".pricing-price[data-annual-amount]");

  function setBillingInterval(interval) {
    if (group) group.dataset.interval = interval;
    priceEls.forEach((el) => {
      const amount = el.dataset[`${interval}Amount`];
      const period = el.dataset[`${interval}Period`];
      el.innerHTML = `${amount}<span>${period}</span>`;
    });
  }

  options.forEach((btn) => {
    btn.addEventListener("click", () => setBillingInterval(btn.dataset.interval));
  });
}


// ─────────────────────────────────────────────
//  Scroll fade-in  (landing page sections)
//
//  Any element with .fade-in animates to visible
//  once it enters the viewport. Guarded so pages
//  without .fade-in elements pay nothing.
// ─────────────────────────────────────────────
const fadeTargets = document.querySelectorAll(".fade-in");

if (fadeTargets.length && "IntersectionObserver" in window) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  fadeTargets.forEach((el) => fadeObserver.observe(el));
}
