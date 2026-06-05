import { describe, expect, it } from "vitest";
import { getDefaultCharacter } from "../src/engine/characters.js";
import {
  buildChatPayload,
  createSystemPrompt,
  toGeminiHistory,
} from "../src/engine/payload.js";

describe("payload", () => {
  it("crea un system prompt con los datos del personaje", () => {
    const character = getDefaultCharacter();
    const prompt = createSystemPrompt(character);

    expect(prompt).toContain(character.name);
    expect(prompt).toContain(character.personality);
    expect(prompt).toContain(character.tone);
    expect(prompt).toContain(character.limits);
  });

  it("convierte historial interno al formato de Gemini", () => {
    const history = [
      { role: "user", content: "Hola" },
      { role: "model", content: "Respuesta" },
    ];

    expect(toGeminiHistory(history)).toEqual([
      { role: "user", parts: [{ text: "Hola" }] },
      { role: "model", parts: [{ text: "Respuesta" }] },
    ]);
  });

  it("construye payload completo para el chat", () => {
    const character = getDefaultCharacter();
    const payload = buildChatPayload(character, [
      { role: "user", content: "Hola" },
    ]);

    expect(payload.character.id).toBe(character.id);
    expect(payload.systemInstruction).toContain(character.name);
    expect(payload.messages).toHaveLength(1);
  });
});