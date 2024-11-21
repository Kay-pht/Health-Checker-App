import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import "./QuestionForm.css";
import { ResultProps } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import Top from "../../components/TopBar";
import QuestionComp from "../../components/questionFormComps/QuestionComp";
import { queryArrayPages } from "../../utils/queryData";
import getAnswersFromAI from "../../../helpers/GetAnswersFromAI";

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
  const getAnswersFromEachPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  // 子コンポーネントのページ切り替え操作用の関数
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
        <form
          onSubmit={(e) =>
            getAnswersFromAI({ e, user, answers, setDiagnosisResult, navigate })
          }
        >
          <h3 className="text-xl text-gray-800 mb-5">
            以下の食材をどのくらいの頻度で食べるか教えてください！
          </h3>
          {
            //map関数でページ分け
            queryArrayPages.map(
              (queryArray, index) =>
                page === index + 1 && (
                  <QuestionComp
                    key={index}
                    queryArray={[...queryArray]}
                    answers={answers}
                    getAnswersFromEachPage={getAnswersFromEachPage}
                    page={page}
                  />
                )
            )
          }
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
