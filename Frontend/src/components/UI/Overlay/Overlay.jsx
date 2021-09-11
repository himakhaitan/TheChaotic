import React from "react";
import classes from "./Overlay.module.css";

import ReactDOM from "react-dom";

const Notification = (props) => {
  return (
    <div className={classes.overlay}>
      <div className={classes.overDiv}>
        <p className={classes.text}>{props.message}</p>
        <div className={classes.button} onClick={props.onClick}>
          Close
        </div>
      </div>
    </div>
  );
};

const Overlay = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Notification message={props.message} onClick={props.onClick} />,
        document.getElementById("backdropRoot")
      )}
    </React.Fragment>
  );
};
export default Overlay;
