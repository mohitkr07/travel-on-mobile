import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios";

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

export const refreshTokens = async (refreshToken: string) => {
  try {
    const res = await API.post("/auth/refresh-tokens", { refreshToken });
    return res.data;
  } catch (error) {
    console.error("Error refreshing tokens:", error);
    throw error;
  }
};
