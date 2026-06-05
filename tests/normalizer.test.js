import { describe, expect, it } from "vitest";
import { normalizeGeminiResponse } from "../src/engine/normalizer.js";

describe("normalizer", () => {
  it("normaliza respuesta simple con text", () => {
    expect(normalizeGeminiResponse({ text: " Hola " })).toEqual({
      text: "Hola",
    });
  });

  it("normaliza respuesta cruda de Gemini", () => {
    const data = {
      candidates: [
        {
          content: {
            parts: [{ text: "Hola " }, { text: "Shrek" }],
          },
        },
      ],
    };

    expect(normalizeGeminiResponse(data)).toEqual({
      text: "Hola Shrek",
    });
  });

  it("lanza error si no hay texto", () => {
    expect(() => normalizeGeminiResponse({})).toThrow(
      "La respuesta de Gemini no contiene texto."
    );
  });
});