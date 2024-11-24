import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.ts";
import type { ResultProps } from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import QuestionBlockComp from "../../components/questionFormComps/QuestionBlockComp.tsx";
import { foodQueryPages } from "../../utils/queryData.tsx";
import fetchAnswersFromAI from "../../../helpers/fetchAnswersFromAI.ts";
import PercentBar from "../../components/questionFormComps/PercentBar.tsx";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import TopBar from "../../components/TopBar.tsx";

// 質問フォームの親コンポーネント
const QuestionFormPage = ({ setDiagnosisResult }: ResultProps) => {
  const [userAnswers, setUserAnswers] = useState({});
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

  // 子コンポーネント内(ページ1~5)の回答をここでキャッチする
  // setStateを関数に内包して、プロップスとして渡す
  const getAnswersInEachPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  // 子コンポーネントのページ切り替え操作用の関数
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const pageUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentPageNum(currentPageNum + 1);
  };
  const pageDownHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentPageNum(currentPageNum - 1);
  };

  return (
    <div>
      <TopBar />
      <div className="max-w-4xl mx-auto p-5 bg-gray-100 shadow-md">
        <form
          onSubmit={(e) =>
            fetchAnswersFromAI({
              e,
              user,
              userAnswers,
              setDiagnosisResult,
              navigate,
            })
          }
        >
          <h3 className="text-xl text-gray-600 mb-5 font-semibold text-center">
            以下の食材をどのくらいの頻度で食べるか教えてください！
          </h3>
          {currentPageNum > 1 && (
            <PercentBar percent={(currentPageNum - 1) * 20} />
          )}
          {
            //map関数でページ分け
            foodQueryPages.map(
              (foodQueryPage, index) =>
                currentPageNum === index + 1 && (
                  <QuestionBlockComp
                    key={index}
                    foodQueryPage={[...foodQueryPage]}
                    userAnswers={userAnswers}
                    getAnswersInEachPage={getAnswersInEachPage}
                    currentPageNum={currentPageNum}
                  />
                )
            )
          }
          <div className="flex justify-between items-center mt-5">
            {currentPageNum > 1 && (
              <button
                className="w-24 text-center bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
                onClick={pageDownHandler}
              >
                {/* previous */}
                <KeyboardDoubleArrowLeftRoundedIcon />
              </button>
            )}
            {currentPageNum === 5 && (
              <button
                className="w-24 text-center bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition-transform transform hover:scale-105"
                type="submit"
              >
                send <SendRoundedIcon fontSize="inherit" />
              </button>
            )}
            {currentPageNum !== 5 && (
              <button
                className="w-24 text-center bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105 ml-auto"
                onClick={pageUpHandler}
              >
                {/* next */}
                <KeyboardDoubleArrowRightRoundedIcon />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionFormPage;
