import { Request, Response } from "express";
import {
  orderAnswers,
  parseResponseFromAI,
} from "../helpers/answerHelpers.mjs";
import getChatCompletion from "../service/openAI.mjs";
import { registerResult } from "../service/mongoDB.mjs";

const handleChatCompletion = async (req: Request, res: Response) => {
  try {
    const answers = req.body.content;

    if (!answers) {
      throw new Error("Answers are not provided in the request");
    }

    // ユーザーの回答を正しく並び替え
    const orderedAnswers = orderAnswers(answers);
    // ChatGPTにユーザーの回答を投げる。診断結果をレスとして受け取る
    const responseFromAI = await getChatCompletion(orderedAnswers);
    // JavaScriptのオブジェクトに変換してフロントに返却
    const parsedResponse = parseResponseFromAI(responseFromAI);
    res.json(parsedResponse);
    // 診断結果をDBに登録する
    await registerResult(req, parsedResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate chat completion" });
    console.error("Something broken", error);
  }
};

export default handleChatCompletion;
