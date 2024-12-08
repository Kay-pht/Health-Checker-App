import { jest } from "@jest/globals";
import OpenAI from "openai";
import configEnv from "../configEnv.mjs";
import { ChatCompletion } from "openai/resources";

const originalEnv = process.env;
const orderedAnswers = {
  question1: "Answer1",
  question2: "Answer2",
  question3: "Answer3",
};

// 環境変数を差し替えてテストするために、環境変数を設定してから関数をインポートする必要があるので、動的インポートを採用
describe("getChatCompletion with invalid API key", () => {
  beforeEach(() => {
    // 環境変数のキャッシュをクリア
    jest.resetModules();

    process.env = {
      ...originalEnv,
    };
  });

  afterEach(() => {
    process.env = originalEnv; // テスト後に環境変数を元に戻す
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it("should throw an error due to the invalid key", async () => {
    process.env.OPENAI_API_KEY = "invalid_key";
    const { getChatCompletion } = await import("./openAI.mjs");
    await expect(getChatCompletion(orderedAnswers)).rejects.toThrow(
      "Failed to connect to OpenAI: 401 Incorrect API key provided: invalid_key. You can find your API key at https://platform.openai.com/account/api-keys."
    );
  });
});

// describe("getChatCompletion with null response from AI", () => {
// beforeEach(() => {

//   jest.mock("openai", () => {
//     return {
//       OpenAI: jest.fn().mockImplementation(() => {
//         return {
//           chat: {
//             completions: {
//               create: jest.fn<() => Promise<any>>().mockResolvedValue({
//                 choices: [{ message: { content: null } }],
//               }),
//             },
//           },
//         };
//       }),
//     };
//   });
// });

// afterEach(() => {
//   jest.resetModules();
//   jest.restoreAllMocks();
// });

// it("should throw an error due to the null response from chatGPT", async () => {
//   // TODO: write test case

//   const { getChatCompletion } = await import("./openAI.mjs");
//   await expect(getChatCompletion(orderedAnswers)).rejects.toThrow(
//     "Invalid response from OpenAI"
//   );
// });

describe("getChatCompletion", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock("openai", () => ({
      OpenAI: jest.fn().mockImplementation(() => ({
        chat: {
          completions: {
            create: jest.fn(),
          },
        },
      })),
    }));
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  // it("should throw an error due to the null response from chatGPT", async () => {
  //   const mockCreate = jest.fn<() => Promise<any>>().mockResolvedValue({
  //     choices: [{ message: { content: null } }],
  //   });

  //   const mockOpenAI = new OpenAI() as jest.Mocked<OpenAI>;
  //   mockOpenAI.chat.completions.create = mockCreate;

  //   const { getChatCompletion } = await import("./openAI.mjs");
  //   await expect(getChatCompletion(orderedAnswers)).rejects.toThrow(
  //     "Invalid response from OpenAI"
  //   );
  // });

  it("should return an intended response with mock function", async () => {
    // TODO: write test case
  });
});

// describe("getChatCompletion", () => {
//   let mockCreate;

//   beforeEach(() => {
//     mockCreate = openai.chat.completions.create;
//     mockCreate.mockClear();
//   });

//   it("should throw an error due to the invalid key", async () => {
//     // TODO: write test case
//   });

//   it("should throw an error due to the null response from chatGPT", async () => {
//     // TODO: write test case
//   });

//   it("should return an intended response with mock function", async () => {
//     const orderedAnswers = {
//       question1: "Answer1",
//       question2: "Answer2",
//       question3: "Answer3",
//     };
//     const mockResponse: ChatCompletion = {
//       id: "chatcmpl-123",
//       object: "chat.completion",
//       created: 1677652288,
//       model: "gpt-3.5-turbo-0613",
//       choices: [
//         {
//           index: 0,
//           message: {
//             role: "assistant",
//             content: JSON.stringify({
//               missingNutrients: [
//                 "食物繊維",
//                 "ビタミンB群",
//                 "カルシウム",
//                 "ビタミンD",
//               ],
//               recommendedFoods: ["アーモンド", "ブロッコリー", "納豆", "サバ"],
//               score: 70,
//             }),
//             refusal: "none",
//           },
//           finish_reason: "stop",
//           logprobs: null,
//         },
//       ],
//       usage: {
//         prompt_tokens: 9,
//         completion_tokens: 12,
//         total_tokens: 21,
//       },
//     };
//     mockCreate.mockResolvedValueOnce(mockResponse);
//     const response = await getChatCompletion(orderedAnswers);
//   }, 20000);
// });
