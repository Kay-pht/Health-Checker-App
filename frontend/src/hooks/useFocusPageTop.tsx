import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// URLパス変更が発生しないコンポーネント変更時にスクロール位置をトップに戻すロジック
export const useFocusTopComp = (someState: number) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [someState]);
};

//  URLパス変更が発生する場合にスクロール位置をトップに戻すロジック

export const useFocusTopPage = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
};
