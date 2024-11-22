import type { GetAnswersFromAIType } from "../src/interfaces/interfaces.d.ts";
import { getToken } from "../src/firebase";

//回答をバックエンドに投げて、AIによる診断結果(レス)を表示する関数
const GetAnswersFromAI = async ({
  e,
  user,
  answers,
  setDiagnosisResult,
  navigate,
}: GetAnswersFromAIType) => {
  e.preventDefault();

  const submittedAnswer = { content: answers };
  if (!user) {
    alert("Please sign in to proceed");
    return;
  }
  const token = await getToken(user);
  if (!token) {
    throw new Error("User is not authenticated");
  }
  // sessionStorageにトークンを保存
  sessionStorage.setItem("authToken", token);

  // ヘッダーにトークンを付与。バックエンドでの検証用
  try {
    navigate("/result");
    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedAnswer),
    });
    // fetchはエラーを自動的にキャッチしないため、要エラーハンドリング
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    // ここで得たstateをResult.tsxで表示する
    setDiagnosisResult(responseData);
  } catch (err) {
    console.error("Error sending answers to the backend API", err);
    alert("Error sending answers to the backend API");
  }
};

export default GetAnswersFromAI;
