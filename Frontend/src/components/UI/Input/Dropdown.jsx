import React from "react";
import classes from "./Input.module.css";
export default function Dropdown(props) {
  const changeHandler = (event) => {
    props.onChange(event.target.value);
  };
  return (
    <div className={classes.inputGrp}>
      <label htmlFor={props.id}>{props.label}</label>
      <p>:</p>
      <select
        value={props.value}
        onChange={changeHandler}
        name={props.label}
        id={props.id}
        className={classes.selectInput}
        placeholder={props.placeholder}
      >
        <option value="none" selected disabled hidden>
          Select an Option
        </option>
        {props.data.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
