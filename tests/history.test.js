import { describe, expect, it } from "vitest";
import {
  appendCharacterMessage,
  appendUserMessage,
  clearHistory,
  createMessage,
} from "../src/engine/history.js";

describe("history", () => {
  it("crea un mensaje con role, contenido y timestamp", () => {
    const message = createMessage("user", " Hola ");

    expect(message.role).toBe("user");
    expect(message.content).toBe("Hola");
    expect(message.timestamp).toEqual(expect.any(String));
  });

  it("agrega mensajes sin mutar el historial original", () => {
    const history = [];
    const nextHistory = appendUserMessage(history, "Hola");

    expect(history).toHaveLength(0);
    expect(nextHistory).toHaveLength(1);
    expect(nextHistory[0].role).toBe("user");
  });

  it("agrega respuesta del personaje con role model", () => {
    const history = appendCharacterMessage([], "Respuesta");

    expect(history[0].role).toBe("model");
    expect(history[0].content).toBe("Respuesta");
  });

  it("limpia el historial", () => {
    expect(clearHistory()).toEqual([]);
  });
});