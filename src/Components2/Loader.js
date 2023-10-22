import React from "react";
import "./Loader.css";

const Loader = (props) => {
  const x = Object.values(props);
  let css = x.toString();

  return (
    <div className={`loader-center ${css}`}>
      <div className="custom-loader"></div>
      {/* <div class="dots" data-title="dot-pulse"></div> */}
    </div>
  );
};

export const ButtonLoader = () => {
  return <div class="button-loader"></div>;
};

export const DotPulse = () => {
  return <div class="dots" data-title="dot-pulse"></div>;
};

export default Loader;
