import express, { Response } from "express";
import env from "dotenv";
import { authenticate } from "../middlewares/authenticate.mjs";
import { CustomAuthRequest } from "../interfaces/interfaces";
import { getResultsByUserId } from "../controllers/results.mjs";

const router = express.Router();

router.get("/", authenticate, async (req: CustomAuthRequest, res: Response) => {
  try {
    // これまでの診断結果を返却
    await getResultsByUserId(req, res);
  } catch (error) {
    res.status(500).json({ error: "Failed to get results" });
    console.error("Failed to get results", error);
  }
});

export default router;
