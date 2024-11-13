export interface QuestionsProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  getAnswers: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  answers: Record<string, null>;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface ResultType {
  missingNutrients: string[];
  recommendedFoods: string[];
  score: number;
}
export interface ResultProps {
  setDiagnosisResult: React.Dispatch<React.SetStateAction<ResultType | null>>;
}
