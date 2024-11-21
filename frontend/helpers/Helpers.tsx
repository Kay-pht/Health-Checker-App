import { useEffect } from "react";

// 回答後、未回答の質問にフォーカスをセットする関数
export const FocusNextInput = (
  answers: Record<string, null>,
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>,
  page: {
    key: string;
    value: string;
  }[]
) => {
  useEffect(() => {
    //回答されていない最初の質問を探して変数に返す。全て入力されている場合は-1を返す
    const firstUnansweredIndex = page.findIndex((query) => !answers[query.key]);
    // 未回答が存在する(-1) && firstUnansweredIndex番目の要素が存在する場合、その要素にフォーカス
    if (
      firstUnansweredIndex !== -1 &&
      inputRefs.current[firstUnansweredIndex]
    ) {
      inputRefs.current[firstUnansweredIndex]?.focus();
    }
  }, [answers]);
};
