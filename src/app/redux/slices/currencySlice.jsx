// redux/slices/currencySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "", // Default currency state
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
