import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import Logo from "../../assets/Logo.svg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputMask } from "primereact/inputmask";
import { api } from "../../services/axios";
import { useRef } from "react";

interface FormLogin {
  login: string;
  senha: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const toast = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLogin>();

  const onSubmit = async ({ login, senha }: FormLogin) => {

    try {
      const { data } = await api.post("/auth", {
        login: login.replace(/[^0-9]/g, ""),
        senha
      });
      sessionStorage.setItem("X-Access-Token", JSON.stringify(data.token));
      navigate("/main");
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Atenção', detail: 'Usuário ou senha inválidos' });
    }
  };

  return (
    <div className="h-screen flex justify-content-center align-items-center">

      <Toast ref={toast} />

      <Card style={{ width: "300px", maxWidth: "80vw" }}>
        <div className="flex justify-content-center pb-4">
          <img src={Logo} alt="" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-col">
            <InputMask
              className="mb-2 w-12"
              type="cpf"
              id="cpf"
              placeholder="CPF"
              mask="999.999.999-99"
              maxLength={11}
              {...register("login", {
                required: true,
                minLength: 11,
              })}
            />
            <div>
              {errors.login && (
                <span className="p-error">Campo obrigatório!</span>
              )}
            </div>
          </div>
          <div>
            <InputText
              type="password"
              className="mb-2 w-12"
              placeholder="Senha"
              id="password"
              {...register("senha", { required: true })}
            />
            {errors.senha && (
              <div>
                <span className="p-error">Campo obrigatório</span>
              </div>
            )}
          </div>
          <div className="flex justify-content-center">
            <Button
              label="Entrar"
              type="submit"
              className="my-4"
              severity="success"
              rounded
              loading={isSubmitting}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};
