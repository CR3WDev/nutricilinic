import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../Pages/Login";
import { MenuPage } from "../../Pages/Menu";

export const InternalRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/*" element={<MenuPage />} />
    </Routes>
  );
};
