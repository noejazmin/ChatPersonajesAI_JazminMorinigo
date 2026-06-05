import { characters } from "../engine/characters.js";
import { getState, setActiveCharacter } from "../state/appState.js";
import { renderCharactersList } from "../ui/renderCharacters.js";
import { navigateTo } from "../router.js";
import { saveActiveCharacterId } from "../storage/localStorage.js";

export function renderCharacters() {
  const app = document.querySelector("#app");
  const state = getState();

  app.innerHTML = `
    <section class="page">
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

        setActiveCharacter(characterId);
        saveActiveCharacterId(characterId);

      navigateTo("/chat");
    });
  });
}