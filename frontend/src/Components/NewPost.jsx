import React, { useEffect, useState } from "react";
import "../Styles/newPost.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../Actions/Post";
import { toast } from "react-hot-toast";
import { clearErrors, clearMessage } from "../Reducers/Post";
import { loadUser } from "../Actions/User";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.likes);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, message, error]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
    setImage(null);
    setCaption("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = (e) => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h4"> New Post</Typography>
        {image && <img src={image} alt="post" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption..."
        />
        <Button disabled={loading} type="submit">
          {loading ? <HourglassBottomOutlinedIcon /> : "Post"}
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
