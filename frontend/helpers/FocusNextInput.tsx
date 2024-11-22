import { useEffect } from "react";
import type { FocusNextInputType } from "../src/interfaces/interfaces.d.ts";

// 回答後、未回答の質問にフォーカスをセットする関数
const FocusNextInput = ({
  answers,
  inputRefs,
  queryArray,
}: FocusNextInputType) => {
  useEffect(() => {
    //回答されていない最初の質問を探して変数に返す。全て入力されている場合は-1を返す
    const firstUnansweredIndex = queryArray.findIndex(
      (query) => !answers[query.key]
    );
    // 未回答が存在する(-1) && firstUnansweredIndex番目の要素が存在する場合、その要素にフォーカス
    if (
      firstUnansweredIndex !== -1 &&
      inputRefs.current[firstUnansweredIndex]
    ) {
      inputRefs.current[firstUnansweredIndex]?.focus();
    }
  }, [answers]);
};

export default FocusNextInput;
