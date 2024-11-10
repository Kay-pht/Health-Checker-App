import { QuestionsProps } from "../../interface/questionsProps";
import { frequencyArray, queryArray_page5 } from "../../queryData";
import TopBar from "./TopBar";

const QuestionsPage5: React.FC<QuestionsProps> = ({
  handleChange,
  answers,
}) => {
  return (
    <div>
      <TopBar percent={80} />
      <div className="questionsWrapper">
        {queryArray_page5.map((query, index) => (
          <div className="questionWrapper" key={query.key}>
            <h3>
              {index + 21}.{query.value}
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
                    `${query.key}_option${freq.key}` === "q21_optionf1"
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

export default QuestionsPage5;
