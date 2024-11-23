import { useRef } from "react";
import { frequencyArray } from "../../utils/queryData";
import FocusNextInput from "../../../helpers/FocusNextInput";
import type { QuestionCompProps } from "../../interfaces/interfaces.d.ts";
import { FormControlLabel, Radio } from "@mui/material";

const QuestionComp = ({
  queryArray,
  answers,
  getAnswersFromEachPage,
  page,
}: QuestionCompProps) => {
  const inputRefs = useRef<(HTMLButtonElement | null)[]>([]);

  FocusNextInput({ answers, inputRefs, queryArray });
  return (
    <div className="mb-5">
      {
        // map関数で質問ごとに表示
        queryArray.map((query, index) => (
          <div
            className={`transition-opacity duration-300 font-semibold bg-white rounded-lg shadow-md p-4 mb-4 ${
              answers[query.key] ? "opacity-50" : "opacity-100"
            }`}
            key={query.key}
          >
            <h3 className="text-lg text-gray-700 mt-1 mb-2 ml-2 text-center">
              {index + page * 5 - 4}.{query.value}
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
                            checked={answers[query.key] === freq.key}
                            onChange={getAnswersFromEachPage}
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

export default QuestionComp;
