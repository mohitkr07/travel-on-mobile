import { API_STATUS } from "@/constants/constants";
import { getProfileAsync, onboardProfileAsync } from "@/networking/profile";
import { profileState } from "@/types/constantsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: profileState = {
  user: null,
  onboardingDetails: {
    name: "",
    dob: "",
    gender: "",
  },
  profileLoading: API_STATUS.IDLE,
  onboardLoading: API_STATUS.IDLE,
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
    setOnboardingDetails: (state, action: PayloadAction<{ firstName: string; lastName: string; dob: string; gender: string}>) => {
      const { firstName, lastName, dob, gender} = action.payload;

      state.onboardingDetails.name = `${firstName} ${lastName}`;
      state.onboardingDetails.dob = dob;
      state.onboardingDetails.gender = gender;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAsync.pending, (state) => {
        state.profileLoading = API_STATUS.LOADING;
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.profileLoading = API_STATUS.SUCCESS;
      })
      .addCase(getProfileAsync.rejected, (state, action) => {
        state.profileLoading = API_STATUS.IDLE;
      })

      .addCase(onboardProfileAsync.pending, (state) => {
        state.onboardLoading = API_STATUS.LOADING;
      })
      .addCase(onboardProfileAsync.fulfilled, (state, action) => {
        state.onboardLoading = API_STATUS.SUCCESS;
      })
      .addCase(onboardProfileAsync.rejected, (state, action) => {
        state.onboardLoading = API_STATUS.ERROR;
      })
  },
});

export const { setUser, clearUser, setOnboardingDetails } = profileSlice.actions;
export default profileSlice.reducer;
