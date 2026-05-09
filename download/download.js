// API_URL is provided by ../auth/auth.js (loaded before this file)

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("downloadButton");
  if (!button) return;

  button.addEventListener("click", () => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${API_URL}/download`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({})
      }).catch(() => {});
    }

    const a = document.createElement("a");
    a.href = "#"; // TODO: replace with actual S3 or GitHub Releases URL
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
});
