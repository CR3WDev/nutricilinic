import { ListBox } from "primereact/listbox";
import { useState } from "react";
import { MainInfo } from "./MainInfo";
import { Avatar } from "primereact/avatar";
import { pacientes, pacientes2 } from "../../../Utils/mock/pacientes";
import { IPaciente } from "../../../Models/pacientes";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import moment from "moment";
export const MainContent = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [solicitacaoAgentamento, setSolicitacoesAgendamento] = useState();
  const [solicitacaoAgentamentoDia, setSolicitacoesAgendamentoDia] = useState();

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
          <div className="text-xs w-full flex justify-content-between">
            <div className="flex align-items-center">
              <span className="pl-2">{option.peso},</span>
              <span className="pl-2">{option.sexo},</span>
              <span className="pl-2">
                {option.dataAgendamento?.toDateString()}
              </span>
            </div>

            <div>
              {option.status ? (
                <Tag
                  style={{ width: "68px" }}
                  severity={option.status === "aprovado" ? "success" : "danger"}
                  value={option.status}
                ></Tag>
              ) : (
                <div>
                  <Button
                    icon="pi pi-times"
                    severity="danger"
                    className="mr-3"
                    style={{ height: "26px", width: "26px" }}
                  ></Button>
                  <Button
                    icon="pi pi-check"
                    severity="success"
                    style={{ height: "26px", width: "26px" }}
                  ></Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const solicitacoesAgendamentoTemplate = (data: any) => {
    return (
      <div className="flex w-full">
        <div className="mr-2">
          <Avatar
            shape="circle"
            label={obterIniciais(data.nome)}
            size="large"
          />
        </div>
        <div className="flex justify-content-between w-full">
          <div>
            <span className="text-lg">{data.nome}</span> <br />
            <span>{data.cargo}</span>
          </div>
          <div>
            <span>{moment(data.dataAgendamento).format("hh:mm")}</span>
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
            value={solicitacaoAgentamento}
            onChange={(e) => setSolicitacoesAgendamento(e.value)}
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
            itemTemplate={solicitacoesAgendamentoTemplate}
            emptyFilterMessage="Nenhum resultado encontrado!"
            listStyle={{ height: "450px" }}
            filter
            filterPlaceholder="Buscar por agendamento"
            value={solicitacaoAgentamentoDia}
            onChange={(e) => setSolicitacoesAgendamentoDia(e.value)}
            options={pacientes2}
            optionLabel="nome"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};
