import mongoose from "mongoose";
import { Schema } from "mongoose";

const resultSchema = new Schema(
  {
    userId: { type: String, required: true },
    recommendedFoods: { type: [String], required: true },
    missingNutrients: { type: [String], required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultSchema);

export default Result;
