import { getState } from "../state/appState.js";
import { getCharacterById } from "../engine/characters.js";
import { renderChatUI } from "../ui/renderChat.js";
import { setupChatEvents } from "../controllers/chatController.js";

export function renderChat() {
  const app = document.querySelector("#app");
  const state = getState();
  const character = getCharacterById(state.activeCharacterId);

  app.innerHTML = renderChatUI(state, character);
  setupChatEvents();
}