import { getState, setState, resetChatState } from "../state/appState.js";
import {
    appendCharacterMessage,
    appendUserMessage,
    clearHistory,
} from "../engine/history.js";
import { getCharacterById } from "../engine/characters.js";
import { renderChat } from "../views/chat.js";
import {
    clearStoredHistory,
    saveHistory,
} from "../storage/localStorage.js";
import { sendMessageToAI } from "../services/chatApi.js";
import { createInitialMockMessage } from "../engine/mockReplies.js";
import {
  getMessageValidationError,
  isValidMessage,
} from "../engine/validation.js";

export function setupChatEvents() {
    const form = document.querySelector("[data-chat-form]");
    const clearButton = document.querySelector("[data-clear-chat]");
    const copyButtons = document.querySelectorAll("[data-copy-message]");

    if (!form) return;

    form.addEventListener("submit", handleSubmit);

    if (clearButton) {
    clearButton.addEventListener("click", handleClearChat);
    }

    copyButtons.forEach((button) => {
        button.addEventListener("click", handleCopyMessage);
    });
}

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);
  const message = String(formData.get("message") || "").trim();

if (!isValidMessage(message)) {
  setState({
    status: "error",
    error: getMessageValidationError(message),
  });

  renderChat();
  focusChatInput();
  return;
}

  const state = getState();
  const character = getCharacterById(state.activeCharacterId);
  const initialMessages =
  state.messages.length === 0
    ? appendCharacterMessage(state.messages, createInitialMockMessage(character))
    : state.messages;

  const withUserMessage = appendUserMessage(initialMessages, message);
  
  setState({
    status: "loading",
    error: null,
    messages: withUserMessage,
  });

  form.reset();
  renderChat();
  scrollMessagesToBottom();

  try {
    const aiResponse = await sendMessageToAI(character, withUserMessage);
    const withCharacterMessage = appendCharacterMessage(
      withUserMessage,
      aiResponse.text
    );

    setState({
      status: "idle",
      error: null,
      messages: withCharacterMessage,
    });

    saveHistory(character.id, withCharacterMessage);
  } catch (error) {
  setState({
    status: "error",
    error: error.message || "No se pudo obtener respuesta del personaje. Intenta nuevamente.",
    messages: state.messages,
  });
  }

  renderChat();
  scrollMessagesToBottom();
  focusChatInput();
}

function handleClearChat() {
    const state = getState();

    resetChatState();
    clearStoredHistory(state.activeCharacterId);

    setState({
        messages: clearHistory(),
    });

    renderChat();
}

async function handleCopyMessage(event) {
  const button = event.currentTarget;
  const index = Number(button.dataset.copyMessage);
  const state = getState();
  const message = state.messages[index];

  if (!message) return;

  const copied = await copyText(message.content);

  if (!copied) return;

  button.classList.add("copy-message--copied");
  button.setAttribute("aria-label", "Respuesta copiada");

  setTimeout(() => {
    button.classList.remove("copy-message--copied");
    button.setAttribute("aria-label", "Copiar respuesta");
  }, 1600);
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopyText(text);
    }
  }

  return fallbackCopyText(text);
}

function fallbackCopyText(text) {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";

  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  return copied;
}

function scrollMessagesToBottom() {
    const messages = document.querySelector("[data-messages]");
    
    if (messages) {
        messages.scrollTop = messages.scrollHeight;
    }
}

function focusChatInput() {
  const input = document.querySelector(".chat-input");

  if (input && !input.disabled) {
    input.focus();
  }
}