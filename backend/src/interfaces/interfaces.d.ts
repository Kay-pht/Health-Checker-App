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

export interface Result {
  userId?: string;
  recommendedFoods: string[];
  missingNutrients: string[];
  score: number;
  createdAt: Date;
}

export interface userAnswerFormatType {
  [key: string]: string | null;
}
