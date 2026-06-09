export function renderAbout() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <section class="page about-page">
      <h1>Sobre el proyecto</h1>

      <p class="lead">
        Chat Personajes AI es una SPA creada como Proyecto Integrador del modulo M3.
        La aplicacion permite elegir un personaje ficticio y conversar con el mediante
        respuestas generadas por inteligencia artificial.
      </p>

      <div class="about-content">
        <article class="about-block">
          <h2>Idea principal</h2>
          <p>
            El objetivo fue construir una experiencia simple, visual y entretenida:
            el usuario elige un personaje, inicia una charla y recibe respuestas con
            un tono adaptado a la personalidad seleccionada.
          </p>
        </article>

        <article class="about-block">
          <h2>Personajes</h2>
          <p>
            La app incluye a Shrek, Tyrion Lannister y Tommy Shelby. Cada uno tiene
            una personalidad, un tono de respuesta, una presentacion inicial y un
            estilo visual propio dentro de la interfaz.
          </p>
        </article>

        <article class="about-block">
          <h2>Tecnologias usadas</h2>
          <p>
            El proyecto fue desarrollado con HTML, CSS y JavaScript modular. Tambien
            usa History API para la navegacion SPA, localStorage para persistir datos,
            Vercel Functions para proteger la API key y Gemini API para generar las
            respuestas del chat.
          </p>
        </article>

        <article class="about-block">
          <h2>Datos del desarrollo</h2>
          <p>
            Se trabajo con enfoque mobile first, rutas internas, manejo de estado,
            historial por personaje, modo claro/oscuro, mensajes copiables, tests
            unitarios y deploy en Vercel.
          </p>
        </article>
      </div>
    </section>
  `;
}