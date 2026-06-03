import { getState, setState, resetChatState } from "../state/appState.js";
import {
  appendCharacterMessage,
  appendUserMessage,
  clearHistory,
} from "../engine/history.js";
import { getCharacterById } from "../engine/characters.js";
import { renderChat } from "../views/chat.js";

export function setupChatEvents() {
  const form = document.querySelector("[data-chat-form]");
  const clearButton = document.querySelector("[data-clear-chat]");

  if (!form) return;

  form.addEventListener("submit", handleSubmit);

  if (clearButton) {
    clearButton.addEventListener("click", handleClearChat);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const message = String(formData.get("message") || "").trim();

  if (!message) return;

  const state = getState();
  const character = getCharacterById(state.activeCharacterId);

  const withUserMessage = appendUserMessage(state.messages, message);
  const withCharacterMessage = appendCharacterMessage(
    withUserMessage,
    createLocalCharacterReply(character, message)
  );

  setState({
    status: "idle",
    error: null,
    messages: withCharacterMessage,
  });

  form.reset();
  renderChat();
  scrollMessagesToBottom();
}

function handleClearChat() {
  resetChatState();

  setState({
    messages: clearHistory(),
  });

  renderChat();
}

function createLocalCharacterReply(character, message) {
  return `${character.name}: Te escuche decir "${message}". Todavia no estoy conectado a Gemini, pero ya estoy calentando el pantano.`;
}

function scrollMessagesToBottom() {
  const messages = document.querySelector("[data-messages]");

  if (messages) {
    messages.scrollTop = messages.scrollHeight;
  }
}