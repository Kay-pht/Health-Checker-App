import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./services/firebase.ts";
import Result from "./pages/result/ResultPage.tsx";
import { useState } from "react";
import type { ResultType } from "./interfaces/interfaces.d.ts";
import MyPage from "./pages/myPage/MyPage";
import LandingPage from "./pages/LP/LandingPage";
import LoginPage from "./pages/login/LoginPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import QuestionFormPage from "./pages/questionForm/QuestionFormPage.tsx";
import ForgetPasswordPage from "./pages/forgetPassword/ForgetPasswordPage.tsx";
const App = () => {
  const [user] = useAuthState(auth);
  // 要確認
  // setDiagnosisResultをそのままプロップスとして渡しているが問題ないか？関数に内包して、関数を渡すほうが良いのか?
  const [diagnosisResult, setDiagnosisResult] = useState<ResultType | null>(
    null
  );

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/questionnaire" /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/questionnaire" /> : <RegisterPage />}
          />
          <Route
            path="/questionnaire"
            element={
              user ? (
                <QuestionFormPage setDiagnosisResult={setDiagnosisResult} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/result"
            element={
              user ? (
                <Result result={diagnosisResult} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/mypage"
            element={user ? <MyPage /> : <Navigate to="/login" />}
          />
          <Route path="/forget" element={<ForgetPasswordPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
