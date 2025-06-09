import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userState: localStorage.getItem("userState")
    ? JSON.parse(localStorage.getItem("userState"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userState = action.payload;
      localStorage.setItem("userState", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userState = null;
      localStorage.clear();
    },

    updatePoints: (state, action) => {
      if (state.userState?.user) {
        state.userState.user.points = action.payload;
        localStorage.setItem("userState", JSON.stringify(state.userState));
      }
    },
  },
});

export const { setCredentials, logout ,updatePoints } = authSlice.actions;

export default authSlice.reducer;
