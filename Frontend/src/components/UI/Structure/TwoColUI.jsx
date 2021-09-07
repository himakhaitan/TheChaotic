import React from "react";
import classes from "./TwoColUI.module.css";

const TwoColUI = (props) => {
  return (
    <main className={props.className || classes.main}>{props.children}</main>
  );
};
export default TwoColUI;
