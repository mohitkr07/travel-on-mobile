import { API_STATUS } from "@/constants/constants";
import { getProfile } from "@/networking/profile";
import { profileState } from "@/types/constantsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: profileState = {
  user: null,
  onboardingDetails: {
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
  },
  profileLoading: API_STATUS.IDLE,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setOnboardingDetails: (state, action: PayloadAction<profileState["onboardingDetails"]>) => {
      state.onboardingDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.profileLoading = API_STATUS.LOADING;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profileLoading = API_STATUS.SUCCESS;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.profileLoading = API_STATUS.IDLE;
      });
  },
});

export const { setUser, clearUser, setOnboardingDetails } = profileSlice.actions;
export default profileSlice.reducer;
