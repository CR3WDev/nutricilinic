import { Route, Routes } from "react-router-dom";
import { AgendamentosPage } from "../../Pages/Agendamentos";
import { MainPage } from "../../Pages/Main";
import { PacientesPage } from "../../Pages/Pacientes";
import { UsuariosPage } from "../../Pages/Usuarios";

export const InternalRoutes = () => {
  return (
    <Routes>
      <Route path="/main" element={<MainPage />} />
      <Route path="/agendamentos" element={<AgendamentosPage />} />
      <Route path="/pacientes" element={<PacientesPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
    </Routes>
  );
};
