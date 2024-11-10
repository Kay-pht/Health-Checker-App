import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import QuestionsPage1 from "../../components/questionFormComps/QuestionsPage1";
import QuestionsPage2 from "../../components/questionFormComps/QuestionsPage2";
import QuestionsPage3 from "../../components/questionFormComps/QuestionsPage3";
import QuestionsPage4 from "../../components/questionFormComps/QuestionsPage4";
import QuestionsPage5 from "../../components/questionFormComps/QuestionsPage5";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logOut } from "../../firebase";
import "./QuestionForm.css";

const QuestionForm = () => {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log(answers);
  }, [answers]);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };
  const [result, setResult] = useState("");

  // Send the answers to the backend API for further processing
  const getAnswers = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedAnswer = { content: answers };

    try {
      const response = await axios.post("/api/completion", submittedAnswer);
      setResult(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error sending answers to the backend API", err);
      alert("Error sending answers to the backend API");
    }
  };

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
            result={result}
            getAnswers={getAnswers}
            answers={answers}
          />
        )}
        {page === 2 && (
          <QuestionsPage2
            handleChange={handleChange}
            result={result}
            getAnswers={getAnswers}
            answers={answers}
          />
        )}
        {page === 3 && (
          <QuestionsPage3
            handleChange={handleChange}
            result={result}
            getAnswers={getAnswers}
            answers={answers}
          />
        )}
        {page === 4 && (
          <QuestionsPage4
            handleChange={handleChange}
            result={result}
            getAnswers={getAnswers}
            answers={answers}
          />
        )}
        {page === 5 && (
          <QuestionsPage5
            handleChange={handleChange}
            result={result}
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

        <div className="result">{result}</div>
      </form>
    </div>
  );
};

export default QuestionForm;
