import express from "express";
import { firebaseAuthMiddleware } from "../middlewares/firebaseAuthMiddleware.mjs";
import handleMyPage from "../controllers/myPageControllers.mjs";

const router = express.Router();

router.get("/", firebaseAuthMiddleware, handleMyPage);

export default router;
