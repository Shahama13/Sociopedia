import { useDispatch, useSelector } from "react-redux";
import "../Styles/account.css";
import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import Loader from "./Loader/Loader";
import { deleteMyProfile, getMyPostss, logoutUser } from "../Actions/User";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";
import { clearErrors } from "../Reducers/PostOfFollowing";
import { clearMessage } from "../Reducers/Post";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import Post from "./Post";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import User from "./User";

const Account = () => {
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

  const { error: likeError,loading:deleteLoading, message } = useSelector((state) => state.likes);
  const { loading, error, mypost } = useSelector((state) => state.mypost);
  const { user, loading: userLoading } = useSelector((state) => state.user);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);

  const logOutHandler = async () => {
    await dispatch(logoutUser());
    toast.success("Logged out successfully");
  };

  const deleteProfileHandler = async() => {
   await dispatch(deleteMyProfile());
   await dispatch(logoutUser());
  };

  useEffect(() => {
    dispatch(getMyPostss());
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
  
  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="accountleft">
        {mypost?.length > 0 ? (
          mypost?.map((post) => (
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
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h5">You haven't posted yet</Typography>
        )}
      </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "10vmax", width: "10vmax" }}
        />
        <Typography variant="h5" style={{ fontFamily: "Signika, sans-serif" }}>
          {user.name}
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
        <Button variant="contained" onClick={logOutHandler}>
          LOGOUT
        </Button>
        <Link to={"/update/profile"}>
          <EditIcon /> Edit Profile
        </Link>
        <Link to={"/update/password"}>
          <LockPersonIcon /> Change Password
        </Link>
        <Button
          variant={"text"}
          style={{ color: "red", margin: "2vmax" }}
          onClick={() => setDeleteToggle(!deleteToggle)}
        >
          <DeleteIcon />
          Delete My Profile
        </Button>

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
                  You have no followers !
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
                  No followings yet !
                </Typography>
              )}
            </div>
          </Box>
        </Modal>

        <Modal
          open={deleteToggle}
          onClose={() => setDeleteToggle(!deleteToggle)}
        >
          <Box sx={style}>
            <div className="DialogBox">
              <Typography
                variant="h6"
                style={{
                  textAlign: "center",
                  fontFamily: "Signika, cursive",
                  marginBottom:"4vmax",
                  fontSize:"14px",
                  color: "red",
                }}
              >
                Are you sure you want to delete your profile? Your account will
                be deleted permanently and you wont be able to get it back!
              </Typography>
              <Button
               style={{color:"red", marginRight:"1.5vmax", border:"1px solid red"}}
                onClick={deleteProfileHandler}
                disabled={deleteLoading}
                >
                   {deleteLoading ? <HourglassBottomOutlinedIcon /> : "Delete My Profile"}
                 
                </Button>
              <Button onClick={()=> setDeleteToggle(!deleteToggle)}>Go Back</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Account;
