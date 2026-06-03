import { renderHome } from "./views/home.js";
import { renderCharacters } from "./views/characters.js";
import { renderChat } from "./views/chat.js";
import { renderAbout } from "./views/about.js";
import { renderNotFound } from "./views/notFound.js";

const routes = {
  "/": renderHome,
  "/home": renderHome,
  "/characters": renderCharacters,
  "/chat": renderChat,
  "/about": renderAbout,
};

function normalizePath(path) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

export function router() {
  const path = normalizePath(window.location.pathname);
  const render = routes[path] || renderNotFound;

  render();
  updateActiveLink(path);
}

export function navigateTo(path) {
  const normalizedPath = normalizePath(path);

  if (window.location.pathname === normalizedPath) {
    return;
  }

  history.pushState(null, "", normalizedPath);
  router();
}

function updateActiveLink(currentPath) {
  const links = document.querySelectorAll("[data-link]");

  links.forEach((link) => {
    const linkPath = normalizePath(new URL(link.href).pathname);
    link.classList.toggle("active", linkPath === currentPath);
  });
}