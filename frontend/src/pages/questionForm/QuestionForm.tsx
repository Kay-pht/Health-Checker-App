import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import QuestionsPage1 from "../../components/questionFormComps/QuestionsPage1";
import QuestionsPage2 from "../../components/questionFormComps/QuestionsPage2";
import QuestionsPage3 from "../../components/questionFormComps/QuestionsPage3";
import QuestionsPage4 from "../../components/questionFormComps/QuestionsPage4";
import QuestionsPage5 from "../../components/questionFormComps/QuestionsPage5";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getToken } from "../../firebase";
import "./QuestionForm.css";
import { ResultProps } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import Top from "../../components/TopBar";

// 質問フォームの親コンポーネント
const QuestionForm = ({ setDiagnosisResult }: ResultProps) => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  // 子コンポーネント内(ページ1~5)の回答をここでキャッチする
  // setStateを関数に内包して、プロップスとして渡す
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  //回答を送付して、AIによる診断結果を表示
  const getAnswers = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedAnswer = { content: answers };
    if (!user) {
      alert("Please sign in to proceed");
      return;
    }
    const token = await getToken(user);
    if (!token) {
      throw new Error("User is not authenticated");
    }
    // sessionStorageにトークンを保存
    sessionStorage.setItem("authToken", token);

    // ヘッダーにトークンを付与。バックエンドでの検証用
    try {
      navigate("/result");
      const response = await axios.post("/api/completion", submittedAnswer, {
        headers: {
          Authorization: `Bearer:${token}`,
        },
      });
      // ここで得たstateをResult.tsxで表示する
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
    <div>
      <Top />
      <div className="max-w-4xl mx-auto p-5 bg-gray-100 rounded-lg shadow-md">
        <form onSubmit={getAnswers}>
          <h3 className="text-xl text-gray-800 mb-5">
            以下の食材をどのくらいの頻度で食べるか教えてください！
          </h3>
          {page === 1 && (
            <QuestionsPage1 handleChange={handleChange} answers={answers} />
          )}
          {page === 2 && (
            <QuestionsPage2 handleChange={handleChange} answers={answers} />
          )}
          {page === 3 && (
            <QuestionsPage3 handleChange={handleChange} answers={answers} />
          )}
          {page === 4 && (
            <QuestionsPage4 handleChange={handleChange} answers={answers} />
          )}
          {page === 5 && (
            <QuestionsPage5 handleChange={handleChange} answers={answers} />
          )}
          <div className="flex justify-between items-center mt-5">
            {page > 1 && (
              <button
                className="w-24 text-center bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
                onClick={pageDownHandler}
              >
                previous
              </button>
            )}
            {page === 5 && (
              <button
                className="w-24 text-center bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition-transform transform hover:scale-105"
                type="submit"
              >
                Submit
              </button>
            )}
            {page !== 5 && (
              <button
                className="w-24 text-center bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105 ml-auto"
                onClick={pageUpHandler}
              >
                next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
