export function createMessage(role, content) {
  return {
    role,
    content: content.trim(),
    timestamp: new Date().toISOString(),
  };
}

export function appendMessage(history, message) {
  return [...history, message];
}

export function appendUserMessage(history, content) {
  return appendMessage(history, createMessage("user", content));
}

export function appendCharacterMessage(history, content) {
  return appendMessage(history, createMessage("model", content));
}

export function clearHistory() {
  return [];
}