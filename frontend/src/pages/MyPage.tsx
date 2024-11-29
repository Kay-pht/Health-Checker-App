import useSWR from "swr";
import type { DBResultType } from "../interfaces/interfaces";
import { Box, CircularProgress } from "@mui/material";
import TopBar from "../components/TopBar.tsx";
import fetchUserHistoryData from "../services/fetchUserHistoryData.ts";
// import { logOut } from "../../services/firebase.ts";
import { useFocusTopPage } from "../hooks/useFocusPageTop.tsx";

const MyPage = () => {
  useFocusTopPage();

  // 過去の診断データをバックエンドから受け取る
  const { data, error } = useSWR("/api/mypage", fetchUserHistoryData);

  if (error) {
    // setTimeout(async () => {
    //   await logOut();
    //   window.location.reload();
    // }, 5000); // エラーなら3秒後にログアウト
    return <div>Sorry...Please Log in again</div>;
  }

  return (
    <div>
      <TopBar />
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
