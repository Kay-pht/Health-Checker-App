import express from "express";
import OpenAI from "openai";
import env from "dotenv";
import prompt from "../helpers/prompt.mjs";
// import { ChatCompletionMessageParam } from "openai/resources";

const router = express.Router();

env.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// get the API endpoint for completions from OpenAI
router.post("/", async (req, res) => {
  try {
    const answers = req.body.content;
    const orderedAnswers: { [key: string]: string } = {};
    for (let i = 1; i <= Object.keys(answers).length; i++) {
      const key = `q${i}`;
      const answer = answers[key];
      orderedAnswers[key] = answer;
    }

    console.log(orderedAnswers);
    const completion = await openai.chat.completions.create({
      // model: "gpt-3.5-turbo",
      model: "gpt-4o-mini",
      temperature: 0,
      messages: prompt(orderedAnswers),
    });
    res.json(completion.choices[0].message.content);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate chat completion" });
    console.error("Can't connect to openAI", error);
  }
});

export default router;
