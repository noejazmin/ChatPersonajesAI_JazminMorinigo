export const MAX_MESSAGE_LENGTH = 500;

export function isValidMessage(message) {
  if (typeof message !== "string") return false;

  const trimmed = message.trim();

  return trimmed.length >= 1 && trimmed.length <= MAX_MESSAGE_LENGTH;
}

export function getMessageValidationError(message) {
  if (typeof message !== "string" || message.trim().length === 0) {
    return "Escribi un mensaje antes de enviar.";
  }

  if (message.trim().length > MAX_MESSAGE_LENGTH) {
    return `El mensaje no puede superar los ${MAX_MESSAGE_LENGTH} caracteres.`;
  }

  return "";
}

export function truncateHistory(messages, maxMessages = 20) {
  if (!Array.isArray(messages)) return [];

  return messages.slice(-maxMessages);
}

export function sanitizeMessages(messages, maxMessages = 20) {
  return truncateHistory(messages, maxMessages).filter((message) => {
    const hasValidRole = message?.role === "user" || message?.role === "model";
    const hasValidContent =
      typeof message?.content === "string" && message.content.trim().length > 0;

    return hasValidRole && hasValidContent;
  });
}