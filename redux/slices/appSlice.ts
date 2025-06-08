import { createSlice } from "@reduxjs/toolkit";

type AppState = {
    bottomSheetContent?: React.ReactNode | null;
    bottomSheetIndex: number;
    loginMethod: 'phone' | 'email';
}

const initialState: AppState = {
    bottomSheetContent: null,
    bottomSheetIndex: -1,
    loginMethod: 'phone',
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
        }
    },
})

export const { setBottomSheetIndex, setLoginMethod } = appSlice.actions
export default appSlice.reducer