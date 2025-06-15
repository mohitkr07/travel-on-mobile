import { createSlice } from "@reduxjs/toolkit";

type AppState = {
  bottomSheetContent?: BottomSheetContent | null;
  bottomSheetIndex: number;
  loginMethod: "phone" | "email";
  errorMsg?: string;
  chipVisible?: boolean;
};

type BottomSheetContent =
  | "otpVerify"
  | "emailVerify"
  | "profilePic"
  | "tripSurvey";

const initialState: AppState = {
  bottomSheetContent: "otpVerify",
  bottomSheetIndex: -1,
  loginMethod: "email",
  errorMsg: "",
  chipVisible: false,
};

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
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
       state.chipVisible = true;
    },
    setErrorMsgChipVisible: (state, action) => {
      state.chipVisible = action.payload;
      if (!action.payload) {
        state.errorMsg = "";
      }
    }
  },
});

export const {
  setBottomSheetIndex,
  setLoginMethod,
  setBottomSheetContentType,
  setErrorMsg,
    setErrorMsgChipVisible
} = appSlice.actions;
export default appSlice.reducer;
