import React from "react";
import { Link } from "react-router-dom";
import classes from "./TagCloud.module.css";
export default function TagCloud(props) {
  return (
    <div className={classes.sidegrp}>
      <h3 className={classes["sidebar-heading"]}>{props.heading}</h3>
      <div className={classes.tags}>
        {props.data &&
          props.data.map((element, index) => {
            return (
              <Link key={index} to={`/tags/${element.item}`}>
                <p>{element.item}</p>
              </Link>
            );
          })}
        {props.array &&
          props.array.map((element, index) => {
            return (
              <Link key={index} to={`/tags/${element}`}>
                <p>{element}</p>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
