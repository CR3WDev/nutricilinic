import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../../Utils/sessionStorageKeys";

export const MainPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    navigate("/");
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
