import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './slices/appSlice';
import { tripSurveySlice } from './slices/tripSurveySlice';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        tripSurvey: tripSurveySlice.reducer,
        auth: authSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;