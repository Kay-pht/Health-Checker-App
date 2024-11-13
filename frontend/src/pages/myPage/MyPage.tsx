import useSWR from "swr";
import axios from "axios";
import { DBResultType } from "../../interfaces/interfaces";

const fetcher = async (url: string) => {
  const token = sessionStorage.getItem("authToken");
  if (!token) {
    throw new Error("User is not authenticated");
  }
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer:${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const MyPage = () => {
  const { data, error } = useSWR("/api/mypage", fetcher);
  console.log(data);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">これまでの診断結果</h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">#</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Score</th>
            <th className="py-3 px-6 text-left">Missing Nutrients</th>
            <th className="py-3 px-6 text-left">Recommended Foods</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((result: DBResultType, index: number) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">
                {new Date(result.createdAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </td>
              <td className="py-3 px-6 text-left">{result.score}</td>
              <td className="py-3 px-6 text-left">
                {result.missingNutrients.join(", ")}
              </td>
              <td className="py-3 px-6 text-left">
                {result.recommendedFoods.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPage;
