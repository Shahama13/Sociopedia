import "../Styles/header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { getMyPostss } from "../Actions/User";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
      <Link to="/" onClick={() => {setTab("/"); dispatch(getMyPostss());}}>
        {tab === "/" ? <Home style={{ color: "#3d0b60" }} /> : <HomeOutlined />}
      </Link>
      <Link to="/newpost" onClick={() => setTab("/newpost")}>
        {tab === "/newpost" ? (
          <Add style={{ color: "#3d0b60" }} />
        ) : (
          <AddOutlined />
        )}
      </Link>
      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "#3d0b60" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>
      <Link
        to="/account"
        onClick={() => {
          setTab("/account");
          dispatch(getMyPostss());
        }}
      >
        {tab === "/account" ? (
          <AccountCircle style={{ color: "#3d0b60" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>
    </div>
  );
};

export default Header;
