import React, { useEffect, useState } from "react";
import "../Styles/register.css";
import { Avatar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Actions/User";
import { toast } from "react-hot-toast";
import { clearErrors } from "../Reducers/User";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = (e) => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch]);

  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit}>
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
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          className="registerInputs"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          className="registerInputs"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="registerInputs"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Link to="/">
          <Typography>Already have an account?</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          {loading ? <HourglassBottomOutlinedIcon /> : " Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
