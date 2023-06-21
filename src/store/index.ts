import { configureStore } from "@reduxjs/toolkit";
import { DonationsSlice } from "./donations.slice";

export const store = configureStore({
  reducer: {
    [DonationsSlice.name]:DonationsSlice.reducer
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
