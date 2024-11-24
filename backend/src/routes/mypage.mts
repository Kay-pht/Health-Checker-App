import express, { Response } from "express";
import { firebaseAuthMiddleware } from "../middlewares/firebaseAuthMiddleware.mjs";
import type { CustomAuthRequest } from "../interfaces/interfaces.d.ts";
import { getResultsByUserId } from "../controllers/dbControllers.mjs";

const router = express.Router();

router.get(
  "/",
  firebaseAuthMiddleware,
  async (req: CustomAuthRequest, res: Response) => {
    try {
      // これまでの診断結果を返却
      const results = await getResultsByUserId(req);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to get results" });
      console.error("Failed to get results", error);
    }
  }
);

export default router;
