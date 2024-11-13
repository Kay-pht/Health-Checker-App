import { QuestionsProps } from "../../interfaces/interfaces";
import { frequencyArray, queryArray_page4 } from "../../utils/queryData";
import TopBar from "./TopBar";

const QuestionsPage4: React.FC<QuestionsProps> = ({
  handleChange,
  answers,
}) => {
  return (
    <div>
      <TopBar percent={60} />
      <div className="questionsWrapper">
        {queryArray_page4.map((query, index) => (
          <div className="questionWrapper" key={query.key}>
            <h3>
              {index + 16}.{query.value}
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
                    `${query.key}_option${freq.key}` === "q16_optionf1"
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

export default QuestionsPage4;
