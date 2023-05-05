import { Button } from "primereact/button";
import { MainContent } from "./MainContent";
import { useEffect, useState } from "react";
import { NOME_USUARIO_KEY } from "../../Utils/sessionStorageKeys";

export const MainPage = () => {

  const [nomeUsuario, setNomeUsuario] = useState("");

  useEffect(() => {
    const nomeUsuario = sessionStorage.getItem(NOME_USUARIO_KEY) ?? "";
    setNomeUsuario(nomeUsuario);
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <h2>Bem vindo, Dr(a) {nomeUsuario}</h2>
          <span className="font-bold opacity-50">
            Tenha um bom dia no seu trabalho
          </span>
        </div>
        <div className="ml-3">
          <Button severity="warning">Visualizar pendências</Button>
        </div>
      </div>
      <MainContent />
    </>
  );
};
