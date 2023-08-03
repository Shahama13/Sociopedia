import React from "react";
import "../Styles/commentCard.css";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost, getLikesOfPosts } from "../Actions/Post";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteCommentHandler = async () => {
    await dispatch(deleteCommentOnPost(postId, commentId));
    dispatch(getLikesOfPosts(postId));
  };
  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography
          style={{ minWidth: "6vmax", fontFamily: "Signika, sans-serif" }}
        >
          {name}
        </Typography>
      </Link>
      <Typography style={{ textAlign: "left" }}>{comment}</Typography>
      {isAccount ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : userId === user._id ? (
        <Button onClick={deleteCommentHandler}>
          <Delete />
        </Button>
      ) : null}
    </div>
  );
};

export default CommentCard;
