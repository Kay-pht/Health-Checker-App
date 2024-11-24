import useSWR from "swr";
import type { DBResultType } from "../../interfaces/interfaces.d.ts";
import Top from "../../components/TopBar";
import { Box, CircularProgress } from "@mui/material";

const MyPage = () => {
  const fetcher = async (url: string) => {
    // sessionStorageからトークンを取得
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      throw new Error("User is not authenticated");
    }
    try {
      // トークンをヘッダーに載せてバックエンドに送付
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
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const { data, error } = useSWR("/api/mypage", fetcher);

  if (error) return <div>Sorry...Please Log in again</div>;

  return (
    <div>
      <Top />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">これまでの診断結果</h1>
        {!data && (
          <div>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
            <p>loading...</p>
          </div>
        )}
        {data && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm md:text-base leading-normal">
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">#</th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">日付</th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">
                    スコア
                  </th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">
                    不足している栄養素
                  </th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">
                    おすすめの食材
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 text-sm md:text-base ">
                {data.map((result: DBResultType, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 font-semibold hover:bg-gray-100"
                  >
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {index + 1}
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {new Date(result.createdAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {result.score}
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {result.missingNutrients.join(", ")}
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {result.recommendedFoods.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
