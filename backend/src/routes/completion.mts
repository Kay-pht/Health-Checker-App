import express from "express";
import OpenAI from "openai";
import env from "dotenv";
import prompt from "../helpers/prompt.mjs";
import { ChatCompletionMessageParam } from "openai/resources";

const router = express.Router();

env.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// get the API endpoint for completions from OpenAI
router.post("/", async (req, res) => {
  try {
    const answers = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      messages: prompt(answers),
    });
    res.json(completion.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate chat completion" });
    console.error("Can't connect to openAI", error);
  }
});

export default router;
