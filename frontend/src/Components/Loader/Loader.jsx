import React from "react";
import Spinner from "./Spinner.gif";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img src={Spinner} alt="" />
    </div>
  );
};

export default Loader;
