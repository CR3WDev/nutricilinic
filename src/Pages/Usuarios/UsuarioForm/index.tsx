import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { useDispatch } from "react-redux";
import { setMode } from "../../../Redux/mode";
import { api } from "../../../Services/axios";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { InputMask } from "primereact/inputmask";

interface FormData {
  nome: string;
  cpf: string;
  senha: string;
}

interface UsuarioFormProps {
  id?: number;
  nome?: string;
  cpf?: string;
};

const UsuarioForm = ({ id, nome, cpf }: UsuarioFormProps) => {

  console.log(cpf)

  const toast = useRef<any>();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors,

    },
    reset,

  } = useForm<FormData>({
    defaultValues: {
      nome,
      cpf,
      senha: ""
    }
  });

  async function cadastrarUsuario({ cpf, nome, senha }: FormData) {
    try {
      await api.post("/usuarios", {
        cpf: cpf.replace(/[^0-9]/g, ""),
        nome,
        senha
      });

      toast.current?.show({
        severity: 'success',
        summary: 'Atenção',
        detail: "Usuário cadastrado com sucesso"
      });

      reset();

    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Atenção',
        detail: "Falha ao cadastrar usuário. Tente novamente em instantes"
      });
    }
  }

  async function alterarUsuario({ nome, senha }: FormData) {
    try {
      await api.put(`/usuarios/${id}`, {
        cpf: cpf?.replace(/[^0-9]/g, ""),
        nome,
        senha
      });

      toast.current?.show({
        severity: 'success',
        summary: 'Atenção',
        detail: "Usuário alterado com sucesso"
      });

    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Atenção',
        detail: "Falha ao alterar usuário. Tente novamente em instantes"
      });
    }
  }

  const onSubmit = async (data: FormData) => {
    if (id) {
      alterarUsuario(data);

    } else {
      cadastrarUsuario(data);
    }
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
      <Toast ref={toast} />
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
          className="mb-2 w-12"
          id="cpf"
          placeholder="CPF"
          maxLength={11}
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

        <InputText id="senha" {...register("senha", { required: true })} />
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
          <Button type="submit" label="Salvar" />
        </div>
      </div>
    </form>
  );
};

export default UsuarioForm;
