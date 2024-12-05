import { Request, Response } from "express";
import {
  orderAnswers,
  parseResponseFromAI,
} from "../helpers/answerHelpers.mjs";

import { registerResult } from "../service/mongoDB.mjs";
import { getChatCompletion } from "../service/openAI.mjs";

const postChatCompletion = async (req: Request, res: Response) => {
  try {
    const answers = req.body.content;
    // リクエストの型チェック&正しく並び替え
    const orderedAnswers = orderAnswers(answers);
    // ChatGPTにユーザーの回答を投げる。診断結果をレスとして受け取る
    const responseFromAI = await getChatCompletion(orderedAnswers);
    // JavaScriptのオブジェクトに変換してフロントに返却
    const parsedResponse = parseResponseFromAI(responseFromAI);
    res.json(parsedResponse);

    // 診断結果をDBに登録
    await registerResult(req, parsedResponse);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate chat completion" });
    console.error("Something broken", error);
  }
};

export default postChatCompletion;
