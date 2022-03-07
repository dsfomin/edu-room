import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null,
    authorities: [],
    isAuth: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signin(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.authorities = action.payload.authorities;
            state.isAuth = true;
        },
        signout(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.authorities = [];
            state.isAuth = false;
        }
    }
})

export const {signin, signout} = userSlice.actions;

export default userSlice.reducer;