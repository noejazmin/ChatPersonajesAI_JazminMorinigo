import { buildChatPayload } from "../engine/payload.js";
import { normalizeGeminiResponse } from "../engine/normalizer.js";
import { fetchJson } from "./fetchJson.js";

export async function sendMessageToAI(character, messages) {
  const payload = buildChatPayload(character, messages);

  const data = await fetchJson("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return normalizeGeminiResponse(data);
}