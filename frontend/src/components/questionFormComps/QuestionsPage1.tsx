import { useRef } from "react";
import { QuestionsProps } from "../../interfaces/interfaces";
import { frequencyArray, queryArray_page1 } from "../../utils/queryData";
import { FocusNextInput } from "../../../helpers/Helpers";

const QuestionsPage1: React.FC<QuestionsProps> = ({
  handleChange,
  answers,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  FocusNextInput(answers, inputRefs, queryArray_page1);

  return (
    <div>
      <div className="questionsWrapper">
        {queryArray_page1.map((query, index) => (
          <div
            className={`questionWrapper transition-opacity duration-300 ${
              answers[query.key] ? "opacity-50" : "opacity-100"
            }`}
            key={query.key}
          >
            <h3>
              {index + 1}.{query.value}
            </h3>
            <span data-v-fcfbc80a="" className="radio__tick"></span>
            {frequencyArray.map((freq) => (
              <label
                htmlFor={`${query.key}_option${freq.key}`}
                key={`${query.key}_option${freq.key}`}
              >
                <input
                  id={`${query.key}_option${freq.key}`}
                  name={query.key}
                  type="radio"
                  value={freq.key}
                  checked={answers[query.key] === freq.key}
                  onChange={handleChange}
                  required
                  autoFocus={
                    `${query.key}_option${freq.key}` === "q1_optionf1"
                      ? true
                      : false
                  }
                  ref={(el) => (inputRefs.current[index] = el)}
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
