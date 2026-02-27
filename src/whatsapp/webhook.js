import { processAI } from "../ai/chatEngine.js";
import { sendWhatsApp } from "./sender.js";
import { MODELS } from "../models.js";
import { setUserModel } from "../ai/memory.js";
import { splitMessage } from "../utils/splitter.js";
import { formatForWhatsApp } from "../utils/formatter.js";
import { rateLimit } from "../utils/rateLimiter.js";

export async function handleWebhook(req, res) {

  if (req.method === "GET") {
    if (
      req.query["hub.verify_token"] === process.env.VERIFY_TOKEN
    )
      return res.send(req.query["hub.challenge"]);

    return res.sendStatus(403);
  }

  const msg =
    req.body.entry?.[0]?.changes?.[0]
      ?.value?.messages?.[0];

  if (!msg) return res.sendStatus(200);

  const user = msg.from;
  const text = msg.text?.body;

  if (!text || !rateLimit(user))
    return res.sendStatus(200);

  if (text === "/models") {
    await sendWhatsApp(
      user,
`Available:
gpt-oss-120b
deepseek
llama
mistral

Use: /model NAME`
    );
    return res.sendStatus(200);
  }

  if (text.startsWith("/model")) {
    const m = text.split(" ")[1];
    if (MODELS[m]) {
      setUserModel(user, m);
      await sendWhatsApp(user, "Model changed to " + m);
    }
    return res.sendStatus(200);
  }

  let reply = await processAI(user, text);

  reply = formatForWhatsApp(reply);

  for (const part of splitMessage(reply)) {
    await sendWhatsApp(user, part);
  }

  res.sendStatus(200);
}
