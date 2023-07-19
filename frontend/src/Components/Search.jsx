import React, { useEffect, useState } from "react";
import "../Styles/search.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Actions/User";
import User from "./User";
import HourglassBottomOutlinedIcon from "@mui/icons-material/HourglassBottomOutlined";

const Search = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <>
      <div className="search">
        <form className="searchForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <Button disabled={loading} type="submit">
            {loading ? <HourglassBottomOutlinedIcon /> : <SearchIcon />}
          </Button>
        </form>

        <div className="searchResults">
          {users &&
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Search;
