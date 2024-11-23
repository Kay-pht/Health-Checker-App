import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  // Navigate,
} from "react-router-dom";
import QuestionForm from "./pages/questionForm/QuestionForm";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Result from "./pages/result/Result";
import { useState } from "react";
import type { ResultType } from "./interfaces/interfaces.d.ts";
import MyPage from "./pages/myPage/MyPage";
import LandingPage from "./pages/LP/LandingPage";

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
            element={user ? <Navigate to="/questionnaire" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/questionnaire" /> : <Register />}
          />
          <Route
            path="/questionnaire"
            element={
              user ? (
                <QuestionForm setDiagnosisResult={setDiagnosisResult} />
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
          <Route path="/forget" element={<ForgetPassword />} />

          {/* <Route path="/questionnaire" element={<QuestionForm />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
