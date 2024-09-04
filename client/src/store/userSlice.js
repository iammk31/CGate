import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: {}
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserData: (state, action) => {
            state.userData = action.payload
        }
    }
})

export const { getUserData } = userSlice.actions;
export default userSlice.reducer
