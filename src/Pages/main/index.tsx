import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-content-end p-2"></div>
      <h1>mainPage</h1>
    </>
  );
};
