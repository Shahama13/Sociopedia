import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import Loader from "./Loader/Loader";
import { toast } from "react-hot-toast";
import Post from "./Post";
import { useParams } from "react-router-dom";
import User from "./User";
import {
  followUnfollowUser,
  getAllUsers,
  getFollowingPosts,
  getMyPostss,
  getUserPost,
  getUserProfile,
  loadUser,
} from "../Actions/User";
import { clearErr, clearErrors } from "../Reducers/Post";
import { clearError } from "../Reducers/AllUsers";
import { clearMessage } from "../Reducers/Post";

const UserProfile = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "52%",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  const {
    error: followError,
    loading: followLoading,
    message,
  } = useSelector((state) => state.likes);
  const { loading, error, userpost } = useSelector((state) => state.userpost);
  const {
    user,
    loading: userLoading,
    error: userProfileError,
  } = useSelector((state) => state.userprofile);
  const { user: me } = useSelector((state) => state.user);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  useEffect(() => {
    dispatch(getUserPost(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }

    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else setFollowing(false);
      });
    }
  }, [user, me._id, params.id]);

  useEffect(() => {
    if (followError) {
      toast.error(followError);
      dispatch(clearErrors());
    }
    if (userProfileError) {
      toast.error(userProfileError);
      dispatch(clearError());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErr());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, followError, userProfileError, dispatch]);

  const followHandler = async () => {
    setFollowing(!following);
    await dispatch(followUnfollowUser(user._id));
    dispatch(getUserPost(params.id));
    dispatch(getUserProfile(params.id));
    dispatch(loadUser());
    dispatch(getMyPostss())
    dispatch(getFollowingPosts())
    dispatch(getAllUsers())

  };

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {userpost?.length > 0 ? (
          userpost?.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              postImage={post.image.url}
              caption={post.caption}
              comments={post.comments}
              likes={post.likes}
              ownerName={post.owner.name}
              ownerImage={post.owner.avatar.url}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6"> User hasn't posted yet</Typography>
        )}
      </div>
      <div className="accountright">
        {user && (
          <>
            <Avatar
              src={user.avatar.url}
              sx={{ height: "10vmax", width: "10vmax" }}
            />
            <Typography
              variant="h5"
              style={{ fontFamily: "Signika, sans-serif" }}
            >
              {user?.name}
            </Typography>
            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user?.followers?.length}</Typography>
            </div>
            <div>
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user?.following?.length}</Typography>
            </div>
            <div>
              <Typography>Post</Typography>
              <Typography>{user?.posts?.length}</Typography>
            </div>

            {myProfile ? null : (
              <Button
                variant="contained"
                style={{ backgroundColor: following ? "#8f46d3" : "#1b73ca" }}
                onClick={followHandler}
                disabled={followLoading}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
          </>
        )}

        <Modal
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <Box sx={style}>
            <div className="DialogBox">
              <Typography
                variant="h5"
                style={{ textAlign: "center", fontFamily: "Signika, cursive" }}
              >
                Followers
              </Typography>
              {user && user.followers.length > 0 ? (
                user.followers.map((follower) => (
                  <User
                    key={follower._id}
                    userId={follower._id}
                    name={follower.name}
                    avatar={follower?.avatar?.url}
                  />
                ))
              ) : (
                <Typography variant="h6" style={{ margin: "3vmax" }}>
                  {" "}
                  0 followers
                </Typography>
              )}
            </div>
          </Box>
        </Modal>

        <Modal
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <Box sx={style}>
            <div className="DialogBox">
              <Typography
                variant="h5"
                style={{ textAlign: "center", fontFamily: "Signika, cursive" }}
              >
                Following
              </Typography>
              {user && user.following.length > 0 ? (
                user.following.map((following) => (
                  <User
                    key={following._id}
                    userId={following._id}
                    name={following.name}
                    avatar={following.avatar.url}
                  />
                ))
              ) : (
                <Typography variant="h6" style={{ margin: "3vmax" }}>
                  {" "}
                  0 followings
                </Typography>
              )}
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default UserProfile;
