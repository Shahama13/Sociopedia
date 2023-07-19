import axios from "axios";
import { addCommentFailure, addCommentRequest, addCommentSuccess, deleteCommentFailure, deleteCommentRequest, deleteCommentSuccess, deletePostFailure, deletePostRequest, deletePostSuccess, getLikes, getLikesFailure, likeFailure, likeRequest, likeSuccess, newPostFailure, newPostRequest, newPostSuccess, updateCaptionFailure, updateCaptionRequest, updateCaptionSuccess } from "../Reducers/Post";

export const likePost = (id) => async (dispatch) => {
    try {
        dispatch(likeRequest())
        const { data } = await axios.get(`/api/v1/post/${id}`)
        dispatch(likeSuccess({
            message: data.message
        }))
    } catch (error) {
        dispatch(likeFailure({
            error: error.response.data.message
        }))
    }
}

export const addCommentOnPost = (id, comment) => async (dispatch) => {
    try {
        dispatch(addCommentRequest())
        const { data } = await axios.put(`/api/v1/posts/comment/${id}`, {
            comment
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(addCommentSuccess({
            message: data.message
        }))
    } catch (error) {
        dispatch(addCommentFailure({
            error: error.response.data.message
        }))
    }
}

export const getLikesOfPosts = (postId) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/v1/postslike/${postId}`)
        dispatch(getLikes({
            userlikes: data.post.likes,
            userComment: data.post.comments,
            commentCount: data.commentCount,
        }))
    } catch (error) {
        dispatch(getLikesFailure({
            error: error.response.data.message
        }))
    }
}

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
    try {
        dispatch(deleteCommentRequest())
        const { data } = await axios.delete(`/api/v1/posts/comment/${id}`, {
            data: { commentId }
        })
        dispatch(deleteCommentSuccess({
            message: data.message
        }))
    } catch (error) {
        dispatch(deleteCommentFailure(
            // { error: error.response.data.message }
        ))
    }
}

export const createNewPost = (caption, image) => async (dispatch) => {
    try {
        dispatch(newPostRequest())
        const { data } = await axios.post(`/api/v1/post/upload`, {
            caption, image
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(newPostSuccess({
            message: data.message
        }))
    } catch (error) {
        dispatch(newPostFailure({
            error: error.response.data.message
        }))
    }
}

export const updatePost = (caption, id) => async (dispatch) => {
    try {
        dispatch(updateCaptionRequest())
        const { data } = await axios.put(`/api/v1/post/${id}`, {
            caption
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        dispatch(updateCaptionSuccess({
            message: data.message,
        }))
    } catch (error) {
        dispatch(updateCaptionFailure({
            error: error.response.data.message
        }))
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch(deletePostRequest())
        const { data } = await axios.delete(`/api/v1/post/${id}`)
        dispatch(deletePostSuccess({
            message: data.message
        }))
    } catch (error) {
        dispatch(deletePostFailure({
            error: error.response.data.message
        }))
    }
}
