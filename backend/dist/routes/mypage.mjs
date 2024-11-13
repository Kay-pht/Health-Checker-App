var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { authenticate } from "../middlewares/authenticate.mjs";
import { getResultsByUserId } from "../controllers/results.mjs";
const router = express.Router();
router.get("/", authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield getResultsByUserId(req, res);
        console.log("Results retrieved successfully");
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get results" });
        console.error("Failed to get results", error);
    }
}));
export default router;
