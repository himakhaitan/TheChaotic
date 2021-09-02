import React from "react";
import classes from "./Logo.module.css";
export default function Logo(props) {
  return (
    <div className={classes.logo + " " + props.className}>
      <a href="www.google.com" className={classes.logoLink}>
        <span className={classes.logoSpan}>Hima</span>
        <span className={classes.logoSpan}>Khaitan</span>
      </a>
    </div>
  );
}
