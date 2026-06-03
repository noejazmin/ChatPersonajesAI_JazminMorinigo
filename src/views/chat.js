export function renderChat() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <section class="page">
      <p class="eyebrow">Chat</p>
      <h1>Conversacion</h1>
      <p class="lead">
        Aca construiremos el chat local antes de conectarlo con Gemini.
      </p>
    </section>
  `;
}