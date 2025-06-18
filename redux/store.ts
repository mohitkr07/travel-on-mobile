import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { appSlice } from "./slices/appSlice";
import { authSlice } from "./slices/authSlice";
import { persistedSlice } from "./slices/persistedSlice";
import { profileSlice } from "./slices/profileSlice";
import { tripSurveySlice } from "./slices/tripSurveySlice";

const rootReducer = combineReducers({
  app: appSlice.reducer,
  tripSurvey: tripSurveySlice.reducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  persisted: persistedSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "persisted"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
