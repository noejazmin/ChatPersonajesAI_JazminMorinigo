import { characters } from "../engine/characters.js";
import { getState, setState } from "../state/appState.js";
import { renderCharactersList } from "../ui/renderCharacters.js";
import { navigateTo } from "../router.js";

export function renderCharacters() {
  const app = document.querySelector("#app");
  const state = getState();

  app.innerHTML = `
    <section class="page">
      <p class="eyebrow">Personajes</p>
      <h1>Elegi con quien queres hablar</h1>
      <p class="lead">
        Cada personaje tiene su propio tono, personalidad y estilo de respuesta.
      </p>

      ${renderCharactersList(characters, state.activeCharacterId)}
    </section>
  `;

  setupCharacterSelection();
}

function setupCharacterSelection() {
  const buttons = document.querySelectorAll("[data-character-id]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const characterId = button.dataset.characterId;

      setState({
        activeCharacterId: characterId,
        messages: [],
        status: "idle",
        error: null,
      });

      navigateTo("/chat");
    });
  });
}