import { userAnswerFormatType } from "../interfaces/interfaces";
import { isUserAnswerFormatType, orderAnswers } from "./answerHelpers.mjs";

describe("isUserAnswerFormatType function", () => {
  it("should return true for valid userAnswerFormatType", () => {
    const userAnswer: userAnswerFormatType = {
      q1: "Answer 1",
      q2: "Answer 2",
      q3: "Answer 3",
    };
    expect(isUserAnswerFormatType(userAnswer)).toBe(true);
  });

  it("should return false due to the null value", () => {
    const userAnswer = null;
    expect(isUserAnswerFormatType(userAnswer)).toBe(false);
  });
  it("should return false due to the non-object value", () => {
    const userAnswer = "not an object";
    expect(isUserAnswerFormatType(userAnswer)).toBe(false);
  });
});

// TODO:test orderAnswers function
describe("orderAnswers function", () => {
  const answers = {
    q2: "Answer 2",
    q3: "Answer 3",
    q1: "Answer 1",
  };
  it("should order the answers correctly", () => {
    expect(orderAnswers(answers)).toEqual({
      q1: "Answer 1",
      q2: "Answer 2",
      q3: "Answer 3",
    });
  });
});
