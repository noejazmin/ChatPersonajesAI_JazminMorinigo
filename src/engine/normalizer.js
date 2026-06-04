export function normalizeGeminiResponse(data) {
  const text = extractText(data);

  if (!text) {
    throw new Error("La respuesta de Gemini no contiene texto.");
  }

  return {
    text,
  };
}

function extractText(data) {
  if (typeof data?.text === "string") {
    return data.text.trim();
  }

  const parts = data?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) {
    return "";
  }

  return parts
    .map((part) => part.text)
    .filter((text) => typeof text === "string")
    .join("")
    .trim();
}