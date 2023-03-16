import axios from "axios";

export const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;
export const GLOBAL_TIMEOUT = import.meta.env.VITE_GLOBAL_TIMEOUT;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: parseInt(GLOBAL_TIMEOUT),
});
