import { useRef } from "react";
import { frequencyArray } from "../../utils/queryData.tsx";
import type { QuestionCompProps } from "../../interfaces/interfaces.d.ts";
import { FormControlLabel, Radio } from "@mui/material";
import useFocusNextInput from "../../hooks/useFocusNextInput.tsx";

const QuestionBlockComp = ({
  foodQueryPage,
  userAnswers,
  getAnswersInEachPage,
  currentPageNum,
}: QuestionCompProps) => {
  const inputRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 回答後、未回答の問題にフォーカスするロジック
  useFocusNextInput({ userAnswers, inputRefs, foodQueryPage });

  return (
    <div className="mb-5 ">
      {
        // map関数で質問ごとに表示
        foodQueryPage.map((query, index) => (
          <div
            className={`transition-opacity duration-300 font-semibold bg-white rounded-lg shadow-md p-4 mb-8 ${
              userAnswers[query.key] ? "opacity-50" : "opacity-100"
            }`}
            key={query.key}
          >
            <h3 className="text-xl text-gray-600 mt-3 pb-4 ml-2 text-center">
              {index + currentPageNum * 5 - 4}.{query.value}
            </h3>
            <div className="flex justify-center space-x-10 mt-5 mb-5">
              {
                // map関数で頻度ごとにラジオボタンを作成
                frequencyArray.map((freq) => (
                  <div
                    className="max-w-lg "
                    key={`${query.key}_option${freq.key}`}
                  >
                    <div className="flex flex-col items-center text-sm">
                      <FormControlLabel
                        control={
                          <Radio
                            id={`${query.key}_option${freq.key}`}
                            name={query.key}
                            value={freq.key}
                            checked={userAnswers[query.key] === freq.key}
                            onChange={getAnswersInEachPage}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: 40,
                              },
                              // color: blue[50],
                              // "&.Mui-checked": {
                              //   color: blue[200],
                              // },
                            }}
                          />
                        }
                        label={freq.value}
                        labelPlacement="bottom"
                        className="block mb-2 text-sm text-gray-600 cursor-pointer font-bold"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1rem",
                            fontWeight: "bold",
                          },
                        }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default QuestionBlockComp;
