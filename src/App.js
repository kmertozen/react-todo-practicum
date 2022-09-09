import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import TodoContext from "./Context/TodoContext"
function App() {
  return (
    <TodoContext>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </TodoContext>
  );
}

export default App;
