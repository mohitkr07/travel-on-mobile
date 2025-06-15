import { createAsyncThunk } from '@reduxjs/toolkit';
import API from './axios';

// export const requestOtp1 = async (emailOrPhone: string) => {
//     const res = await API.post("/auth/request-otp", {emailOrPhone});
//     return res.data;
// }

export const requestOtpViaPhone = createAsyncThunk('auth/requestOtpPhone', async (phone: string) => {
    const res = await API.post("/auth/request-otp", { phone });
    console.log("OTP request response:", res.data);
    return res.data;
});
export const requestOtpViaEmail = createAsyncThunk('auth/requestOtpEmail', async (email: string) => {
    const res = await API.post("/auth/request-otp", { email });
    console.log("OTP request response:", res.data);
    return res.data;
});

export const verifyOtpViaPhone = createAsyncThunk('auth/verifyOtpPhone', async ({phone, otp} : {phone: string, otp: string}) => {
    const res = await API.post("/auth/verify-otp", { phone });
    console.log("OTP request response:", res.data);
    return res.data;
});

export const verifyOtpViaEmail = createAsyncThunk('auth/verifyOtpEmail', async ({email, otp}: {email: string, otp: string}) => {
    const res = await API.post("/auth/verify-otp", { email, otp });
    console.log("OTP request response:", res.data);
    return res.data;
});

// export const verifyOtp = async (emailOrPhone: string, otp: string) => {
//     const res = await API.post("/auth/verify-otp", {emailOrPhone, otp});
//     return res.data;
// }

export const refreshTokens = async (refreshToken: string) => {
    const res = await API.post("/auth/refresh-tokens", {refreshToken});
    return res.data;
}