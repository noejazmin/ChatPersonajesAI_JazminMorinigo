import { describe, expect, it } from "vitest";
import {
  characters,
  getCharacterById,
  getDefaultCharacter,
} from "../src/engine/characters.js";

describe("characters", () => {
  it("tiene al menos tres personajes", () => {
    expect(characters.length).toBeGreaterThanOrEqual(3);
  });

  it("usa Shrek como personaje por defecto", () => {
    expect(getDefaultCharacter().id).toBe("shrek");
  });

  it("busca personaje por id", () => {
    expect(getCharacterById("tommy").name).toBe("Tommy Shelby");
  });

  it("vuelve al personaje por defecto si el id no existe", () => {
    expect(getCharacterById("no-existe").id).toBe("shrek");
  });
});