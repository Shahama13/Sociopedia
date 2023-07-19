import React, { useEffect, useState } from "react";
import "../Styles/forgotPassword.css";
import { Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../Actions/User";
import { toast } from "react-hot-toast";
import { clearErrors, clearMessage } from "../Reducers/Post";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, loading, message } = useSelector((state) => state.likes);
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword(email));
    setEmail("");
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
  }, [error, message, dispatch]);

  return (
    <div className="forgotPassword">
      <form action="" className="forgotPasswordForm" onSubmit={submitHandler}>
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
          className="forgotPasswordInputs"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Button disabled={loading} type="submit">
          {loading ? (
            <HourglassBottomOutlinedIcon />
          ) : (
            " Get Password Reset Email"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
