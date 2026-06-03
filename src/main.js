import { router } from "./router.js";
import { setupLinkInterception } from "./navigation.js";

// console.log("Chat Personajes AI iniciado");

window.addEventListener("popstate", router);

setupLinkInterception();
router();