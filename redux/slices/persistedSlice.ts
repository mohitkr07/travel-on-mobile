import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    isAuthenticated: boolean;
    isOnboardingComplete: boolean;
} = {
  isAuthenticated: false,
  isOnboardingComplete: false,
};

export const persistedSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsOnboardingComplete: (state, action) => {
      state.isOnboardingComplete = action.payload;
    },
    clearPersistedState: (state) => {
      state.isAuthenticated = false;
      state.isOnboardingComplete = false;
    },
  },
});

export const {
  // setIsAuthenticated,
  // setIsOnboardingComplete,
  // clearPersistedState,
} = persistedSlice.actions;
export default persistedSlice.reducer;
