"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default localStorage for web
import authReducer from "./slices/authSlice";
import currencyReducer from "./slices/currencySlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  currency: currencyReducer,
});

// Persist configuration
const persistConfig = {
  key: "root", // Key for storage
  storage, // Define storage mechanism
};

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore non-serializable errors for redux-persist
    }),
});

// Create the persistor for persisting the store
export const persistor = persistStore(store);
