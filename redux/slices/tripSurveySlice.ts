import { CHIPS_OPTIONS } from "@/constants/helper";
import { ChipOption } from "@/types/constantsTypes";
import { createSlice } from "@reduxjs/toolkit";

export const CHIPS_SELECTORS = Object.keys(CHIPS_OPTIONS);

export type TripSurveyState = {
  activeChipSelector: string;
  selectedTripTypesKeys: string[];
  selectedCompanionsKeys: string[];
  selectedVibesKeys: string[];
};

const initialState: TripSurveyState = {
  activeChipSelector: CHIPS_SELECTORS[0],
  selectedTripTypesKeys: [],
  selectedCompanionsKeys: [],
  selectedVibesKeys: [],
};

export const tripSurveySlice = createSlice({
  name: "tripSurvey",
  initialState,
  reducers: {
    setActiveChipSelector: (state, action) => {
      state.activeChipSelector = action.payload;
    },
    setSurveyChips: (state, action) => {
      const { payload: key } = action;

      if (state.activeChipSelector === CHIPS_SELECTORS[0]) {
        if (state.selectedTripTypesKeys.includes(key)) {
          state.selectedTripTypesKeys = state.selectedTripTypesKeys.filter(
            (item) => item !== key
          );
        } else {
          state.selectedTripTypesKeys.push(key);
        }
      } else if (state.activeChipSelector === CHIPS_SELECTORS[1]) {
        if (state.selectedCompanionsKeys.includes(key)) {
          state.selectedCompanionsKeys = state.selectedCompanionsKeys.filter(
            (item) => item !== key
          );
        } else {
          state.selectedCompanionsKeys.push(key);
        }
      } else {
        if (state.selectedVibesKeys.includes(key)) {
          state.selectedVibesKeys = state.selectedVibesKeys.filter(
            (item) => item !== key
          );
        } else {
          state.selectedVibesKeys.push(key);
        }
      }
    },
  },
});
export const { setActiveChipSelector, setSurveyChips } =
  tripSurveySlice.actions;
export default tripSurveySlice.reducer;
