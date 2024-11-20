import { Response } from "express";
import {
  answerByChatGPTType,
  CustomAuthRequest,
} from "../interfaces/interfaces";
import Result from "../models/resultSchema.mjs";

// 結果をMongoDBから取得(マイページ表示用)
async function getResultsByUserId(req: CustomAuthRequest, res: Response) {
  const results = await Result.find({ userId: req.userId }).sort({
    createdAt: -1,
  });
  if (results === null) {
    return res.status(404).json({ msg: "Result Not Found" });
  }

  return res.json(results);
}

//結果のDB登録(AIからの回答を返却するとき)
async function registerResult(
  req: CustomAuthRequest,
  res: Response,
  answerByChatGPT: answerByChatGPTType
) {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     const errs = errors.array();
  //     return res.status(400).json({ errors: errs });
  //   }

  const result = new Result({
    userId: req.userId,
    recommendedFoods: answerByChatGPT.recommendedFoods,
    missingNutrients: answerByChatGPT.missingNutrients,
    score: answerByChatGPT.score,
  });
  const newResult = await result.save();
  console.log("Data saved successfully");
}

export { getResultsByUserId, registerResult };
