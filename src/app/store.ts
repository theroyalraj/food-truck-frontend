import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./features/locationSlice";
import searchSlice from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    search: searchSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
