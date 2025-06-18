import { BASE_URL } from "@/constants/constants";
import { getAccessToken, getRefreshToken, saveTokens } from "@/utils/tokenStorage";
import axios from "axios";

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

const refreshAccessToken = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    const res = await API.post("/auth/refresh-access-token", { refreshToken });
    await saveTokens(res.data.accessToken, refreshToken);
    console.log("Access token refreshed successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
