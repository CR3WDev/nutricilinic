import { Button } from "primereact/button";
import { MainContent } from "./mainContent";

export const MainPage = () => {
  return (
    <>
      <div className="flex">
        <div>
          <h2>Bem vindo,Dr(a) Marcelo Victor</h2>
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
