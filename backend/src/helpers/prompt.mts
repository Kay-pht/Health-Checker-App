import { ChatCompletionMessageParam } from "openai/resources";

const requestBody = (answers: any): ChatCompletionMessageParam[] => {
  return [
    { role: "system", content: "You are a helpful assistant." },
    {
      role: "user",
      content: JSON.stringify(answers),
    },
  ];
};
export default requestBody;
