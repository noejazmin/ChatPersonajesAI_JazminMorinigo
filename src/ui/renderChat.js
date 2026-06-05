import { createInitialMockMessage } from "../engine/mockReplies.js";

export function renderChatUI(state, character) {
  const messagesHtml = state.messages.map(renderMessage).join("");
  const loadingHtml = state.status === "loading" ? renderTypingIndicator(character) : "";
  const errorHtml = state.error ? `<p class="chat-error">${state.error}</p>` : "";

  return `
    <section class="chat-layout chat-layout--${character.id}">
      <header class="chat-header">
        <div>
          <h1>${character.name}</h1>
          <p class="lead">${character.description}</p>
        </div>
      </header>

      <div class="chat-panel">
        <div class="messages" data-messages>
          ${messagesHtml || renderEmptyState(character)}
          ${loadingHtml}
        </div>

        ${errorHtml}

        <form class="chat-form" data-chat-form>
          <input
            class="chat-input"
            name="message"
            type="text"
            placeholder="Escribi tu mensaje..."
            autocomplete="off"
            ${state.status === "loading" ? "disabled" : ""}
          />

          <button class="button button--primary" type="submit" ${state.status === "loading" ? "disabled" : ""}>
            Enviar
          </button>

          <button class="button button--secondary" type="button" data-clear-chat>
            Borrar
          </button>
        </form>
      </div>
    </section>
  `;
}

function renderMessage(message, index) {
  const className = message.role === "user" ? "message message--user" : "message message--model";
  const author = message.role === "user" ? "Vos" : "Personaje";
  const time = formatMessageTime(message.timestamp);
  const copyButton =
  message.role === "model"
    ? `
      <button class="copy-message" type="button" data-copy-message="${index}" aria-label="Copiar respuesta">
        <span class="copy-icon copy-icon--copy" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <rect x="8" y="8" width="11" height="11" rx="2"></rect>
            <path d="M5 15V6a2 2 0 0 1 2-2h9"></path>
          </svg>
        </span>
        <span class="copy-icon copy-icon--check" aria-hidden="true">
          <svg viewBox="0 0 24 24" focusable="false">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </span>
      </button>
    `
    : "";

  return `
    <article class="${className}">
      <p>${message.content}</p>
      <footer class="message-meta">
        <span>${author}</span>
        <div class="message-actions">
          <time datetime="${message.timestamp}">${time}</time>
          ${copyButton}
        </div>
      </footer>
    </article>
  `;
}

function renderEmptyState(character) {
  return `
    <article class="message message--model">
      <p>${createInitialMockMessage(character)}</p>
    </article>
  `;
}

function renderTypingIndicator(character) {
  return `
    <article class="message message--model">
      <p>${character.name} esta escribiendo...</p>
    </article>
  `;
}

function formatMessageTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}