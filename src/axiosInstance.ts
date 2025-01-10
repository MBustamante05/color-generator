import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/proxy",
  headers: { "Content-Type": "application/json" },
});