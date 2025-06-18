import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./axios";
import { setUser } from "@/redux/slices/profileSlice";
import { store } from "@/redux/store";

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async () => {
    try {
      const res = await API.get("/profile");
      if (res.status !== 200) {
        throw new Error("Failed to fetch profile");
      }
    //   console.log("Profile fetched successfully:", res.data);
    //   store.dispatch(setUser(res.data.user));
      return res.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  })