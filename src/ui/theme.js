const THEME_KEY = "chatPersonajes.theme";

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";

  applyTheme(savedTheme);
  setupThemeToggle();
}

function setupThemeToggle() {
  const button = document.querySelector("[data-theme-toggle]");

  if (!button) return;

  button.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  updateThemeButton(theme);
}

function updateThemeButton(theme) {
  const button = document.querySelector("[data-theme-toggle]");

  if (!button) return;

  const label = theme === "dark" ? "Activar modo claro" : "Activar modo oscuro";

  button.setAttribute("aria-label", label);
  button.setAttribute("title", label);
}