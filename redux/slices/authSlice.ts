import { API_STATUS } from "@/constants/constants";
import { requestOtpViaEmail, verifyOtpViaEmail } from "@/networking/auth";
import { AuthState } from "@/types/constantsTypes";
import { saveTokens } from "@/utils/tokenStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  mobile: "",
  email: "",
  requestOtpLoading: API_STATUS.IDLE,
  verifyOtpLoading: API_STATUS.IDLE,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMobile: (state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
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
        const { accessToken, refreshToken } = action.payload;
        saveTokens(accessToken, refreshToken);
        state.isAuthenticated = true;
      })
      .addCase(verifyOtpViaEmail.rejected, (state, action) => {
        state.verifyOtpLoading = API_STATUS.ERROR;
      });
  },
});

export const { setEmail, setMobile, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
