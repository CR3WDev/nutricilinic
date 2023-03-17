import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "primereact/badge";

export const Topbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const loginResponse = sessionStorage.getItem("LoginResponseDTO");
    navigate("/");
    console.log(loginResponse);
  };
  return (
    <div className="flex m-2 " style={{ width: "calc(100vw - 250px)" }}>
      <span className="p-input-icon-left w-full">
        <i className="pi pi-search" />
        <InputText
          placeholder="Buscar Agendamentos pacientes ou etc..."
          className="w-full"
        />
      </span>
      <div
        className="border-solid border-1 p-1 ml-2"
        style={{
          borderColor: "#ced4da",
          borderRadius: "6px",
          maxHeight: "47.2px",
        }}
      >
        <div className="flex card">
          <Button
            icon="pi pi-question"
            style={{ width: "36px", height: "36px" }}
            className="p-button-text"
            rounded
          />

          <i className="pi pi-bell p-overlay-badge">
            <Badge value="2"></Badge>
          </i>
          <Avatar
            label="P"
            style={{ width: "36px", height: "36px" }}
            shape="circle"
          />
          <Button
            icon="pi pi-power-off"
            style={{ width: "36px", height: "36px" }}
            rounded
            onClick={() => handleLogout()}
          />
        </div>
      </div>
    </div>
  );
};
