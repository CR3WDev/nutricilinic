import React from "react";
import { Route, Routes } from "react-router-dom";
import { SidebarComponent } from "../../Components/Layout/sidebar";
import { Topbar } from "../../Components/Layout/topbar";
import { AgendamentosPage } from "../agendamentos";
import { MainPage } from "../main";
import { PacientesPage } from "../pacientes";

export const MenuPage = () => {
  return (
    <div className="flex">
      <SidebarComponent />
      <div className="flex-col">
        <Topbar />
        <div
          style={{
            width: "calc(100vw - 250px)",
            height: "calc(100vh - 47.2px - 1rem)",
          }}
        >
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/agendamentos" element={<AgendamentosPage />} />
            <Route path="/pacientes" element={<PacientesPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
