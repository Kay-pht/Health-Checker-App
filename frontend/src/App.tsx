import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import QuestionForm from "./pages/questionForm/QuestionForm";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/questionnaire" element={<QuestionForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/profile/:username" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
