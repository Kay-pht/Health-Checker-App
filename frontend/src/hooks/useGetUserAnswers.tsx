import { useEffect, useState } from "react";

// QuestionBlockComp内(ページ1~5)の回答をここでキャッチする
const useGetUserAnswers = () => {
  const [userAnswers, setUserAnswers] = useState({});
  //ユーザーの回答を記録するロジックを実装する
  const getAnswersInEachPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };
  //
  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

  return { userAnswers, getAnswersInEachPage };
};

export default useGetUserAnswers;
