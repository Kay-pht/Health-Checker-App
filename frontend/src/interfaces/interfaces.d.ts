export interface QuestionsProps {
  getAnswersFromEachPage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  answers: Record<string, null>;
}

export interface UserAuth {
  email: string;
  password: string;
}

export interface RegisterFormValues extends UserAuth {
  name: string;
  confirm: string;
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

export interface QuestionCompProps {
  queryArray: { key: string; value: string }[];
  answers: Record<string, null>;
  getAnswersFromEachPage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  page: number;
}

export interface FocusNextInputType {
  answers: Record<string, null>;
  inputRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  queryArray: {
    key: string;
    value: string;
  }[];
}

export interface GetAnswersFromAIType {
  e: React.FormEvent<HTMLFormElement>;
  user: User | null | undefined;
  answers: { [key: string]: string };
  setDiagnosisResult: React.Dispatch<React.SetStateAction<ResultType | null>>;
  navigate: NavigateFunction;
}
