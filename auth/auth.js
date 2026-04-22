const API_URL = "http://localhost:3000";

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
    setAuthMessage(messageEl, "Please enter both username and password.", "error");
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
      const msg = (data && data.error) || "Invalid username or password.";
      setAuthMessage(messageEl, msg, "error");
      return;
    }

    if (!data.token) {
      setAuthMessage(messageEl, "Login succeeded but no token was returned.", "error");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);
    window.location.href = "../index.html";
  } catch (err) {
    setAuthMessage(messageEl, "Unable to reach server. Please try again.", "error");
  }
}

async function signup() {
  const usernameInput = document.getElementById("signupUsername");
  const passwordInput = document.getElementById("signupPassword");
  const messageEl = document.getElementById("signupMessage");

  const username = usernameInput ? usernameInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!username || !password) {
    setAuthMessage(messageEl, "Please enter both username and password.", "error");
    return;
  }

  setAuthMessage(messageEl, "Creating account…", null);

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const msg = (data && data.error) || "Unable to create account.";
      setAuthMessage(messageEl, msg, "error");
      return;
    }

    setAuthMessage(messageEl, "Account created. Please sign in.", "success");

    if (usernameInput) usernameInput.value = "";
    if (passwordInput) passwordInput.value = "";

    if (typeof switchToLoginTab === "function") {
      switchToLoginTab();
    }
  } catch (err) {
    setAuthMessage(messageEl, "Unable to reach server. Please try again.", "error");
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
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
  if (e.key === "token" || e.key === "username" || e.key === null) {
    checkAuth();
  }
});
