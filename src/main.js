import { router } from "./router.js";
import { setupLinkInterception } from "./navigation.js";
import { initTheme } from "./ui/theme.js";

// console.log("Chat Personajes AI iniciado");

window.addEventListener("popstate", router);

setupLinkInterception();
initTheme();
router();