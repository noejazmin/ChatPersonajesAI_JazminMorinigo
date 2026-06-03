export function renderCharactersList(characters, activeCharacterId) {
  return `
    <div class="character-grid">
      ${characters.map((character) => renderCharacterCard(character, activeCharacterId)).join("")}
    </div>
  `;
}

function renderCharacterCard(character, activeCharacterId) {
  const isActive = character.id === activeCharacterId;
  const activeClass = isActive ? " character-card--active" : "";
  const buttonText = isActive ? "Seleccionado" : "Elegir";

  return `
    <article class="character-card character-card--${character.id}${activeClass}">
      <div class="character-avatar" aria-hidden="true">${character.avatar}</div>
      <div>
        <p class="eyebrow">${character.franchise}</p>
        <h2>${character.name}</h2>
        <p>${character.description}</p>
      </div>

      <button
        class="button ${isActive ? "button--secondary" : "button--primary"}"
        type="button"
        data-character-id="${character.id}"
      >
        ${buttonText}
      </button>
    </article>
  `;
}