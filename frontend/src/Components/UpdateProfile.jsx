import React, { useEffect, useState } from "react";
import "../Styles/updateProfile.css";
import { Avatar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "../Actions/User";
import { toast } from "react-hot-toast";
import Loader from "./Loader/Loader";
import { clearErrors } from "../Reducers/User";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

const UpdateProfile = () => {
  const { loading, error, user } = useSelector((state) => state.user);
  const { loading: updateLoading, error: updateError } = useSelector(
    (state) => state.likes
  );

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = (e) => {
      if (Reader.readyState === 2) {
        setAvatarPreview(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(name, email, avatar));
    await dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
  }, [error, dispatch, updateError]);

  return loading ? (
    <Loader />
  ) : (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          style={{
            padding: "1vmax",
            color: "#007FFF",
            fontFamily: "Caprasimo, cursive",
            marginBottom: "3vmax",
          }}
        >
          Sociopedia
        </Typography>

        <Avatar
          src={avatarPreview}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          className="updateProfileInputs"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          className="updateProfileInputs"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <Button disabled={updateLoading} type="submit">
          {updateLoading ? <HourglassBottomOutlinedIcon /> : "Update"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
