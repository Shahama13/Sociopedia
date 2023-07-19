import { createSlice } from "@reduxjs/toolkit";
const initialState = {}

export const likeSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {

        likeRequest: (state) => {
            state.loading = true;
        },
        likeSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        likeFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        addCommentRequest: (state) => {
            state.loading = true;
        },
        addCommentSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        addCommentFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        deleteCommentRequest: (state) => {
            state.loading = true;
        },
        deleteCommentSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        deleteCommentFailure: (state, action) => {
            state.loading = false;
            // state.error = action.payload.error;
        },

        updateCaptionRequest: (state) => {
            state.loading = true;
        },
        updateCaptionSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        updateCaptionFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        deletePostRequest: (state) => {
            state.loading = true;
        },
        deletePostSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        deletePostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        updateProfileRequest: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        updateProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        updatePasswordRequest: (state) => {
            state.loading = true;
        },
        updatePasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        updatePasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        deleteProfileRequest: (state) => {
            state.loading = true;
        },
        deleteProfileSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        deleteProfileFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        forgotPasswordRequest: (state) => {
            state.loading = true;
        },
        forgotPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        forgotPasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        resetPasswordRequest: (state) => {
            state.loading = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        resetPasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        
        followUserRequest: (state) => {
            state.loading = true;
        },
        followUserSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        followUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        newPostRequest: (state) => {
            state.loading = true;
        },
        newPostSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message
        },
        newPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },

        clearErrors: (state) => { state.error = null },
        clearMessage: (state) => { state.message = null },

        getLikes: (state, action) => {
            state.userlikes = action.payload.userlikes
            state.userComment = action.payload.userComment
            state.commentCount = action.payload.commentCount
        },

        getLikesFailure: (state, action) => {
            state.error = action.payload.error
        },
    }
})

export const myPostSlice = createSlice({
    name: "mypost",
    initialState,
    reducers: {
        myPostRequest: (state) => {
            state.loading = true;
        },
        myPostSuccess: (state, action) => {
            state.loading = false;
            state.mypost = action.payload.mypost;
        },
        myPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
    }
})

export const userPostSlice = createSlice({
    name: "userpost",
    initialState,
    reducers: {
        userPostRequest: (state) => {
            state.loading = true;
        },
        userPostSuccess: (state, action) => {
            state.loading = false;
            state.userpost = action.payload.userpost;
        },
        userPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload.error
        },
        clearErr: (state) => { state.error = null }
    }
})

export const {
    deleteCommentRequest, deleteCommentFailure, deleteCommentSuccess,
    newPostRequest, newPostSuccess, newPostFailure,
    addCommentRequest, addCommentFailure, addCommentSuccess,
    likeRequest, likeSuccess, likeFailure,
    getLikesFailure, getLikes,
    followUserRequest,followUserSuccess,followUserFailure,
    deletePostRequest, deletePostSuccess, deletePostFailure,
    updateCaptionRequest, updateCaptionSuccess, updateCaptionFailure,
    clearErrors, clearMessage,
    deleteProfileRequest, deleteProfileSuccess, deleteProfileFailure,
    updatePasswordRequest, updatePasswordSuccess, updatePasswordFailure,
    updateProfileRequest, updateProfileSuccess, updateProfileFailure,
    forgotPasswordRequest,forgotPasswordSuccess,forgotPasswordFailure,
    resetPasswordRequest,resetPasswordSuccess,resetPasswordFailure,
} = likeSlice.actions;

export const { myPostRequest, myPostSuccess, myPostFailure } = myPostSlice.actions;
export const {userPostRequest,userPostSuccess,userPostFailure,clearErr}=userPostSlice.actions;
export default likeSlice.reducer