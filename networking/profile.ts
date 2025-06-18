import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios";

export const getProfileAsync = createAsyncThunk("auth/getProfile", async () => {
  try {
    const res = await API.get("/profile");
    if (res.status !== 200) {
      throw new Error("Failed to fetch profile");
    }
    return res.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
});

export const onboardProfileAsync = createAsyncThunk(
  "auth/onboardProfile",
  async (profileData: { name: string; dob: string; gender: string }) => {
    try {
      const res = await API.post("/profile/onboard", profileData);
      return res.data;
    } catch (error) {
      console.error("Error onboarding profile:", error);
      throw error;
    }
  }
);
