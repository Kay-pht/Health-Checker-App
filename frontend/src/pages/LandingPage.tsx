import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        ようこそ！AI食生活診断テストへ
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        あなたの食生活を診断し、健康的な生活をサポートします。
      </p>
      <button
        className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 hover:scale-105"
        onClick={handleStartClick}
      >
        診断スタート
      </button>
    </div>
  );
};

export default LandingPage;
