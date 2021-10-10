import React from "react";
import classes from "./Input.module.css";
export default function Dropdown(props) {
  return (
    <div className={classes.inputGrp}>
      <label htmlFor={props.id}>{props.label}</label>
      <p>:</p>
      <select name={props.label} id={props.id} className={classes.selectInput}>
        {props.data.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </select>
    </div>
  );
}
