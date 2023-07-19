import React, { useEffect, useState } from "react";
import "../Styles/updatePassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../Actions/User";
import { clearErrors, clearMessage } from "../Reducers/Post";
import { toast } from "react-hot-toast";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.likes);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updatePassword(oldPassword, newPassword));
    setOldPassword("");
    setNewPassword("");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, dispatch, message]);

  return (
    <div className="updatePassword">
      <form action="" className="updatePasswordForm" onSubmit={submitHandler}>
        <Typography
          variant="h4"
          style={{
            padding: "1vmax",
            color: "#007FFF",
            fontFamily: "Caprasimo, cursive",
            marginBottom: "4vmax",
          }}
        >
          Sociopedia
        </Typography>

        <input
          type="password"
          className="updatePasswordInputs"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
          required
        />
        <input
          type="password"
          className="updatePasswordInputs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <Button disabled={loading} type="submit">
          {loading ? <HourglassBottomOutlinedIcon /> : "Change Password"}
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
