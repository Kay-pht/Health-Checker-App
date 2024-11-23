import { resultsCollection } from "../helpers/db.mjs";
import type {
  answerByChatGPTType,
  CustomAuthRequest,
} from "../interfaces/interfaces.js";
// import Result from "../models/resultSchema.mjs";

interface Result {
  userId?: string;
  recommendedFoods: string[];
  missingNutrients: string[];
  score: number;
  createdAt: Date;
}

// 結果をMongoDBから取得(マイページ表示用)
async function getResultsByUserId(req: CustomAuthRequest) {
  try {
    const results = await resultsCollection
      .find({ userId: req.userId })
      .sort({
        createdAt: -1,
      })
      .toArray();
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
  const timestamp = new Date();
  const result: Result = {
    userId: req.userId,
    recommendedFoods: answerByChatGPT.recommendedFoods,
    missingNutrients: answerByChatGPT.missingNutrients,
    score: answerByChatGPT.score,
    createdAt: timestamp,
  };
  try {
    await resultsCollection.insertOne(result);
  } catch (error) {
    console.error("Failed to register result", error);
    throw new Error("Failed to save result");
  }
}

export { getResultsByUserId, registerResult };
