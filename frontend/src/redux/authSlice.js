import { createSlice } from "@reduxjs/toolkit";

let storedUser = null;
let storedToken = null;

if (typeof localStorage !== "undefined") {
  try {
    const userStr = localStorage.getItem("user");
    storedUser = userStr ? JSON.parse(userStr) : null;
  } catch {
    storedUser = null;
  }

  storedToken = localStorage.getItem("token") || null;
}

const initialState = {
  user: storedUser,
  token: storedToken,
  isLoggedIn: storedUser && storedToken ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { user } = action.payload;
      console.log("user", user);
      state.user = user;
    //   state.token = token;
      state.isLoggedIn = true;

      localStorage.setItem("user", JSON.stringify(user));
    //   localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
