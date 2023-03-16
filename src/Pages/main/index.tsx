import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const loginResponse = sessionStorage.getItem("LoginResponseDTO");
    navigate("/");
    console.log(loginResponse);
  };
  return (
    <>
      <div className="flex justify-content-end p-2">
        <Button icon="pi pi-power-off" rounded onClick={() => handleLogout()} />
      </div>
      <h1>mainPage</h1>
    </>
  );
};
