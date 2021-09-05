import React from "react";
import SideBar from "../../Sidebar/Sidebar";
import classes from "./ThreeColUI.module.css";
const ThreeColUI = (props) => {
  return (
    <main className={classes.main}>
      {props.children}
      <SideBar />
    </main>
  );
};
export default ThreeColUI;
