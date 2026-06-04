import { createInitialMockMessage } from "../engine/mockReplies.js";

export function renderChatUI(state, character) {
  const messagesHtml = state.messages.map(renderMessage).join("");
  const loadingHtml = state.status === "loading" ? renderTypingIndicator(character) : "";
  const errorHtml = state.error ? `<p class="chat-error">${state.error}</p>` : "";

  return `
    <section class="chat-layout">
      <header class="chat-header">
        <div>
          <p class="eyebrow">Chat</p>
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

function renderMessage(message) {
  const className = message.role === "user" ? "message message--user" : "message message--model";
  const author = message.role === "user" ? "Vos" : "Personaje";
  const time = formatMessageTime(message.timestamp);

  return `
    <article class="${className}">
      <p>${message.content}</p>
      <footer class="message-meta">
        <span>${author}</span>
        <time datetime="${message.timestamp}">${time}</time>
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