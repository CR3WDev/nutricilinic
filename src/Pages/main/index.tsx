import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../../Utils/sessionStorageKeys";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-content-end p-2"></div>
      <h1>mainPage</h1>
    </>
  );
};
