const STORAGE_KEYS = {
    activeCharacterId: "chatPersonajes.activeCharacterId",
    histories: "chatPersonajes.histories",
};

export function saveActiveCharacterId(characterId) {
    localStorage.setItem(STORAGE_KEYS.activeCharacterId, characterId);
}

export function loadActiveCharacterId() {
    return localStorage.getItem(STORAGE_KEYS.activeCharacterId);
}

export function saveHistory(characterId, messages) {
    const histories = loadHistories();
    
    histories[characterId] = messages;
    localStorage.setItem(STORAGE_KEYS.histories, JSON.stringify(histories));
}

export function loadHistory(characterId) {
    const histories = loadHistories();

    return histories[characterId] || [];
}

export function clearStoredHistory(characterId) {
    const histories = loadHistories();
    
    delete histories[characterId];
    localStorage.setItem(STORAGE_KEYS.histories, JSON.stringify(histories));
}

function loadHistories() {
    const raw = localStorage.getItem(STORAGE_KEYS.histories);
    
    if (!raw) {
        return {};
    }
    
    try {
        return JSON.parse(raw);
    } catch {
        return {};
    }
}