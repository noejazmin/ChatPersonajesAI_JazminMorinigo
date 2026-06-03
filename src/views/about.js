export function renderAbout() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <section class="page">
      <p class="eyebrow">About</p>
      <h1>Sobre el proyecto</h1>
      <p class="lead">
        Esta SPA aplica routing con History API, diseno responsive, manejo de estado,
        consumo seguro de Gemini mediante Vercel Functions y tests unitarios.
      </p>
    </section>
  `;
}