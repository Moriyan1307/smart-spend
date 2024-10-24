// redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userRole: null, // 'student', 'professor', or 'admin'
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignIn: (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload; // the role (e.g., 'student')
    },
    setSignOut: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
    },
  },
});

export const { setSignIn, setSignOut } = authSlice.actions;
export default authSlice.reducer;
