import { Card } from "primereact/card";
import Logo from "../../Assets/Logo.svg";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/main");
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <Card>
        <div className="flex justify-center pb-10">
          <img src={Logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-col">
            <InputText
              placeholder="Usuário"
              autoComplete="off"
              {...(register("username"), { required: true })}
            />
            {errors.username && <span>Esse campo é obrigatório</span>}
          </div>
          <div className="flex-col">
            <Password
              className="pt-3"
              placeholder="Senha"
              autoComplete="off"
              {...register("password", { required: true })}
            />
            {errors.password && <span>Esse campo é obrigatório2</span>}
          </div>
          <div className="flex justify-center py-5">
            <Button label="ENTRAR" />
          </div>
          <span className="flex justify-center font-bold">
            Esqueci minha senha!
          </span>
        </form>
      </Card>
    </div>
  );
};
