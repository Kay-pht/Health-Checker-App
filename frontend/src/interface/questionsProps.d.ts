export interface QuestionsProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  result: string;
  getAnswers: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  answers: Record<string, null>;
}
