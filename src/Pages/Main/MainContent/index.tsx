import { ListBox } from "primereact/listbox";
import { useState } from "react";
import { MainInfo } from "./MainInfo";
import { Avatar } from "primereact/avatar";
import { pacientes, pacientes2 } from "../../../Utils/mock/pacientes";
import { cities } from "../../../Utils/mock/cities";
import { IPaciente } from "../../../Models/pacientes";
import { Tag } from "primereact/tag";

export const MainContent = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  function obterIniciais(nomeCompleto: string) {
    let palavras = nomeCompleto.split(" ");
    let primeiroNome = palavras[0];
    let ultimoSobrenome = palavras[palavras.length - 1];
    let inicialPrimeiroNome = primeiroNome.charAt(0).toUpperCase();
    let inicialUltimoSobrenome = ultimoSobrenome.charAt(0).toUpperCase();
    if (palavras.length === 1) return inicialPrimeiroNome;
    return inicialPrimeiroNome + inicialUltimoSobrenome;
  }

  const pacientesTemplate = (option: IPaciente) => {
    return (
      <div className="flex align-items-center">
        <Avatar
          shape="circle"
          label={obterIniciais(option.nome)}
          size="large"
        />
        <div className="pl-2 text-lg">{option.nome}</div>
      </div>
    );
  };
  const solicitacaoAgentamentoTemplate = (option: IPaciente) => {
    return (
      <div className="flex align-items-center">
        <Avatar
          shape="circle"
          label={obterIniciais(option.nome)}
          size="large"
        />
        <div style={{ width: 300 }}>
          <div>
            <span className="pl-2 text-lg">{option.nome}</span>
          </div>
          <div className="text-xs w-full bg-primary">
            <span className="pl-2">{option.peso},</span>
            <span className="pl-2">{option.sexo},</span>
            <span className="pl-2">
              {option.dataAgendamento?.toDateString()}
            </span>
            <span>
              <Tag
                severity={option.status === "aprovado" ? "success" : "danger"}
                value={option.status}
              ></Tag>
            </span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="flex mt-3 justify-content-around">
        <div>
          <MainInfo
            icon="pi pi-users"
            text="Total de pacientes"
            value={16}
          ></MainInfo>
          <h3 className="mt-3 mb-2">Solicitação de agendamentos</h3>
          <ListBox
            emptyFilterMessage="Nenhum resultado encontrado!"
            listStyle={{ height: "450px" }}
            itemTemplate={solicitacaoAgentamentoTemplate}
            filterPlaceholder="Buscar por solicitações"
            filter
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={pacientes2}
            optionLabel="name"
          />
        </div>
        <div>
          <MainInfo
            icon="pi pi-calendar"
            text="Agendamentos"
            value={50}
          ></MainInfo>
          <h3 className="mt-3 mb-2">Pacientes</h3>
          <ListBox
            emptyFilterMessage="Nenhum resultado encontrado!"
            listStyle={{ height: "450px" }}
            itemTemplate={pacientesTemplate}
            filter
            filterPlaceholder="Buscar por paciente"
            value={selectedPaciente}
            onChange={(e) => setSelectedPaciente(e.value)}
            options={pacientes}
            optionLabel="nome"
            className="w-full"
          />
        </div>
        <div>
          <MainInfo
            icon="pi pi-book"
            text="Atendimentos"
            value={100}
          ></MainInfo>
          <h3 className="mt-3 mb-2">Agendamentos do dia</h3>
          <ListBox
            emptyFilterMessage="Nenhum resultado encontrado!"
            listStyle={{ height: "450px" }}
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
