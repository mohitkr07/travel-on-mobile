import { requestOtpViaEmail, verifyOtpViaEmail } from "@/networking/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

type AUTH_STATE = (typeof API_STATUS)[keyof typeof API_STATUS];

type AuthState = {
  isAuthenticated: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  user?: {
    id: string;
    email: string;
    phone?: string;
    name?: string;
    profilePic?: string;
  } | null;
  requestOtpLoading?: AUTH_STATE;
  verifyOtpLoading?: AUTH_STATE;
};

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  requestOtpLoading: API_STATUS.IDLE,
  verifyOtpLoading: API_STATUS.IDLE,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: AuthState["user"];
      }>
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtpViaEmail.pending, (state) => {
        state.requestOtpLoading = API_STATUS.LOADING;
      })
      .addCase(requestOtpViaEmail.fulfilled, (state, action) => {
        state.requestOtpLoading = API_STATUS.SUCCESS;
        console.log(action.payload);
      })
      .addCase(requestOtpViaEmail.rejected, (state, action) => {
        state.requestOtpLoading = API_STATUS.ERROR;
      })
      .addCase(verifyOtpViaEmail.pending, (state) => {
        state.verifyOtpLoading = API_STATUS.LOADING;
      })
      .addCase(verifyOtpViaEmail.fulfilled, (state, action) => {
        state.verifyOtpLoading = API_STATUS.SUCCESS;
        console.log(action.payload);
      })
      .addCase(verifyOtpViaEmail.rejected, (state, action) => {
        state.verifyOtpLoading = API_STATUS.ERROR;
      });
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
