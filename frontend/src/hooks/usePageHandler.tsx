import { useState } from "react";

// 子コンポーネントのページ切り替え操作用のフックス
const usePageHandler = () => {
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const pageUpHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentPageNum(currentPageNum + 1);
  };
  const pageDownHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentPageNum(currentPageNum - 1);
  };
  return { currentPageNum, pageUpHandler, pageDownHandler };
};

export default usePageHandler;
