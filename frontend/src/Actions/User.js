import axios from "axios"
import { LoadUserFailure, RegisterRequest, RegisterSuccess, RegisterFailure, LoadUserRequest, LoadUserSuccess, LogOutUserFailure, LogOutUserRequest, LogOutUserSuccess, LoginFailure, LoginRequest, LoginSuccess, clearErrors } from "../Reducers/User"
import { postOfFollowingFailure, postOfFollowingRequest, postOfFollowingSuccess } from "../Reducers/PostOfFollowing"
import { allUsersFailure, allUsersRequest, allUsersSuccess, userProfileFailure, userProfileRequest, userProfileSuccess } from "../Reducers/AllUsers"
import { clearMessage, deleteProfileFailure, deleteProfileRequest, deleteProfileSuccess, followUserFailure, followUserRequest, followUserSuccess, forgotPasswordFailure, forgotPasswordRequest, forgotPasswordSuccess, myPostFailure, myPostRequest, myPostSuccess, resetPasswordFailure, resetPasswordRequest, resetPasswordSuccess, updatePasswordFailure, updatePasswordRequest, updatePasswordSuccess, updateProfileFailure, updateProfileRequest, updateProfileSuccess, userPostFailure, userPostRequest, userPostSuccess } from "../Reducers/Post"
import { toast } from "react-hot-toast"

export const registerUser = (name, email, password, avatar) => async (dispatch) => {
    try {
        dispatch(RegisterRequest())
        const { data } = await axios.post("/api/v1/register", { name, email, password, avatar }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        await dispatch(RegisterSuccess({
            user: data.user,
        }))
        toast.success('Your Sociopedia account has been created successfully')
    } catch (error) {
        await dispatch(RegisterFailure({
            error: error.response.data.message
        }))
        toast.error(' Please complete all the fields')

    }
}

export const updatePassword = (oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch(updatePasswordRequest())
        const { data } = await axios.put("/api/v1/update/password", { oldPassword, newPassword }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        await dispatch(updatePasswordSuccess({
            message: data.message,
        }))
    } catch (error) {
        await dispatch(updatePasswordFailure({
            error: error.response.data.message
        }))
    }
}

export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try {
        dispatch(updateProfileRequest())
        const { data } = await axios.put("/api/v1/update/profile", { name, email, avatar }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        await dispatch(updateProfileSuccess({
            message: data.message,
        }))
        await dispatch(clearMessage())
        toast.success("Profile Updated")
    } catch (error) {
        await dispatch(updateProfileFailure({
            error: error.response.data.message
        }))
    }
}

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch(LoginRequest())
        const { data } = await axios.post("/api/v1/login", { email, password }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        await dispatch(LoginSuccess({
            user: data.user,
        }))
        toast.success('logged in successfully')
        dispatch(clearMessage())
    } catch (error) {
        await dispatch(LoginFailure({
            error: error.response.data.message
        }))
        toast.error('Incorrect email or password')
        dispatch(clearErrors())

    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch(LogOutUserRequest())
        await axios.get("/api/v1/logout")
        await dispatch(LogOutUserSuccess())
    } catch (error) {
        dispatch(LogOutUserFailure({
            error: error.response.data.message
        }))
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch(LoadUserRequest())
        const { data } = await axios.get("/api/v1/me")
        dispatch(LoadUserSuccess({
            user: data.user,
        }))
    } catch (error) {
        dispatch(LoadUserFailure({
            error: error.response.data.message
        }))
        dispatch(clearErrors())
    }
}

export const getFollowingPosts = () => async (dispatch) => {
    try {
        dispatch(postOfFollowingRequest())
        const { data } = await axios.get("/api/v1/posts")
        dispatch(postOfFollowingSuccess({
            posts: data.posts
        }))
    } catch (error) {
        dispatch(postOfFollowingFailure({
            error: error.response.data.message
        }))
    }
}

export const getAllUsers = (name="") => async (dispatch) => {
    try {
        dispatch(allUsersRequest())
        const { data } = await axios.get(`/api/v1/users?name=${name}`)
        dispatch(allUsersSuccess({
            users: data.users
        }))
    } catch (error) {
        dispatch(allUsersFailure({
            error: error.response.data.message
        }))
    }
}

export const getMyPostss = () => async (dispatch) => {
    try {
        dispatch(myPostRequest())
        const { data } = await axios.get("/api/v1/my/posts")
        dispatch(myPostSuccess({
            mypost: data.posts
        }))
    } catch (error) {
        dispatch(myPostFailure({
            error: error.response.data.message
        }))
    }
}

export const deleteMyProfile = () => async (dispatch) => {
    try {
        dispatch(deleteProfileRequest())
        const { data } = await axios.delete("/api/v1/delete/me")
        await dispatch(deleteProfileSuccess({
            message: data.message,
        }))
    } catch (error) {
        await dispatch(deleteProfileFailure({
            error: error.response.data.message
        }))
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch(forgotPasswordRequest())
        const { data } = await axios.post("/api/v1/forgot/password", {
            email
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        await dispatch(forgotPasswordSuccess({
            message: data.message,
        }))
    } catch (error) {
        await dispatch(forgotPasswordFailure({
            error: error.response.data.message
        }))
    }
}

export const resetPassword = (token,password) => async (dispatch) => {
    try {
        dispatch(resetPasswordRequest())
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, {
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        await dispatch(resetPasswordSuccess({
            message: data.message,
        }))
    } catch (error) {
        await dispatch(resetPasswordFailure({
            error: error.response.data.message
        }))
    }
}

export const getUserPost = (id) => async (dispatch) => {
    try {
        dispatch(userPostRequest())
        const { data } = await axios.get(`/api/v1/userposts/${id}`)
        dispatch(userPostSuccess({
            userpost: data.posts
        }))
    } catch (error) {
        dispatch(userPostFailure({
            error: error.response.data.message
        }))
    }
}

export const getUserProfile = (id) => async (dispatch) => {
    try {
        dispatch(userProfileRequest())
        const { data } = await axios.get(`/api/v1/user/${id}`)
        dispatch(userProfileSuccess({
            user: data.user
        }))
    } catch (error) {
        dispatch(userProfileFailure({
            error: error.response.data.message
        }))
    }
}

export const followUnfollowUser = (id) => async (dispatch) => {
    try {
        dispatch(followUserRequest())
        const { data } = await axios.get(`/api/v1/follow/${id}`)
        dispatch(followUserSuccess({
            message: data.message
        }))
    } catch (error) {
        dispatch(followUserFailure({
            error: error.response.data.message
        }))
    }
}