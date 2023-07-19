import { createSlice } from "@reduxjs/toolkit";
const initialState = {}

export const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {

        allUsersRequest: (state) => {
            state.loading = true;
        },
        allUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload.users;
        },
        allUsersFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
        clearErrors: (state) => { state.error = null }
    }
})

export const userProfileSlice = createSlice({
    name: "userProfile",
    initialState,
    reducers: {

        userProfileRequest: (state) => {
            state.loading = true;
        },
        userProfileSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
        },
        userProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
        clearError: (state) => { state.error = null }
    }
})

export const { allUsersRequest, allUsersSuccess, allUsersFailure, clearErrors } = allUsersSlice.actions;
export const { userProfileRequest, userProfileSuccess, userProfileFailure, clearError } = userProfileSlice.actions
export default allUsersSlice.reducer;