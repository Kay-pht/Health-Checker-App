import type {
  answerByChatGPTType,
  userAnswerFormatType,
} from "../interfaces/interfaces.js";

// ユーザー回答の型ガードを実装
function isUserAnswerFormatType(value: unknown): value is userAnswerFormatType {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  return true;
}

// userの回答順で格納されているリクエストを、質問番号順に並べ替える関数
function orderAnswers(answers: unknown) {
  // TODO:add request validation here

  if (!isUserAnswerFormatType(answers)) {
    throw new Error("Answers must be an object with string values");
  }
  const orderedAnswers: userAnswerFormatType = {};
  for (let i = 1; i <= Object.keys(answers).length; i++) {
    const key = `q${i}`;
    const answer = answers[key];
    orderedAnswers[key] = answer;
  }
  return orderedAnswers;
}

//JavaScriptのオブジェクトに変換
function parseResponseFromAI(response: string): answerByChatGPTType {
  try {
    const parsedResponse: answerByChatGPTType = JSON.parse(response);
    return parsedResponse;
  } catch (error) {
    console.error("Failed to parse response from AI", error);
    throw new Error("Failed to parse response format from AI");
  }
}

export { orderAnswers, parseResponseFromAI, isUserAnswerFormatType };
