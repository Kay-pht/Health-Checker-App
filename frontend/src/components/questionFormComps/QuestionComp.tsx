import { useRef } from "react";
import { frequencyArray } from "../../utils/queryData";
import FocusNextInput from "../../../helpers/FocusNextInput";
import { QuestionCompProps } from "../../interfaces/interfaces";

const QuestionComp = ({
  queryArray,
  answers,
  getAnswersFromEachPage,
  page,
}: QuestionCompProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  FocusNextInput({ answers, inputRefs, queryArray });
  return (
    <div className="questionsWrapper">
      {
        // map関数で質問ごとに表示
        queryArray.map((query, index) => (
          <div
            className={
              // 回答済みになるとopacityが50%に変化
              `questionWrapper transition-opacity duration-300 ${
                answers[query.key] ? "opacity-50" : "opacity-100"
              }`
            }
            key={query.key}
          >
            <h3>
              {index + page * 5 - 4}.{query.value}
            </h3>
            {
              // map関数で頻度ごとにラジオボタンを作成
              frequencyArray.map((freq) => (
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
                    onChange={getAnswersFromEachPage}
                    ref={(el) => (inputRefs.current[index] = el)}
                    required
                  />
                  <span>{freq.value}</span>
                </label>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

export default QuestionComp;
