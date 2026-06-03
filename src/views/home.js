export function renderHome() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <section class="home">
      <p class="eyebrow">Proyecto Integrador M3</p>
      <h1>Chatea con personajes ficticios usando IA</h1>
      <p class="lead">
        Elegi un personaje, inicia una conversacion y disfruta una experiencia
        interactiva con respuestas generadas por inteligencia artificial.
      </p>

      <div class="actions">
        <a class="button button--primary" href="/characters" data-link>Elegir personaje</a>
        <a class="button button--secondary" href="/chat" data-link>Ir al chat</a>
      </div>
    </section>
  `;
}