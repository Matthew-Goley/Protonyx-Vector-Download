// legal-modal.js
// Blocking Terms of Service acceptance modal. Shown when GET /legal/status
// reports the signed-in user has not accepted the current TOS version.
//
// Depends on globals from auth/auth.js: API_URL, authHeaders(), logout().
// Load this file after auth/auth.js.
//
// The modal cannot be dismissed by backdrop click, Escape, or a close button.
// The only way out is a successful POST /legal/accept.

(function () {
  let activeOverlay = null;

  // Swallow Escape while the modal is open so other Escape handlers (e.g. the
  // menu overlay) can't tear it down. Capture phase so we win the race.
  function blockEscape(e) {
    if (activeOverlay && e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  // Show the blocking TOS modal. Returns a promise that resolves once the user
  // successfully accepts. `onAccept` is an optional callback fired on success.
  function showTosModal(onAccept) {
    // Guard against stacking duplicate modals.
    if (activeOverlay) return Promise.resolve();

    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      activeOverlay = overlay;
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-modal", "true");
      overlay.setAttribute("aria-labelledby", "legalModalTitle");
      overlay.style.cssText = [
        "position: fixed",
        "inset: 0",
        "z-index: 99999",
        "display: flex",
        "align-items: center",
        "justify-content: center",
        "padding: 1.5rem",
        "background: rgba(11, 16, 32, 0.72)",
        "backdrop-filter: blur(4px)",
        "-webkit-backdrop-filter: blur(4px)",
      ].join(";");

      const card = document.createElement("div");
      card.style.cssText = [
        "width: 100%",
        "max-width: 460px",
        "background: var(--bg-base)",
        "color: var(--text-primary)",
        "border: 1px solid var(--border)",
        "border-radius: 14px",
        "padding: 2rem",
        "font-family: 'IBM Plex Mono', monospace",
        "box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45)",
      ].join(";");

      const title = document.createElement("h2");
      title.id = "legalModalTitle";
      title.textContent = "Terms of Service";
      title.style.cssText = "margin: 0 0 0.75rem; font-size: 1.5rem;";

      const message = document.createElement("p");
      message.textContent =
        "We've updated our Terms of Service. Please review and accept to continue.";
      message.style.cssText = "margin: 0 0 1.25rem; line-height: 1.6;";

      const reviewLink = document.createElement("a");
      reviewLink.href = "/tos";
      reviewLink.target = "_blank";
      reviewLink.rel = "noopener noreferrer";
      reviewLink.textContent = "Review the Terms of Service";
      reviewLink.style.cssText = [
        "display: inline-block",
        "margin-bottom: 1.5rem",
        "color: #2a6b9a",
        "font-weight: 600",
        "text-decoration: underline",
      ].join(";");

      const errorEl = document.createElement("p");
      errorEl.style.cssText =
        "margin: 0 0 1rem; color: #c0392b; font-size: 0.85rem; min-height: 1.1em;";

      const agreeBtn = document.createElement("button");
      agreeBtn.type = "button";
      agreeBtn.textContent = "I Agree";
      agreeBtn.style.cssText = [
        "display: inline-flex",
        "align-items: center",
        "justify-content: center",
        "width: 100%",
        "padding: 0.85rem 1.8rem",
        "background: var(--grad)",
        "color: #fff",
        "border: none",
        "border-radius: 10px",
        "font-family: 'IBM Plex Mono', monospace",
        "font-weight: 600",
        "font-size: 1rem",
        "cursor: pointer",
      ].join(";");

      function setError(text) {
        errorEl.textContent = text || "";
      }

      function dismiss() {
        document.removeEventListener("keydown", blockEscape, true);
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
        document.body.style.overflow = "";
        activeOverlay = null;
      }

      async function handleAgree() {
        agreeBtn.disabled = true;
        agreeBtn.style.opacity = "0.6";
        agreeBtn.style.cursor = "default";
        setError("");

        try {
          const response = await fetch(`${API_URL}/legal/accept`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeaders() },
            body: JSON.stringify({ document: "tos" }),
          });

          // Expired/invalid session: bounce to login rather than trapping them.
          if (response.status === 401) {
            if (typeof logout === "function") logout();
            else window.location.href = "/auth/index.html";
            return;
          }

          const data = await response.json().catch(() => ({}));

          if (!response.ok || !data.success) {
            const msg =
              (data && (data.message || data.error)) ||
              "Something went wrong. Please try again.";
            setError(msg);
            agreeBtn.disabled = false;
            agreeBtn.style.opacity = "";
            agreeBtn.style.cursor = "pointer";
            return;
          }

          dismiss();
          if (typeof onAccept === "function") onAccept();
          resolve();
        } catch (err) {
          // Network failure: keep the modal open and let them retry.
          setError("Unable to reach server. Please try again.");
          agreeBtn.disabled = false;
          agreeBtn.style.opacity = "";
          agreeBtn.style.cursor = "pointer";
        }
      }

      agreeBtn.addEventListener("click", handleAgree);

      // Backdrop clicks are intentionally inert: acceptance is mandatory.
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) e.stopPropagation();
      });

      card.appendChild(title);
      card.appendChild(message);
      card.appendChild(reviewLink);
      card.appendChild(errorEl);
      card.appendChild(agreeBtn);
      overlay.appendChild(card);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", blockEscape, true);
    });
  }

  window.showTosModal = showTosModal;
})();
