export function renderCharacters() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <section class="page">
      <p class="eyebrow">Personajes</p>
      <h1>Elegi con quien queres hablar</h1>
      <p class="lead">
        Aca vamos a mostrar la galeria de personajes. Primero trabajaremos con Shrek
        y despues sumaremos dos personajes mas.
      </p>
    </section>
  `;
}