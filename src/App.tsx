import { Routes, Route, Outlet, Link } from "react-router-dom";
import { MainPage } from "./Pages/main";
import { LoginPage } from "./Pages/Login";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
