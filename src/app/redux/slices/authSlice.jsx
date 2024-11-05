// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
      }

      state.user = action.payload;
    },
    setSignOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;
export default authSlice.reducer;
