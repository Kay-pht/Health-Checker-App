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
import OpenAI from "openai";
import env from "dotenv";
import prompt from "../helpers/prompt.mjs";
const router = express.Router();
env.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
// get the API endpoint for completions from OpenAI
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = req.body;
        const completion = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            temperature: 0,
            messages: prompt(answers),
        });
        res.json(completion.choices[0].message.content);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to generate chat completion" });
        console.error("Can't connect to openAI", error);
    }
}));
export default router;
