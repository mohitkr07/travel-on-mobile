import { BASE_URL } from "@/constants/constants";
import { getAccessToken } from "@/utils/tokenStorage";
import axios from "axios";
import { refreshAccessToken } from "./auth";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();

        const newAccessToken = await getAccessToken();

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return API.request(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default API;
