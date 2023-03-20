import Logo from "../../../assets/Logo.svg";
import { ListBox } from "primereact/listbox";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./style.css";

export const SidebarComponent = () => {
  const navigate = useNavigate();
  const [menuOptionSelected, setMenuOptionSelected] = useState(null);
  const menuOptions = [
    { name: "Inicio", code: "inicio", icon: "pi pi-home", route: "/main" },
    {
      name: "Agendamento",
      code: "agendamento",
      icon: "pi pi-calendar",
      route: "/agendamentos",
    },
    {
      name: "Meus Pacientes",
      code: "pacientes",
      icon: "pi pi-users",
      route: "/pacientes",
    },
  ];
  const listBoxTemplate = (option: any) => {
    return (
      <Button
        className="p-button-text flex w-12"
        onClick={() => navigate(option.route)}
      >
        <i className={`${option.icon} mr-3`}></i>
        <span className="text-lg font-normal">{option.name}</span>
      </Button>
    );
  };
  return (
    <aside
      className="h-screen"
      style={{ width: "230px", borderRight: "1px solid var(--surface-border)" }}
    >
      <div className="flex justify-content-center py-6">
        <img src={Logo} />
      </div>
      <ListBox
        className="edited"
        itemTemplate={listBoxTemplate}
        style={{ border: "none" }}
        value={menuOptionSelected}
        onChange={(e) => setMenuOptionSelected(e.value)}
        options={menuOptions}
        optionLabel="name"
      ></ListBox>
    </aside>
  );
};
