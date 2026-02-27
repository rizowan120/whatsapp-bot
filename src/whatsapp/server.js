import "../config.js";

import express from "express";
import { handleWebhook } from "./webhook.js";


const app = express();
app.use(express.json());

app.get("/webhook", handleWebhook);
app.post("/webhook", handleWebhook);

app.listen(3000, () =>
  console.log("WhatsApp AI bot running 🚀")
);
