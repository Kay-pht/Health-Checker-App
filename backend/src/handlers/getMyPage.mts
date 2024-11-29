import { Response } from "express";
import { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getResultsByUserId } from "../service/mongoDB.mjs";

const getMyPage = async (req: CustomAuthRequest, res: Response) => {
  try {
    // これまでの診断結果DBから取得してフロントに返却
    const results = await getResultsByUserId(req);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to get results" });
    console.error("Failed to get results", error);
  }
};

export default getMyPage;
