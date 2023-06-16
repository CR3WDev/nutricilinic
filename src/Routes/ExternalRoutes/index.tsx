import { Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "../../Pages/Login";
import { MenuPage } from "../../Pages/Menu";
import { useState } from "react";

export const ExternalRoutes = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/*" element={<MenuPage />} />
    </Routes>
  );
};
