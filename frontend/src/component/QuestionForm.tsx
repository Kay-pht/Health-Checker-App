import axios from "axios";
import React, { FormEvent, useState } from "react";

export const QuestionForm = () => {
  const [answers, setAnswers] = useState({
    carb_preference_q1: "",
    carb_preference_q2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
    // console.log(name, value);
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

  return (
    <div>
      <form onSubmit={getAnswers}>
        <h1>Health Checker App</h1>
        <div className="questionsWrapper">
          <div>
            <h3>Q1. 白米、玄米、パン（食パンや全粒粉パン）【炭水化物】</h3>
            <div>
              <label htmlFor="q1_option1">
                <input
                  aria-label="Q1 Option 1"
                  id="q1_option1"
                  name="carb_preference_q1"
                  type="radio"
                  value="1"
                  checked={answers.carb_preference_q1 === "1"}
                  onChange={handleChange}
                  required
                />
                <span>1: 週0～1日</span>
              </label>
              <label htmlFor="q1_option2">
                <input
                  aria-label="Q1 Option 2"
                  id="q1_option2"
                  name="carb_preference_q1"
                  type="radio"
                  value="2"
                  checked={answers.carb_preference_q1 === "2"}
                  onChange={handleChange}
                />
                <span>2: 週2～3日</span>
              </label>
              <label htmlFor="q1_option3">
                <input
                  aria-label="Q1 Option 3"
                  id="q1_option3"
                  name="carb_preference_q1"
                  type="radio"
                  value="3"
                  checked={answers.carb_preference_q1 === "3"}
                  onChange={handleChange}
                />
                <span>3: 週4～5日</span>
              </label>
              <label htmlFor="q1_option4">
                <input
                  aria-label="Q1 Option 4"
                  id="q1_option4"
                  name="carb_preference_q1"
                  type="radio"
                  value="4"
                  checked={answers.carb_preference_q1 === "4"}
                  onChange={handleChange}
                />
                <span>4: ほぼ毎日</span>
              </label>
            </div>
          </div>
          <div>
            <h3>Q2. うどん、そば、パスタ【炭水化物】</h3>
            <div>
              <label htmlFor="q2_option1">
                <input
                  aria-label="Q2 Option 1"
                  id="q2_option1"
                  name="carb_preference_q2"
                  type="radio"
                  value="1"
                  checked={answers.carb_preference_q2 === "1"}
                  onChange={handleChange}
                  required
                />
                <span>1: 週0～1日</span>
              </label>
              <label htmlFor="q2_option2">
                <input
                  aria-label="Q2 Option 2"
                  id="q2_option2"
                  name="carb_preference_q2"
                  type="radio"
                  value="2"
                  checked={answers.carb_preference_q2 === "2"}
                  onChange={handleChange}
                />
                <span>2: 週2～3日</span>
              </label>
              <label htmlFor="q2_option3">
                <input
                  aria-label="Q2 Option 3"
                  id="q2_option3"
                  name="carb_preference_q2"
                  type="radio"
                  value="3"
                  checked={answers.carb_preference_q2 === "3"}
                  onChange={handleChange}
                />
                <span>3: 週4～5日</span>
              </label>
              <label htmlFor="q2_option4">
                <input
                  aria-label="Q2 Option 4"
                  id="q2_option4"
                  name="carb_preference_q2"
                  type="radio"
                  value="4"
                  checked={answers.carb_preference_q2 === "4"}
                  onChange={handleChange}
                />
                <span>4: ほぼ毎日</span>
              </label>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
        <div className="result">{result}</div>
      </form>
    </div>
  );
};
