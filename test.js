import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

console.log("KEY =", process.env.OPENROUTER_API_KEY);

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "https://localhost",
    "X-Title": "test"
  }
});

const res = await client.chat.completions.create({
  model: "openai/gpt-oss-120b",
  messages: [{ role: "user", content: "Hello" }]
});

console.log(res.choices[0].message.content);
