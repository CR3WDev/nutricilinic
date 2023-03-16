import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/Login";
import { MenuPage } from "./Pages/menu";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/*" element={<MenuPage />} />
    </Routes>
  );
}

export default App;
