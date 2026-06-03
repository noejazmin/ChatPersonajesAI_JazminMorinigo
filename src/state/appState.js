import { getDefaultCharacter } from "../engine/characters.js";

const state = {
  status: "idle",
  error: null,
  activeCharacterId: getDefaultCharacter().id,
  messages: [],
};

export function getState() {
  return {
    ...state,
    messages: [...state.messages],
  };
}

export function setState(updates) {
  Object.assign(state, updates);
}

export function resetChatState() {
  state.status = "idle";
  state.error = null;
  state.messages = [];
}