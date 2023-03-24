import { useEffect, useState } from "react";
import { ExternalRoutes } from "./Routes/ExternalRoutes";
import { api } from "./Services/axios";
import { ACCESS_TOKEN_KEY } from "./Utils/sessionStorageKeys";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    api.defaults.headers["Authorization"] = "Bearer " + token;
    setIsLoading(false);
  }, []);

  return <>{!isLoading && <ExternalRoutes />}</>;
}

export default App;
