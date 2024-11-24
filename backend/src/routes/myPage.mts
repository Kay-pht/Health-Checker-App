import express from "express";
import { firebaseAuthMiddleware } from "../middlewares/firebaseAuthMiddleware.mjs";
import handleChatCompletion from "../controllers/chatCompletionControllers.mjs";

const router = express.Router();

router.get("/", firebaseAuthMiddleware, handleChatCompletion);

export default router;
