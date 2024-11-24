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
  foodQueryPage: { key: string; value: string }[];
  userAnswers: Record<string, null>;
  getAnswersInEachPage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentPageNum: number;
}

export interface FocusNextInputType {
  userAnswers: Record<string, null>;
  inputRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
  foodQueryPage: {
    key: string;
    value: string;
  }[];
}

export interface FetchAnswersFromAIType {
  e: React.FormEvent<HTMLFormElement>;
  user: User | null | undefined;
  userAnswers: { [key: string]: string };
  setDiagnosisResult: React.Dispatch<React.SetStateAction<ResultType | null>>;
  navigate: NavigateFunction;
}

export interface ResultPageProps {
  result: ResultType | null;
}
