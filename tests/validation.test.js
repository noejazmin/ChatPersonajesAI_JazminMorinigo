import { describe, expect, it } from "vitest";
import {
  getMessageValidationError,
  isValidMessage,
  sanitizeMessages,
  truncateHistory,
} from "../src/engine/validation.js";

describe("validation", () => {
  it("valida un mensaje correcto", () => {
    expect(isValidMessage("Hola Shrek")).toBe(true);
  });

  it("rechaza un string vacio", () => {
    expect(isValidMessage("")).toBe(false);
  });

  it("rechaza un mensaje con solo espacios", () => {
    expect(isValidMessage("   ")).toBe(false);
  });

  it("rechaza mensajes de mas de 500 caracteres", () => {
    const longMessage = "a".repeat(501);

    expect(isValidMessage(longMessage)).toBe(false);
  });

  it("devuelve mensaje de error para texto vacio", () => {
    expect(getMessageValidationError("")).toBe("Escribi un mensaje antes de enviar.");
  });

  it("devuelve mensaje de error para texto demasiado largo", () => {
    const longMessage = "a".repeat(501);

    expect(getMessageValidationError(longMessage)).toBe(
      "El mensaje no puede superar los 500 caracteres."
    );
  });

  it("recorta el historial a los ultimos mensajes", () => {
    const history = [
      { role: "user", content: "1" },
      { role: "model", content: "2" },
      { role: "user", content: "3" },
    ];

    expect(truncateHistory(history, 2)).toEqual([
      { role: "model", content: "2" },
      { role: "user", content: "3" },
    ]);
  });

  it("limpia mensajes invalidos del historial", () => {
    const history = [
      { role: "user", content: "Hola" },
      { role: "system", content: "No deberia pasar" },
      { role: "model", content: "" },
      { role: "model", content: "Respuesta" },
    ];

    expect(sanitizeMessages(history)).toEqual([
      { role: "user", content: "Hola" },
      { role: "model", content: "Respuesta" },
    ]);
  });
});