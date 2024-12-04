import { jest } from "@jest/globals"; // Jestのグローバル関数をインポート
import OpenAI from "openai";
import configEnv from "../configEnv.mjs";
import getChatCompletion from "./openAI.mjs";
import { ChatCompletion } from "openai/resources";

const openai = new OpenAI({ apiKey: configEnv.openaiApiKey });
// const mockOpenAI = jest.mocked(openai.chat.completions.create);
const mockOpenAI = jest.spyOn(openai.chat.completions, "create"); // jest.spyOnを使用

describe("getChatCompletion", () => {
  beforeEach(() => {
    mockOpenAI.mockClear();
  });

  it("should return a response from OpenAI", async () => {
    const orderedAnswers = {
      question1: "Answer1",
      question2: "Answer2",
      question3: "Answer3",
    };
    const mockResponse: ChatCompletion = {
      id: "chatcmpl-123",
      object: "chat.completion",
      created: 1677652288,
      model: "gpt-3.5-turbo-0613",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: JSON.stringify({
              missingNutrients: [
                "食物繊維",
                "ビタミンB群",
                "カルシウム",
                "ビタミンD",
              ],
              recommendedFoods: ["アーモンド", "ブロッコリー", "納豆", "サバ"],
              score: 70,
            }),
            refusal: "none",
          },
          finish_reason: "stop",
          logprobs: null,
        },
      ],
      usage: {
        prompt_tokens: 9,
        completion_tokens: 12,
        total_tokens: 21,
      },
    };
    mockOpenAI.mockResolvedValueOnce(mockResponse);

    const response = await getChatCompletion(orderedAnswers);

    expect(response).toEqual(
      JSON.parse(mockResponse.choices[0].message.content!)
    );
  });
});
