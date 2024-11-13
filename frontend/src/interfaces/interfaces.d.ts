export interface QuestionsProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  answers: Record<string, null>;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface DBResultType {
  missingNutrients: string[];
  recommendedFoods: string[];
  score: number;
  userId?: string;
  createdAt: Date;
}
export interface ResultType {
  missingNutrients: string[];
  recommendedFoods: string[];
  score: number;
}
export interface ResultProps {
  setDiagnosisResult: React.Dispatch<React.SetStateAction<ResultType | null>>;
}
