import { useEffect } from "react";
import { FocusNextInputType } from "../interfaces/interfaces";

// 回答後、未回答の質問にフォーカスをセットする関数
const useFocusNextInput = ({
  userAnswers,
  inputRefs,
  foodQueryPage,
}: FocusNextInputType) => {
  useEffect(() => {
    //未回答の最初の質問を探して変数に返す。全て入力されている場合は-1を返す
    const firstUnansweredIndex = foodQueryPage.findIndex(
      (query) => !userAnswers[query.key]
    );
    // 未回答が存在する(-1以外) && firstUnansweredIndex番目の要素が存在する場合、その要素にフォーカス
    if (
      firstUnansweredIndex !== -1 &&
      inputRefs.current[firstUnansweredIndex]
    ) {
      inputRefs.current[firstUnansweredIndex]?.focus();
    }
    // ここのエラーは看過OKか?
    //inputRefsとuserAnswersは同じところを参照しているので、両方を含めないほうが良さそう
    //foodQueryPageはそもそも変更しない変数なので依存関係に含める必要がない
  }, [userAnswers]);
};

export default useFocusNextInput;
