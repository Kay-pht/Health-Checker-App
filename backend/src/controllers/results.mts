import { Response } from "express";
import type {
  answerByChatGPTType,
  CustomAuthRequest,
} from "../interfaces/interfaces.d.ts";
import Result from "../models/resultSchema.mjs";
import { resourceLimits } from "worker_threads";

// 結果をMongoDBから取得(マイページ表示用)
async function getResultsByUserId(req: CustomAuthRequest) {
  try {
    const results = await Result.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    return results;
  } catch (error) {
    console.error("Failed to get results by user ID", error);
    throw new Error("Failed to fetch results");
  }
}

//結果のDB登録(AIからの回答を返却するとき)
async function registerResult(
  req: CustomAuthRequest,
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
}

export { getResultsByUserId, registerResult };
