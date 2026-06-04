const API_URL = "https://protonyx-monorepo-production.up.railway.app";

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function setAuthMessage(el, text, kind) {
  if (!el) return;
  el.textContent = text || "";
  el.classList.remove("error", "success");
  if (kind) el.classList.add(kind);
}

async function login() {
  const usernameInput = document.getElementById("loginUsername");
  const passwordInput = document.getElementById("loginPassword");
  const messageEl = document.getElementById("loginMessage");

  const username = usernameInput ? usernameInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!username || !password) {
    setAuthMessage(messageEl, "Please enter your username or email and password.", "error");
    return;
  }

  setAuthMessage(messageEl, "Signing in…", null);

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const msg = (data && (data.message || data.error)) || "Invalid username/email or password.";
      setAuthMessage(messageEl, msg, "error");
      return;
    }

    if (!data.token) {
      setAuthMessage(messageEl, "Login succeeded but no token was returned.", "error");
      return;
    }

    localStorage.setItem("token", data.token);
    // The identifier the user typed may be an email; overwrite with the real
    // username once loadProfile() fetches the profile.
    localStorage.setItem("username", username);

    await loadProfile();
    window.location.href = "../index.html";
  } catch (err) {
    setAuthMessage(messageEl, "Unable to reach server. Please try again.", "error");
  }
}

async function signup() {
  const usernameInput = document.getElementById("signupUsername");
  const emailInput = document.getElementById("signupEmail");
  const passwordInput = document.getElementById("signupPassword");
  const messageEl = document.getElementById("signupMessage");

  const username = usernameInput ? usernameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!username || !email || !password) {
    setAuthMessage(messageEl, "Please enter a username, email, and password.", "error");
    return;
  }

  setAuthMessage(messageEl, "Creating account…", null);

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const msg = (data && (data.message || data.error)) || "Unable to create account.";
      setAuthMessage(messageEl, msg, "error");
      return;
    }

    setAuthMessage(messageEl, "Account created. Please sign in.", "success");

    if (usernameInput) usernameInput.value = "";
    if (emailInput) emailInput.value = "";
    if (passwordInput) passwordInput.value = "";

    if (typeof switchToLoginTab === "function") {
      switchToLoginTab();
    }
  } catch (err) {
    setAuthMessage(messageEl, "Unable to reach server. Please try again.", "error");
  }
}

// Fetch public beta status from GET /beta/status, which returns
// { success, open, spots_remaining }. No auth required. Returns the parsed
// object on success, or null on any network/parse error so callers can fail
// open (treat a null result as "beta open" and show the signup form).
async function fetchBetaStatus() {
  try {
    const response = await fetch(`${API_URL}/beta/status`);
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.success) return null;
    return data;
  } catch (err) {
    return null;
  }
}

// Fetch the current user's profile from GET /me and mirror the key fields into
// localStorage so pages can render without waiting on a network round-trip.
async function loadProfile() {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_URL}/me`, {
      headers: { ...authHeaders() },
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.user) return null;

    const u = data.user;
    localStorage.setItem("username", u.username || "");
    localStorage.setItem("email", u.email || "");
    localStorage.setItem("plan", u.plan || "free");
    localStorage.setItem("member_since", u.member_since || "");
    localStorage.setItem("beta_access", u.beta_access ? "true" : "false");
    localStorage.setItem("download_count", String(u.download_count ?? 0));
    return u;
  } catch (err) {
    return null;
  }
}

// Check whether the signed-in user has accepted the current Terms of Service.
// If not, shows the blocking TOS modal (from legal-modal.js) and resolves only
// once the user accepts. Resolves immediately when logged out.
//
// Fails open: if GET /legal/status errors for any reason, the user is logged
// (to console) and let through rather than blocked.
async function checkLegalAcceptance() {
  const token = getToken();
  if (!token) return;

  let data;
  try {
    const response = await fetch(`${API_URL}/legal/status`, {
      headers: { ...authHeaders() },
    });

    data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
      console.error("Legal status check failed; allowing through.");
      return;
    }
  } catch (err) {
    console.error("Legal status check failed; allowing through.", err);
    return;
  }

  if (data.tos_accepted) return;

  if (typeof showTosModal === "function") {
    await showTosModal();
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("plan");
  localStorage.removeItem("member_since");
  localStorage.removeItem("beta_access");
  localStorage.removeItem("download_count");
  window.location.href = "/auth/index.html";
}

function checkAuth() {
  const token = getToken();
  const loggedIn = Boolean(token);
  const username = localStorage.getItem("username") || "";

  document.querySelectorAll(".auth-only").forEach((el) => {
    el.classList.toggle("visible", loggedIn);
  });

  document.querySelectorAll(".guest-only").forEach((el) => {
    el.classList.toggle("visible", !loggedIn);
  });

  // Pro-only elements (e.g. the navbar "Professional" badge) show only when the
  // signed-in user's cached plan is "pro". Plan is mirrored to localStorage by
  // loadProfile(); other pages render from that cached value.
  const isPro = loggedIn && (localStorage.getItem("plan") || "").toLowerCase() === "pro";
  document.querySelectorAll(".pro-only").forEach((el) => {
    el.classList.toggle("visible", isPro);
  });

  document.querySelectorAll("[data-username]").forEach((el) => {
    el.textContent = username || "User";
  });

  document.querySelectorAll("[data-logout]").forEach((el) => {
    if (!el.dataset.logoutBound) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
      });
      el.dataset.logoutBound = "true";
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkAuth);
} else {
  checkAuth();
}

window.addEventListener("storage", (e) => {
  if (e.key === "token" || e.key === "username" || e.key === "plan" || e.key === null) {
    checkAuth();
  }
});
