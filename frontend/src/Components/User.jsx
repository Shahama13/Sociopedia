import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar} alt={name} />
      <Typography style={{ fontFamily: "Signika, cursive" }}>
        {name}
      </Typography>
    </Link>
  );
};

export default User;
