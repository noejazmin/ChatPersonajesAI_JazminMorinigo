import { buildChatPayload } from "../engine/payload.js";
import { normalizeGeminiResponse } from "../engine/normalizer.js";
import { fetchJson } from "./fetchJson.js";

function removeInitialModelMessage(messages) {
  if (messages[0]?.role === "model") {
    return messages.slice(1);
  }

  return messages;
}

export async function sendMessageToAI(character, messages) {
  const apiMessages = removeInitialModelMessage(messages);
  const payload = buildChatPayload(character, apiMessages);

  const data = await fetchJson("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return normalizeGeminiResponse(data);
}