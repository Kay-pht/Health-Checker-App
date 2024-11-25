import { SendAnswersType } from "../interfaces/interfaces";

// MyPageで過去の診断結果を取得する際のHTTP層の処理を担当する関数
export const fetchHistoryData = async (url: string, token: string) => {
  try {
    // トークンをヘッダーに載せてバックエンドに送付(検証用)
    // レスとしてこれまでの診断データ(from DB)を送ってもらう
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// バックエンドにユーザーの回答を送付して、AIの診断結果をレスとして取得する関数
export const sendAnswersFunc = async ({
  token,
  submittedAnswer,
}: SendAnswersType) => {
  // ヘッダーにトークンを付与。バックエンドでの検証用
  try {
    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedAnswer),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
