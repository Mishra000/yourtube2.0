import axios from "axios";

export const getBackendUrl = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  return url.replace(/\/+$/, "");
};

export const getVideoUrl = (filepath) => {
  if (!filepath) return "";
  const pathStr = String(filepath).trim();
  if (pathStr.startsWith("http://") || pathStr.startsWith("https://")) {
    return pathStr;
  }
  const cleanPath = pathStr.replace(/\\/g, "/").replace(/^\/+/, "");
  return `${getBackendUrl()}/${cleanPath}`;
};

const axiosInstance = axios.create({
  baseURL: getBackendUrl(),
});

export default axiosInstance;