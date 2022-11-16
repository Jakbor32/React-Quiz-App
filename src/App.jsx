import "./App.css";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Form/form";
import Quiz from "./components/Quiz/quiz";

function App() {
  return (
    <Routes>
      {/* switch page */}
      <Route path="/" element={<Form />}></Route>
      <Route path="/quiz" element={<Quiz />}></Route>
    </Routes>
  );
}
export default App;
