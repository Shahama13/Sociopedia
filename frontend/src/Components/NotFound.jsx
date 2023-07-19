import React from "react";
import "../Styles/notFound.css";
import { ErrorOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline />
        <Typography variant="h5" style={{ padding: "2vmax" }}>
          Page Not Found
        </Typography>

        <Link to="/">
          <Typography variant="h6">Go to Home</Typography>
        </Link>
      </div>
    </div>
  )
}

export default NotFound