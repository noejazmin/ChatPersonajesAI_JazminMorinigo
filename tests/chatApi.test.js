import { beforeEach, describe, expect, it, vi } from "vitest";
import { getDefaultCharacter } from "../src/engine/characters.js";
import { sendMessageToAI } from "../src/services/chatApi.js";

global.fetch = vi.fn();

describe("chatApi", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("llama a /api/chat con POST y JSON", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ text: "Respuesta" }),
    });

    const character = getDefaultCharacter();
    const messages = [{ role: "user", content: "Hola" }];

    await sendMessageToAI(character, messages);

    expect(fetch).toHaveBeenCalledWith(
      "/api/chat",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("devuelve la respuesta normalizada", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ text: " Hola " }),
    });

    const character = getDefaultCharacter();
    const messages = [{ role: "user", content: "Hola" }];

    const result = await sendMessageToAI(character, messages);

    expect(result).toEqual({ text: "Hola" });
  });

  it("lanza error si la API responde con error", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
      json: async () => ({
        error: "Se alcanzo el limite temporal de Gemini.",
      }),
    });

    const character = getDefaultCharacter();
    const messages = [{ role: "user", content: "Hola" }];

    await expect(sendMessageToAI(character, messages)).rejects.toThrow(
      "Se alcanzo el limite temporal de Gemini."
    );
  });

  it("no envia el saludo inicial si empieza con role model", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ text: "Respuesta" }),
    });

    const character = getDefaultCharacter();
    const messages = [
      { role: "model", content: "Saludo inicial" },
      { role: "user", content: "Hola" },
    ];

    await sendMessageToAI(character, messages);

    const requestOptions = fetch.mock.calls[0][1];
    const body = JSON.parse(requestOptions.body);

    expect(body.messages[0].role).toBe("user");
    expect(body.messages[0].parts[0].text).toBe("Hola");
  });

  it("manda systemInstruction en el payload", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ text: "Respuesta" }),
    });

    const character = getDefaultCharacter();
    const messages = [{ role: "user", content: "Hola" }];

    await sendMessageToAI(character, messages);

    const requestOptions = fetch.mock.calls[0][1];
    const body = JSON.parse(requestOptions.body);

    expect(body.systemInstruction).toContain(character.name);
  });
});