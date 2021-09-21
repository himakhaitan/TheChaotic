import React from "react";
import classes from "./Category.module.css";
import { Link } from "react-router-dom";
export default function Category(props) {
  return (
    <div className={classes.sidegrp}>
      <h3 className={classes["sidebar-heading"]}>{props.heading}</h3>
      <ul className={classes.categoryGrp}>
        {props.data.map((element, index) => {
          return (
            <li key={index}>
              <Link to={element.href}>{element.item}</Link>
              <p>({element.count})</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
