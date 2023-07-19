import React, { useEffect, useState } from "react";
import "../Styles/post.css";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCommentOnPost,
  deletePost,
  getLikesOfPosts,
  likePost,
  updatePost,
} from "../Actions/Post";
import User from "./User";
import CommentCard from "./CommentCard";
import { getMyPostss, loadUser } from "../Actions/User";
const Post = ({
  postId,
  caption,
  postImage,
  ownerImage,
  ownerName,
  ownerId,
  comments = [],
  likes = [],
  isDelete = false,
  isAccount = false,
}) => {
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

  const [liked, setLiked] = useState(false);
  const [likesUser, setLikesUser] = useState(false);
  const [postLikes, setPostLikes] = useState(likes.length); // Track the number of likes separately

  const { userlikes, userComment, commentCount } = useSelector(
    (state) => state.likes
  );

  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);

  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const updateCaptionHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePost(captionValue, postId));
    setCaptionValue("");
    setCaptionToggle(!captionToggle);
    dispatch(getMyPostss());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    await dispatch(getMyPostss());
    dispatch(loadUser());
  };

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));
    setPostLikes(liked ? postLikes - 1 : postLikes + 1); // Update the likes count based on previous state
    if (isAccount) {
      // dispatch(getMyPostss());
    } else {
      dispatch(getLikesOfPosts(postId));
    }
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    await dispatch(addCommentOnPost(postId, commentValue));
    await dispatch(getLikesOfPosts(postId));
     dispatch(getLikesOfPosts(postId));
    setCommentValue("");
    // if (isAccount) {
    //   // dispatch(getMyPostss());
    // } else {
    // }
  };

  useEffect(() => {
    likes?.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
    setPostLikes(likes.length); // Set the initial likes count when the component mounts
  }, [likes, user._id]);

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount && (
          <Button onClick={() => setCaptionToggle(!captionToggle)}>
            <MoreVert />
          </Button>
        )}
      </div>
      <img src={postImage} alt="Post" />
      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="user"
          sx={{ height: "3vmax", width: "3vmax" }}
        />
        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight={700}>{ownerName}</Typography>
        </Link>
        <Typography
          fontWeight={100}
          style={{ alignSelf: "center" }}
          color={"black"}
        >
          {caption}
        </Typography>
      </div>
      <button
        style={{
          border: "none",
          cursor: "pointer",
          margin: "1vmax 2vmax",
          padding: "1vmax 0vmax",
          backgroundColor: "white",
        }}
        onClick={() => {
          setLikesUser(!likesUser);
          dispatch(getLikesOfPosts(postId));
        }}
        disabled={postLikes === 0}
      >
        {postLikes} {postLikes === 1 ? "like" : "likes"}
      </button>
      <button
        style={{
          border: "none",
          cursor: "pointer",
          margin: "1vmax 2vmax",
          padding: "1vmax 0vmax",
          backgroundColor: "white",
        }}
        onClick={() => {
          setCommentToggle(!commentToggle);
          dispatch(getLikesOfPosts(postId));
        }}
      >
        {commentCount ? commentCount : comments.length} comments
      </button>
      <div className="postFoter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button
          onClick={() => {
            setCommentToggle(!commentToggle);
            dispatch(getLikesOfPosts(postId));
          }}
        >
          <ChatBubbleOutline />
        </Button>
        {isDelete && (
          <Button onClick={deletePostHandler}>
            <DeleteOutline />
          </Button>
        )}
      </div>
      <Modal open={likesUser} onClose={() => setLikesUser(!likesUser)}>
        <Box sx={style}>
          <div className="DialogBox">
            <Typography
              variant="h6"
              style={{ textAlign: "center", fontFamily: "Signika, cursive" }}
            >
              Liked By
            </Typography>
            {userlikes?.map((like) => (
              <User
                key={like._id}
                userId={like._id}
                name={like.name}
                avatar={like.avatar.url}
              />
            ))}
          </div>
        </Box>
      </Modal>

      <Modal
        open={commentToggle}
        onClose={() => {
          setCommentToggle(!commentToggle);
          dispatch(getLikesOfPosts(postId));
        }}
      >
        <Box sx={style}>
          <div className="DialogBox">
            <form className="commentForm" onSubmit={addCommentHandler}>
              <input
                type="text"
                value={commentValue}
                placeholder="Add a comment"
                onChange={(e) => setCommentValue(e.target.value)}
                required
              />
              <Button type="submit" variant="contained">
                <SendIcon />
              </Button>
            </form>
            {userComment && userComment.length > 0 ? (
              userComment.map((item) => (
                <CommentCard
                  userId={item.user._id}
                  name={item.user.name}
                  avatar={item.user.avatar.url}
                  comment={item.comment}
                  commentId={item._id}
                  isAccount={isAccount}
                  postId={postId}
                  key={item._id}
                />
              ))
            ) : (
              <Typography style={{ marginTop: "70px" }}>
                No Comments Yet
              </Typography>
            )}
          </div>
        </Box>
      </Modal>

      <Modal
        open={captionToggle}
        onClose={() => {
          setCaptionToggle(!captionToggle);
        }}
      >
        <Box sx={style}>
          <div className="DialogBox">
            <Typography
              variant="h6"
              style={{ textAlign: "center", fontFamily: "Signika, cursive" }}
            >
              {" "}
              Update Post Caption
            </Typography>
            <form className="commentForm" onSubmit={updateCaptionHandler}>
              <input
                type="text"
                value={captionValue}
                placeholder="Update Caption"
                onChange={(e) => setCaptionValue(e.target.value)}
              />
              <Button type="submit" variant="contained">
                <SendIcon />
              </Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Post;
