import { getDefaultCharacter } from "../engine/characters.js";
import {
  loadActiveCharacterId,
  loadHistory,
} from "../storage/localStorage.js";

const initialCharacterId = loadActiveCharacterId() || getDefaultCharacter().id;

const state = {
  status: "idle",
  error: null,
  activeCharacterId: initialCharacterId,
  messages: loadHistory(initialCharacterId),
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

export function setActiveCharacter(characterId) {
  state.activeCharacterId = characterId;
  state.messages = loadHistory(characterId);
  state.status = "idle";
  state.error = null;
}

export function resetChatState() {
  state.status = "idle";
  state.error = null;
  state.messages = [];
}