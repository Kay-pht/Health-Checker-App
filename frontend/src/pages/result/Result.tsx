import { Link } from "react-router-dom";
import { logOut } from "../../firebase";
import { ResultType } from "../../interfaces/interfaces";

interface ResultProps {
  result: ResultType | null;
}

const Result = ({ result }: ResultProps) => {
  return (
    <div>
      <button onClick={logOut}>Log out</button>
      <Link to={"/mypage"}>マイページ</Link>
      <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
        {result ? (
          <div className="result">
            <h4 className="text-2xl font-bold text-gray-900">診断結果</h4>
            <p className="text-lg text-gray-700">
              不足している栄養素:{" "}
              <span className="font-semibold text-red-500">
                {result.missingNutrients.join(", ")}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              推奨食材:{" "}
              <span className="font-semibold text-green-500">
                {result.recommendedFoods.join(", ")}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              スコア:{" "}
              <span className="font-semibold text-blue-500">
                {result.score}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-lg text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Result;
