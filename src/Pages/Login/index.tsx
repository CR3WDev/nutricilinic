import { Card } from "primereact/card";
import Logo from "../../Assets/Logo.svg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputMask } from "primereact/inputmask";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    sessionStorage.setItem("LoginResponseDTO", JSON.stringify(data));
    console.log({ data });
    navigate("/main");
  };
  return (
    <div className="h-screen flex justify-content-center align-items-center">
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
              {...register("cpf", {
                required: true,
                minLength: 11,
              })}
            />
            <div>
              {errors.cpf && (
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
              {...register("password", { required: true })}
            />
            {errors.password && (
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
            />
          </div>
        </form>
      </Card>
    </div>
  );
};
