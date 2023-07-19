import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./Reducers/User";
import postOfFollowingSlice from "./Reducers/PostOfFollowing";
import allUsersSlice, { userProfileSlice } from "./Reducers/AllUsers";
import likeSlice, { myPostSlice, userPostSlice } from "./Reducers/Post";

const store = configureStore({
    reducer: {
        user: userSlice,
        postOfFollowing: postOfFollowingSlice,
        allUsers: allUsersSlice,
        likes: likeSlice,
        mypost: myPostSlice.reducer,
        userpost: userPostSlice.reducer,
        userprofile:userProfileSlice.reducer
    }
})

export default store;