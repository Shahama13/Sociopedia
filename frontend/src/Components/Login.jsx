import React, { useState } from "react";
import "../Styles/login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {useDispatch } from "react-redux";
import { loginUser } from "../Actions/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  return (
    <div className="login">
      <form action="" className="loginForm" onSubmit={loginHandler}>
        <Typography
          variant="h4"
          style={{
            padding: "1vmax",
            color: "#007FFF",
            fontFamily: "Caprasimo, cursive",
          }}
        >
          Sociopedia
        </Typography>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>
        <Button type="submit">Login</Button>
        <Link to="/register">
          <Typography>Dont have an account? Sign Up </Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;
