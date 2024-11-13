import express, { Response } from "express";
import OpenAI from "openai";
import env from "dotenv";
import prompt from "../helpers/prompt.mjs";
import { authenticate } from "../middlewares/authenticate.mjs";
import {
  answerByChatGPTType,
  CustomAuthRequest,
} from "../interfaces/interfaces";
import { registerResult } from "../controllers/results.mjs";

const router = express.Router();

env.config();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// クライアントからフォームの回答を受け取る→ChatGPTに回答を求める→AIの診断結果をDB登録→userに結果返却
router.post(
  "/",
  authenticate,
  async (req: CustomAuthRequest, res: Response) => {
    try {
      const answers = req.body.content;
      // userの回答順で格納されているので、それを質問番号順に並べ替える
      const orderedAnswers: { [key: string]: string } = {};
      for (let i = 1; i <= Object.keys(answers).length; i++) {
        const key = `q${i}`;
        const answer = answers[key];
        orderedAnswers[key] = answer;
      }
      // OpenAIのChatGPTに回答を送付して、結果を得る
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0,
        messages: prompt(orderedAnswers),
      });
      const responseByAI = completion.choices[0].message.content;
      // AIからの回答をMongoDBに登録してクライアントに返却
      if (completion && responseByAI) {
        const answerByChatGPT: answerByChatGPTType = JSON.parse(responseByAI);
        registerResult(req, res, answerByChatGPT);
        res.json(answerByChatGPT);
      } else {
        res.status(400).json({ error: "Can't parse response from OpenAI" });
        console.error("Can't parse response from OpenAI");
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to generate chat completion" });
      console.error("Can't connect to openAI", error);
    }
  }
);

export default router;
