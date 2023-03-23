import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { useDispatch } from "react-redux";
import { setMode } from "../../../Redux/mode";

const UsuarioForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const validarCPF = (value: string) => {
    let cpf = value.replace(/[^\d]+/g, "");
    if (cpf === "") return true;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length !== 11 ||
      cpf === "00000000000" ||
      cpf === "11111111111" ||
      cpf === "22222222222" ||
      cpf === "33333333333" ||
      cpf === "44444444444" ||
      cpf === "55555555555" ||
      cpf === "66666666666" ||
      cpf === "77777777777" ||
      cpf === "88888888888" ||
      cpf === "99999999999"
    )
      return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-field mb-3">
        <div>
          <label htmlFor="nome">Nome:</label>
        </div>
        <InputText id="nome" {...register("nome", { required: true })} />
        {errors.nome && <Message severity="error" text="Campo obrigatório" />}
      </div>
      <div className="p-field mb-3">
        <div>
          <label htmlFor="cpf">CPF:</label>
        </div>
        <InputText
          id="cpf"
          {...register("cpf", { required: true, validate: validarCPF })}
        />
        {errors.cpf?.type === "required" && (
          <Message severity="error" text="Campo obrigatório" />
        )}
        {errors.cpf?.type === "validate" && (
          <Message severity="error" text="CPF inválido" />
        )}
      </div>
      <div className="p-field mt-2">
        <div>
          <label htmlFor="senha">Senha:</label>
        </div>
        <Password id="senha" {...register("senha", { required: true })} />
        {errors.senha && <Message severity="error" text="Campo obrigatório" />}
      </div>
      <div className="flex justify-content-end">
        <div className="mr-2">
          <Button
            type="button"
            label="Voltar"
            onClick={() => dispatch(setMode("search"))}
          />
        </div>
        <div>
          <Button type="submit" label="Enviar" />
        </div>
      </div>
    </form>
  );
};

export default UsuarioForm;
