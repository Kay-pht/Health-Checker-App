import { frequencyArray, queryArray_page3 } from "../../queryData";
import TopBar from "./TopBar";

interface QuestionsProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  result: string;
  getAnswers: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  answers: Record<string, null>;
}

const QuestionsPage3: React.FC<QuestionsProps> = ({
  handleChange,
  answers,
}) => {
  return (
    <div>
      <TopBar percent={40} />
      <div className="questionsWrapper">
        {queryArray_page3.map((query, index) => (
          <div className="questionWrapper" key={query.key}>
            <h3>
              {index + 11}.{query.value}
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
                  checked={answers[query.key] === freq.value}
                  onChange={handleChange}
                  autoFocus={
                    `${query.key}_option${freq.key}` === "q11_optionf1"
                      ? true
                      : false
                  }
                  required
                />
                <span>{freq.value}</span>
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage3;
