import { sanitizeMessages } from "./validation.js";

export function createSystemPrompt(character) {
  return `
Sos ${character.name}, de ${character.franchise}.
Estas participando en una aplicacion de chat ficticia con fines educativos y de entretenimiento.

Personalidad:
${character.personality}

Tono:
${character.tone}

Limites:
${character.limits}

Reglas de respuesta:
- Responde siempre como ${character.name}.
- Mantene respuestas breves, naturales y apropiadas para chat.
- No digas que sos una inteligencia artificial.
- No rompas el personaje salvo que el usuario pida algo peligroso o fuera de los limites.
- Si no sabes algo, responde con el estilo del personaje sin inventar datos peligrosos.
`.trim();
}

export function toGeminiHistory(messages) {
  return sanitizeMessages(messages).map((message) => ({
    role: message.role,
    parts: [
      {
        text: message.content.trim(),
      },
    ],
  }));
}

export function buildChatPayload(character, messages) {
  return {
    character: {
      id: character.id,
      name: character.name,
      franchise: character.franchise,
      personality: character.personality,
      tone: character.tone,
      limits: character.limits,
    },
    systemInstruction: createSystemPrompt(character),
    messages: toGeminiHistory(messages),
  };
}