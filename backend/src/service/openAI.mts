import OpenAI from "openai";
import prompt from "../helpers/prompt.mjs";
import configEnv from "../configEnv.mjs";

const openai = new OpenAI({
  apiKey: configEnv.openaiApiKey,
});

// データアクセス(ChatGPTとの連携)部分の実装
async function getChatCompletion(orderedAnswers: {
  [key: string]: string | null;
}) {
  try {
    // OpenAIのChatGPTに回答を送付して、返答をレスとして受け取る
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: prompt(orderedAnswers),
    });
    const responseFromAI = completion.choices[0].message.content;
    if (responseFromAI) {
      return responseFromAI;
    } else {
      console.error("Invalid response from OpenAI");
      throw new Error("Invalid response format from OpenAI");
    }
  } catch (error) {
    console.error("Can't connect to OpenAI", error);
    if (error instanceof Error) {
      throw new Error("Failed to connect to OpenAI: " + error.message);
    } else {
      throw new Error("Failed to connect to OpenAI: An unknown error occurred");
    }
  }
}

export { getChatCompletion };
