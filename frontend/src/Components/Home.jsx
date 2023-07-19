import React, { useEffect } from "react";
import "../Styles/home.css";
import User from "./User";
import Post from "./Post";
import { toast } from "react-hot-toast";
import Loader from "./Loader/Loader";
import { getAllUsers, getFollowingPosts } from "../Actions/User";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { clearErrors, clearMessage } from "../Reducers/Post";

const Home = () => {
  const dispatch = useDispatch();

  const { error: likeError, message } = useSelector((state) => state.likes);

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );
  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (likeError) {
      toast.error(likeError);
      dispatch(clearErrors());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, likeError, dispatch]);

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts?.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postImage={post.image.url}
              postId={post._id}
              caption={post.caption}
              comments={post.comments}
              likes={post.likes}
              ownerName={post.owner.name}
              ownerImage={post.owner.avatar.url}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6"> Follow people to see some posts</Typography>
        )}
      </div>
      <div className="homeright">
        {users?.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography variant="h6"> No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
