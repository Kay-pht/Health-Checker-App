var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Result from "../models/resultSchema.mjs";
// 結果をMongoDBから取得(マイページ表示用)
function getResultsByUserId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield Result.find({ userId: req.userId }).sort({
            createdAt: -1,
        });
        if (results === null) {
            return res.status(404).json({ msg: "Result Not Found" });
        }
        return res.json(results);
    });
}
//結果のDB登録(回答をsubmitしたとき)
function registerResult(req, res, answerByChatGPT) {
    return __awaiter(this, void 0, void 0, function* () {
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
        const newResult = yield result.save();
        console.log("Data saved successfully");
    });
}
export { getResultsByUserId, registerResult };
