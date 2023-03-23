import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { setMode, useMode } from "../../Redux/mode";
import { useEffect } from "react";
import UsuarioForm from "./UsuarioForm";

export const UsuariosPage = () => {
  const dispatch = useDispatch();
  const mode = useSelector(useMode);
  const products = [
    {
      id: 1,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 2,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 1,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 2,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 1,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 2,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 1,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 2,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 1,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 2,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 1,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 2,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 1,
      nome: "marcelo victor",
      cpf: "cpf",
    },
    {
      id: 2,
      nome: "marcelo victor",
      cpf: "cpf",
    },
  ];
  const handleEdit = () => {
    dispatch(setMode("edit"));
  };
  const handleAdd = () => {
    dispatch(setMode("add"));
  };
  const handleDelete = () => {
    dispatch(setMode("delete"));
  };
  const actionsColumns = (rowSelected: any) => {
    return (
      <div style={{ display: "flex", width: "70px" }}>
        <Button
          icon="pi pi-pencil"
          style={{ height: "20px" }}
          className=" p-button-text mr-2"
          onClick={() => handleEdit()}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-text p-button-danger"
          style={{ height: "20px" }}
          onClick={() => handleDelete()}
        />
      </div>
    );
  };
  useEffect(() => {
    console.log(mode);
  }, [mode]);
  useEffect(() => {
    dispatch(setMode("search"));
  }, []);
  return (
    <>
      {mode === "edit" || mode === "add" ? <UsuarioForm /> : null}
      {mode === "search" || mode === "delete" ? (
        <>
          <h1 className="mb-4">Tabela de Usuários</h1>
          <Toolbar
            className="mb-4"
            start={
              <>
                <Button
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  <i className="pi pi-plus mr-2"></i>
                  Cadastrar
                </Button>
              </>
            }
          />
          <DataTable
            responsiveLayout="scroll"
            value={products}
            scrollable
            scrollHeight="400px"
          >
            <Column field="id" header="ID"></Column>
            <Column field="nome" header="Nome"></Column>
            <Column field="cpf" header="CPF"></Column>
            <Column body={actionsColumns} header={"ações"} className="py-2" />
          </DataTable>
        </>
      ) : null}
    </>
  );
};
