import { API_STATUS } from "@/constants/constants";
import {
  refreshAccessTokenAsync,
  requestOtpViaEmail,
  requestOtpViaPhone,
  verifyOtpViaEmail,
  verifyOtpViaPhone,
} from "@/networking/auth";
import { AuthState } from "@/types/constantsTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  mobile: "",
  email: "",
  requestOtpLoading: API_STATUS.IDLE,
  verifyOtpLoading: API_STATUS.IDLE,
  refreshTokenLoading: API_STATUS.IDLE,
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
      }>
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestOtpViaEmail.pending, (state) => {
        state.requestOtpLoading = API_STATUS.LOADING;
      })
      .addCase(requestOtpViaEmail.fulfilled, (state, action) => {
        state.requestOtpLoading = API_STATUS.SUCCESS;
      })
      .addCase(requestOtpViaEmail.rejected, (state, action) => {
        state.requestOtpLoading = API_STATUS.ERROR;
      })

      .addCase(verifyOtpViaEmail.pending, (state) => {
        state.verifyOtpLoading = API_STATUS.LOADING;
      })
      .addCase(verifyOtpViaEmail.fulfilled, (state, action) => {
        state.verifyOtpLoading = API_STATUS.SUCCESS;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtpViaEmail.rejected, (state, action) => {
        state.verifyOtpLoading = API_STATUS.ERROR;
      })

      .addCase(requestOtpViaPhone.pending, (state) => {
        state.requestOtpLoading = API_STATUS.LOADING;
      })
      .addCase(requestOtpViaPhone.fulfilled, (state, action) => {
        state.requestOtpLoading = API_STATUS.SUCCESS;
        console.log(action.payload);
      })
      .addCase(requestOtpViaPhone.rejected, (state, action) => {
        state.requestOtpLoading = API_STATUS.ERROR;
      })

      .addCase(verifyOtpViaPhone.pending, (state) => {
        state.verifyOtpLoading = API_STATUS.LOADING;
      })
      .addCase(verifyOtpViaPhone.fulfilled, (state, action) => {
        state.verifyOtpLoading = API_STATUS.SUCCESS;
        state.isAuthenticated = true;
      })
      .addCase(verifyOtpViaPhone.rejected, (state, action) => {
        state.verifyOtpLoading = API_STATUS.ERROR;
      })

      .addCase(refreshAccessTokenAsync.pending, (state) => {
        state.verifyOtpLoading = API_STATUS.LOADING;
      })
      .addCase(refreshAccessTokenAsync.fulfilled, (state, action) => {
        state.refreshTokenLoading = API_STATUS.SUCCESS;
      })
      .addCase(refreshAccessTokenAsync.rejected, (state, action) => {
        state.refreshTokenLoading = API_STATUS.ERROR;
      })
  },
});

export const { setEmail, setMobile, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
