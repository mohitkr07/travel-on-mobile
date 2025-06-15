import { createSlice } from "@reduxjs/toolkit";

type AppState = {
    bottomSheetContent?: BottomSheetContent | null;
    bottomSheetIndex: number;
    loginMethod: 'phone' | 'email';
}

type BottomSheetContent = 'otpVerify' | 'emailVerify' | 'profilePic' | 'tripSurvey';

const initialState: AppState = {
    bottomSheetContent: 'otpVerify',
    bottomSheetIndex: -1,
    loginMethod: 'email',
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setBottomSheetIndex: (state, action) => {
            state.bottomSheetIndex = action.payload;
        },
        setLoginMethod: (state, action) => {
            state.loginMethod = action.payload;
        },
        setBottomSheetContentType: (state, action) => {
            state.bottomSheetContent = action.payload;
            if (action.payload) {
                state.bottomSheetIndex = 0;
            } else {
                state.bottomSheetIndex = -1;
            }
        }
    },
})

export const { setBottomSheetIndex, setLoginMethod, setBottomSheetContentType } = appSlice.actions
export default appSlice.reducer