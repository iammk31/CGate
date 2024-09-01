import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user"))
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;