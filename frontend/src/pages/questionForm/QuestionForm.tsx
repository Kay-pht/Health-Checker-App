import axios from "axios";
import React, { FormEvent, useState } from "react";
import QuestionsPage1 from "../../component/questionPages/QuestionsPage1";
import QuestionsPage2 from "../../component/questionPages/QuestionsPage2";
import QuestionsPage3 from "../../component/questionPages/QuestionsPage3";
import QuestionsPage4 from "../../component/questionPages/QuestionsPage4";
import QuestionsPage5 from "../../component/questionPages/QuestionsPage5";

const QuestionForm = () => {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
    console.log(answers);
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
    <div>
      <form onSubmit={getAnswers}>
        <h1>Health Checker App</h1>
        {page === 1 && (
          <QuestionsPage1
            handleChange={handleChange}
            result={result}
            getAnswers={getAnswers}
            // answers={answers}
          />
        )}
        {page === 2 && (
          <QuestionsPage2
            handleChange={handleChange}
            result={result}
            getAnswers={getAnswers}
            // answers={answers}
          />
        )}
        {page === 3 && (
          <QuestionsPage3
            handleChange={handleChange}
            result={result}
            getAnswers={getAnswers}
            // answers={answers}
          />
        )}
        {page === 4 && (
          <QuestionsPage4
            handleChange={handleChange}
            result={result}
            getAnswers={getAnswers}
            // answers={answers}
          />
        )}
        {page === 5 && (
          <QuestionsPage5
            handleChange={handleChange}
            result={result}
            getAnswers={getAnswers}
            // answers={answers}
          />
        )}
        {page}
        {page > 1 && <button onClick={pageDownHandler}>previous</button>}
        {page <= 4 && <button onClick={pageUpHandler}>next</button>}
        {page === 5 && <button type="submit">Submit</button>}
        <div className="result">{result}</div>
      </form>
    </div>
  );
};

{
  /* <Route
          path="/page2"
          element={
            <QuestionsPage2
              handleChange={handleChange}
              result={result}
              getAnswers={getAnswers}
              answers={answers}
            />
          }
        />
        <Route
          path="/page3"
          element={
            <QuestionsPage3
              handleChange={handleChange}
              result={result}
              getAnswers={getAnswers}
              answers={answers}
            />
          }
        />
        <Route
          path="/page4"
          element={
            <QuestionsPage4
              handleChange={handleChange}
              result={result}
              getAnswers={getAnswers}
              answers={answers}
            />
          }
        />
        <Route
          path="/page5"
          element={
            <QuestionsPage5
              handleChange={handleChange}
              result={result}
              getAnswers={getAnswers}
              answers={answers}
            />
          }
        /> */
}

export default QuestionForm;
