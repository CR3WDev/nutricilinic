import { SidebarComponent } from "../../Components/Layout/Sidebar";
import { Topbar } from "../../Components/Layout/Topbar";
import { ExternalRoutes } from "../../Routes/ExternalRoutes";

export const MenuPage = () => {
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
          <ExternalRoutes />
        </div>
      </div>
    </div>
  );
};
