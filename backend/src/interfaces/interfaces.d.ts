import { Request } from "express";

export interface CustomAuthRequest extends Request {
  headers: {
    authorization?: string;
  };
  userId?: string;
}

export interface answerByChatGPTType {
  missingNutrients: string[];
  recommendedFoods: string[];
  score: number;
}
