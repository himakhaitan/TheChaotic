import React from "react";
import classes from "./TagCloud.module.css";
export default function TagCloud(props) {
  return (
    <div className={classes.sidegrp}>
      <h3 className={classes["sidebar-heading"]}>{props.heading}</h3>
      <div className={classes.tags}>
        {props.data.map((element, index) => {
          return (
            <a key={index} href={element.href}>
              <p>{element.item}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
