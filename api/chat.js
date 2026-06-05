import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GEMINI_API_KEY no configurada" });
    }

    const { systemInstruction, messages } = req.body;

    if (!systemInstruction || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Body invalido" });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction,
    });

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) {
      return res.status(400).json({ error: "No hay mensajes para enviar" });
    }

    const chat = model.startChat({
      history: messages.slice(0, -1),
    });

    const result = await chat.sendMessage(lastMessage.parts);
    const text = result.response.text().trim();

    return res.status(200).json({ text });
   } catch (error) {
    console.error("[/api/chat] Error:", error.message);

    if (error.message.includes("429") || error.message.includes("Too Many Requests")) {
      return res.status(429).json({
        error: "Se alcanzo el limite temporal de Gemini. Espera unos segundos e intenta nuevamente.",
      });
    }

    return res.status(500).json({ error: "Error al generar la respuesta" });
  }
}