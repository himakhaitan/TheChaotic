import React from "react";
import classes from "./Overlay.module.css";

const Overlay = () => {
  return <div className={classes.overlay}>
      <div className={classes.overDiv}>
          <h1>Hello World</h1>
      </div>
  </div>;
};
export default Overlay;
