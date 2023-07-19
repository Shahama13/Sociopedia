import React, { useEffect, useState } from "react";
import "../Styles/resetPassword.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../Actions/User";
import { toast } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { clearErrors, clearMessage } from "../Reducers/Post";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

const ResetPassword = () => {
  const { error, loading, message } = useSelector((state) => state.likes);

  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [error, message, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(resetPassword(params.token, newPassword));
    setNewPassword("");
  };

  return (
    <div className="resetPassword">
      <form action="" className="resetPasswordForm" onSubmit={submitHandler}>
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
          className="resetPasswordInputs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />

        <Link to="/forgot/password">
          <Typography>Resend Email</Typography>
        </Link>

        <Typography>or</Typography>

        <Link to="/">
          <Typography>Login</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          {loading ? <HourglassBottomOutlinedIcon /> : "Reset Password"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
