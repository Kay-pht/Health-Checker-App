import { QuestionsProps } from "../../interface/questionsProps";
import { frequencyArray, queryArray_page1 } from "../../queryData";

const QuestionsPage1: React.FC<QuestionsProps> = ({
  handleChange,
  answers,
}) => {
  return (
    <div>
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
                  checked={answers[query.key] === freq.value}
                  onChange={handleChange}
                  required
                  autoFocus={
                    `${query.key}_option${freq.key}` === "q1_optionf1"
                      ? true
                      : false
                  }
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

export default QuestionsPage1;
