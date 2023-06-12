import { useEffect, useState } from "react";
import { SidebarComponent } from "../../Components/Layout/Sidebar";
import { Topbar } from "../../Components/Layout/Topbar";
import { InternalRoutes } from "../../Routes/InternalRoutes";
import { ACCESS_TOKEN_KEY } from "../../Utils/sessionStorageKeys";
import { useNavigate } from "react-router-dom";

export const MenuPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      navigate("/");
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex">
      <SidebarComponent />
      <div className="flex-col">
        <Topbar />
        <div
          className="mx-4"
          style={{
            width: "calc(100vw - 278px)",
            height: "calc(100vh - 47.2px - 2rem)",
          }}
        >
          <InternalRoutes />
        </div>
      </div>
    </div>
  );
};
