import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import QuestionForm from "./pages/questionForm/QuestionForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<QuestionForm />} />
        {/* <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} /> */}
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
