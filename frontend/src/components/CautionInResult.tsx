const CautionInResult = () => {
  return (
    <div className="text-sm text-gray-800 mt-5 border-2 space-y-2">
      <div className="p-3">
        <p className="mb-2 font-bold text-base">[注意事項]</p>
        <div className="font-normal">
          <p className="font-bold">1. 正確性について</p>
          <p>
            本診断の結果は、AIが提供する一般的なアドバイスであり、必ずしも正確性が高いとは限りません。入力データの質やAIの限界により、結果が変わります。
          </p>
          <p className="font-bold mt-1">2. 診断結果の活用</p>
          <p>
            診断結果は、日常の食生活改善の
            <span className="text-red-500 font-bold">あくまで参考程度</span>
            にご利用ください。具体的な健康改善や治療を目的とする場合は、専門家の意見を求めることをお勧めします。
          </p>
          <p className="font-bold mt-1">3. プライバシーの保護</p>
          <p>
            ユーザーのプライバシーを最優先に考え、入力されたデータは診断目的以外には使用しません。
          </p>
        </div>
      </div>
    </div>
  );
};

export default CautionInResult;
