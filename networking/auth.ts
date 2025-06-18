import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios";
import { getRefreshToken, saveTokens } from "@/utils/tokenStorage";

export const requestOtpViaPhone = createAsyncThunk(
  "auth/requestOtpPhone",
  async (phone: string) => {
    try {
      const res = await API.post("/auth/request-otp", { phone });
      return res.data;
    } catch (error) {
      console.error("Error requesting OTP:", error);
      throw error;
    }
  }
);
export const requestOtpViaEmail = createAsyncThunk(
  "auth/requestOtpEmail",
  async (email: string) => {
    try {
      const res = await API.post("/auth/request-otp", { email });
      return res.data;
    } catch (error) {
      console.error("Error requesting OTP:", error);
      throw error;
    }
  }
);

export const verifyOtpViaPhone = createAsyncThunk(
  "auth/verifyOtpPhone",
  async ({ phone, otp }: { phone: string; otp: string }) => {
    try {
      const res = await API.post("/auth/verify-otp", { phone, otp });
      return res.data;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }
);

export const verifyOtpViaEmail = createAsyncThunk(
  "auth/verifyOtpEmail",
  async ({ email, otp }: { email: string; otp: string }) => {
    try {
      const res = await API.post("/auth/verify-otp", { email, otp });
      return res.data;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }
);

export const refreshAccessToken = async () => {
  try {
      const refreshToken = await getRefreshToken();
      if(!refreshToken) {
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
    }

export const refreshAccessTokenAsync = createAsyncThunk(
  "auth/refreshAccessToken",
  async () => {
    refreshAccessToken()
  }
);

// export const refreshTokens = createAsyncThunk(
//   "auth/refreshTokens",
//   async () => {
//     try {
//       const refreshToken = await getRefreshToken();
//       if(!refreshToken) {
//         throw new Error("No refresh token available");
//       }
//       const res = await API.post("/auth/refresh-tokens", { refreshToken });
//       await saveTokens(res.data.accessToken, res.data.refreshToken);
//       return res.data;
//     } catch (error) {
//       console.error("Error refreshing tokens:", error);
//       throw error;
//     }
//   }
// );

