import { Route, Routes } from "react-router-dom";
import { AgendamentosPage } from "../../Pages/Agendamentos";
import { MainPage } from "../../Pages/Main";
import { PacientesPage } from "../../Pages/Pacientes";

export const ExternalRoutes = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/agendamentos" element={<AgendamentosPage />} />
      <Route path="/pacientes" element={<PacientesPage />} />
    </Routes>
  );
};
