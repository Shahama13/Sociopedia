import { createSlice } from "@reduxjs/toolkit";
const initialState = {}

export const postOfFollowingSlice = createSlice({
    name: "post",
    initialState,
    reducers: {

        postOfFollowingRequest: (state) => {
            state.loading = true;
        },
        postOfFollowingSuccess: (state, action) => {
            state.loading = false;
            state.posts = action.payload.posts
        },
        postOfFollowingFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
        clearErrors: (state) => { state.error = null }
    }
})

export const {postOfFollowingRequest, postOfFollowingSuccess,postOfFollowingFailure, clearErrors } = postOfFollowingSlice.actions;
export default postOfFollowingSlice.reducer