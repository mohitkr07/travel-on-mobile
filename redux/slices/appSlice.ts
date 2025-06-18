import { TAppSliceState } from "@/types/constantsTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TAppSliceState = {
  bottomSheetContent: "otpVerify",
  bottomSheetIndex: -1,
  loginMethod: "phone",
  errorMsg: "",
  chipVisible: false,
  globalLoaderOn: false,
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
    setChipMsg: (state, action) => {
      state.errorMsg = action.payload;
       state.chipVisible = true;
    },
    setErrorMsgChipVisible: (state, action) => {
      state.chipVisible = action.payload;
      if (!action.payload) {
        state.errorMsg = "";
      }
    },
    setGlobalLoaderOn: (state, action) => {
      state.globalLoaderOn = action.payload;
    },
  },
});

export const {
  setBottomSheetIndex,
  setLoginMethod,
  setBottomSheetContentType,
  setChipMsg,
    setErrorMsgChipVisible,
    setGlobalLoaderOn
} = appSlice.actions;
export default appSlice.reducer;
