import { createSlice } from "@reduxjs/toolkit"

type AppState = {
    bottomSheetOpen: boolean;
    bottomSheetContent?: React.ReactNode | null;
    test: any;
    bottomSheetIndex: number;
}

const initialState: AppState = {
    bottomSheetOpen: false,
    bottomSheetContent: null,
    test: "test",
    bottomSheetIndex: -1,
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        openBottomSheet: (state) => {
            state.bottomSheetOpen = true;
            // state.bottomSheetContent = action.payload?.content || null;
        },
        closeBottomSheet: (state) => {
            state.bottomSheetOpen = false;
            // state.bottomSheetContent = null;
        },
        setTest: (state, action) => {
            state.test = action.payload;
        },
        setBottomSheetIndex: (state, action) => {
            // This action can be used to set the index of the bottom sheet if needed
            state.bottomSheetIndex = action.payload;
        }

    },
})

export const { openBottomSheet, closeBottomSheet, setTest, setBottomSheetIndex } = appSlice.actions
export default appSlice.reducer