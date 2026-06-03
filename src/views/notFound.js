export function renderNotFound() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <section class="page">
      <p class="eyebrow">404</p>
      <h1>Ruta no encontrada</h1>
      <p class="lead">
        La ruta actual no existe dentro de esta aplicacion.
      </p>
      <a class="button button--primary" href="/home" data-link>Volver al inicio</a>
    </section>
  `;
}