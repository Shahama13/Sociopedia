import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

        LoginRequest: (state) => {
            state.loading = true;
        },
        LoginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true
        },
        LoginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
            state.isAuthenticated = false
        },

        RegisterRequest: (state) => {
            state.loading = true;
        },
        RegisterSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true
        },
        RegisterFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
            state.isAuthenticated = false
        },

        LoadUserRequest: (state) => {
            state.loading = true;
        },
        LoadUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true
        },
        LoadUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
            state.isAuthenticated = false
        },

        LogOutUserRequest: (state) => {
            state.loading = true;
        },
        LogOutUserSuccess: (state) => {
            state.loading = false;
            state.user = null
            state.isAuthenticated = false
        },
        LogOutUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
            state.isAuthenticated = true
        },


        clearErrors: (state) => { state.error = null }
    }
})

export const { LoginRequest,
    LoginSuccess,
    LoginFailure,
    RegisterRequest,
    RegisterSuccess,
    RegisterFailure, 
    LoadUserRequest,
     LoadUserSuccess,
      LoadUserFailure,
      LogOutUserRequest,
      LogOutUserSuccess,
      clearErrors,
      LogOutUserFailure
     } = userSlice.actions;
export default userSlice.reducer;