"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import currencyReducer from "./slices/currencySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    currency: currencyReducer,
  },
});
