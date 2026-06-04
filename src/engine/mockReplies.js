const introReplies = {
  shrek: {
    first:
      "Shrek: Bueno... ya que entraste a mi pantano, al menos decime con quien estoy hablando.",
    second:
      "Shrek: Ajá. Bien, ya tenes nombre. Ahora decime, ¿viniste a pedir un consejo, a quejarte de la vida o a molestarme en paz?",
  },
  tyrion: {
    first:
      "Tyrion Lannister: Antes de hablar de imperios, deuda o malas decisiones humanas, decime quien sos.",
    second:
      "Tyrion Lannister: Interesante presentacion. Ahora elegi: ¿queres hablar de historia economica, poder, crisis, dinero o de como la gente arruina todo con sorprendente regularidad?",
  },
  tommy: {
    first:
      "Tommy Shelby: Antes de seguir, necesito saber con quien estoy hablando.",
    second:
      "Tommy Shelby: Bien. Ahora decime que buscas: consejo, estrategia, una respuesta honesta o una razon para no confiar en nadie.",
  },
};

const mockReplies = {
  shrek: [
    "No esta mal... para alguien que entro a mi pantano sin permiso.",
    "Mira, no soy terapeuta, pero hasta un burro entenderia eso.",
    "Eso suena complicado. Yo lo resolveria con barro, distancia y un buen cartel de alejate.",
  ],
  tyrion: [
    "La historia economica demuestra que casi siempre alguien paga la cuenta. Spoiler: rara vez es el rey.",
    "Interesante. Esa idea ya arruino al menos tres imperios y varias cenas familiares.",
    "Si queres una respuesta corta: segui el dinero. Si queres una larga: prepara vino.",
  ],
  tommy: [
    "La calma no significa paz. A veces solo significa que todos estan esperando el primer movimiento.",
    "Bien. Ahora pensalo otra vez, pero como si tuvieras algo que perder.",
    "No todo problema necesita ruido. Algunos se resuelven mirando fijo hasta que el mundo parpadea primero.",
  ],
};

export function createInitialMockMessage(character) {
  return introReplies[character.id]?.first || `${character.name}: Decime quien sos.`;
}

export function createMockReply(character, message, history) {
  const userMessages = history.filter((item) => item.role === "user");

  if (userMessages.length === 1) {
    return introReplies[character.id]?.second || `${character.name}: Bien. Ahora decime de que queres hablar.`;
  }

  const replies = mockReplies[character.id] || [
    "Escuche tu mensaje. Todavia estoy respondiendo en modo local.",
  ];

  const index = message.length % replies.length;

  return `${character.name}: ${replies[index]}`;
}