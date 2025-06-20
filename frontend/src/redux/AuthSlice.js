import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    RemoverUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, RemoverUser } = AuthSlice.actions;
export default AuthSlice.reducer;
