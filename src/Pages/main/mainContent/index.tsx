import { ListBox } from "primereact/listbox";
import React, { useState } from "react";
import { InfoModal } from "./infoModal";

export const MainContent = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <div>
      <div className="flex mt-3 justify-content-around">
        <div>
          <InfoModal
            icon="pi pi-users"
            text="Total de pacientes"
            value={16}
          ></InfoModal>
          <h3 className="mt-3">Solicitação de agendamentos</h3>
          <ListBox
            filterPlaceholder="Buscar por solicitações"
            filter
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            className="w-full"
          />
        </div>
        <div>
          <InfoModal
            icon="pi pi-calendar"
            text="Agendamentos"
            value={50}
          ></InfoModal>
          <h3 className="mt-3">Pacientes</h3>
          <ListBox
            filter
            filterPlaceholder="Buscar por paciente"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            className="w-full"
          />
        </div>
        <div>
          <InfoModal
            icon="pi pi-book"
            text="Atendimentos"
            value={100}
          ></InfoModal>
          <h3 className="mt-3">Agendamentos do dia</h3>
          <ListBox
            filter
            filterPlaceholder="Buscar por agendamento"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
