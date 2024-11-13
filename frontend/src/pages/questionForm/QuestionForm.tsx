import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import QuestionsPage1 from "../../components/questionFormComps/QuestionsPage1";
import QuestionsPage2 from "../../components/questionFormComps/QuestionsPage2";
import QuestionsPage3 from "../../components/questionFormComps/QuestionsPage3";
import QuestionsPage4 from "../../components/questionFormComps/QuestionsPage4";
import QuestionsPage5 from "../../components/questionFormComps/QuestionsPage5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getToken, logOut } from "../../firebase";
import "./QuestionForm.css";
import { ResultProps, ResultType } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

// 質問フォームの親コンポーネント
const QuestionForm = ({ setDiagnosisResult }: ResultProps) => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  // 子コンポーネント内の回答をここでキャッチする
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };
  // ここのanyは問題ないのか?
  const [result, setResult] = useState<ResultType | null>(null);

  //回答を送付して、AIによる診断結果を表示
  const getAnswers = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedAnswer = { content: answers };
    // user!は問題ないか?
    const token = await getToken(user!);
    if (!token) {
      throw new Error("User is not authenticated");
    }
    // sessionStorageにトークンを保存
    sessionStorage.setItem("authToken", token);

    // ヘッダーにJWTを付けてバックエンドで検証するために送る
    try {
      navigate("/result");
      const response = await axios.post("/api/completion", submittedAnswer, {
        headers: {
          Authorization: `Bearer:${token}`,
        },
      });

      setResult(response.data);
      setDiagnosisResult(response.data);
    } catch (err) {
      console.error("Error sending answers to the backend API", err);
      alert("Error sending answers to the backend API");
    }
  };
  // 子コンポーネントの切り替え
  const [page, setPage] = useState(1);
  const pageUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(page + 1);
  };
  const pageDownHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPage(page - 1);
  };

  return (
    <div className="questionForm-wrapper">
      <form onSubmit={getAnswers}>
        {/* <h1>Health Checker App</h1> */}
        <button type="button" onClick={logOut}>
          Log out
        </button>

        <h3>以下の食材をどのくらいの頻度で食べるか教えてください！ </h3>
        {page === 1 && (
          <QuestionsPage1
            handleChange={handleChange}
            getAnswers={getAnswers}
            answers={answers}
          />
        )}
        {page === 2 && (
          <QuestionsPage2
            handleChange={handleChange}
            getAnswers={getAnswers}
            answers={answers}
          />
        )}
        {page === 3 && (
          <QuestionsPage3
            handleChange={handleChange}
            getAnswers={getAnswers}
            answers={answers}
          />
        )}
        {page === 4 && (
          <QuestionsPage4
            handleChange={handleChange}
            getAnswers={getAnswers}
            answers={answers}
          />
        )}
        {page === 5 && (
          <QuestionsPage5
            handleChange={handleChange}
            getAnswers={getAnswers}
            answers={answers}
          />
        )}
        <div className="button-group">
          {page > 1 && (
            <button className="previous" onClick={pageDownHandler}>
              previous
            </button>
          )}
          {page === 5 && (
            <button className="submit" type="submit">
              Submit
            </button>
          )}
          {page != 5 && (
            <button className="next" onClick={pageUpHandler}>
              next
            </button>
          )}
        </div>

        {result && (
          <div className="result">
            <h4>診断結果</h4>
            <p>不足している栄養素: {result.missingNutrients.join(", ")}</p>
            <p>推奨食材: {result.recommendedFoods.join(", ")}</p>
            <p>スコア: {result.score}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default QuestionForm;
