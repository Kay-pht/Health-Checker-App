import { frequencyArray, queryArray_page1 } from "../../queryData";

interface QuestionsProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  result: string;
  getAnswers: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  // answers: unknown;
}

const QuestionsPage1: React.FC<QuestionsProps> = ({
  handleChange,
  // answers,
}) => {
  return (
    <div className="questionsWrapper">
      {queryArray_page1.map((query, index) => (
        <div className="questionWrapper" key={query.key}>
          <h3>
            {index + 1}.{query.value}
          </h3>
          {frequencyArray.map((freq) => (
            <label
              htmlFor={`${query.key}_option${freq.key}`}
              key={`${query.key}_option${freq.key}`}
            >
              <input
                id={`${query.key}_option${freq.key}`}
                name={query.key}
                type="radio"
                value={freq.value}
                // checked={answers.q1 === freq.value}
                onChange={handleChange}
                required
              />
              <span>{freq.value}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuestionsPage1;
