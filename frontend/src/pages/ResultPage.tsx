import { Box, CircularProgress } from "@mui/material";
import { ResultPageProps } from "../interfaces/interfaces";
import { useFocusTopPage } from "../hooks/useFocusPageTop";
import TopBar from "../components/TopBar";
import CautionInResult from "../components/CautionInResult";

// 診断結果ページ
const ResultPage = ({ result }: ResultPageProps) => {
  useFocusTopPage();
  return (
    <div>
      <TopBar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
          {result ? (
            <div className="result">
              <div className="font-semibold">
                <h4 className="text-2xl font-bold  text-gray-900 mb-4 ">
                  診断結果
                </h4>
                <p className="text-lg mb-2 text-gray-700">
                  不足栄養素 :{" "}
                  <span className="font-semibold text-red-500">
                    {result.missingNutrients.join(", ")}
                  </span>
                </p>
                <p className="text-lg mb-2 text-gray-700">
                  推奨食材 :{" "}
                  <span className="font-semibold text-green-500">
                    {result.recommendedFoods.join(", ")}
                  </span>
                </p>
                <p className="text-lg text-gray-700">
                  スコア :{" "}
                  <span className="font-semibold text-blue-500">
                    {result.score}
                  </span>
                </p>
              </div>
              <CautionInResult />
            </div>
          ) : (
            <div>
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
              <p className="text-lg text-gray-500">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
