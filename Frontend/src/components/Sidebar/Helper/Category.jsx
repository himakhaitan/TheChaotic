import React from "react";
import classes from "./Category.module.css";
export default function Category(props) {
  return (
    <div className={classes.sidegrp}>
      <h3 className={classes["sidebar-heading"]}>{props.heading}</h3>
      <ul className={classes.categoryGrp}>
        {props.data.map((element, index) => {
          return (
            <li key={index}>
              <a href={element.href}>{element.item}</a>
              <p>({element.count})</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
