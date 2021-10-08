import React from "react";
import classes from "./Input.module.css";
export default function Submit(props) {
  return (
    <div className={classes.inputGrp}>
      <button
        onClick={props.onClick}
        disabled={props.disabled}
        className={classes.button}
      >
        {props.text}
      </button>
    </div>
  );
}
