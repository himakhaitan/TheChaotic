import React from "react";
import classes from "./Navigation.module.css";
import Logo from "../UI/Logo/Logo";
import { BiNavigation } from "react-icons/bi";
const Navigation = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <ul>
          <li className={classes.active}>
            <a href="home.html">Home</a>
          </li>
          <li>
            <a href="../Technology/technology.html">Technology</a>
          </li>
          <li>
            <a href="../Money/Money.html">Money</a>
          </li>
          <li>
            <a href="../About/about.html">About</a>
          </li>
          <li>
            <a href="../Contact/Contact.html">Contact</a>
          </li>
        </ul>
      </nav>
      <Logo className={classes.logo}/>
      <div className={classes.newsletter}>
        <h3 className={classes.newsletterHead}>Subscribe to Newsletter</h3>
        <div className={classes.newsletterform}>
          <input
            type="text"
            className={classes.newsletterInput}
            placeholder="Enter Email Address"
          />
          <div className={classes.submitIcon}>
            <BiNavigation />
          </div>
        </div>
      </div>
      <div className={classes.copyright}>
        <p>
          Copyright &copy;2021 All rights reserved | Made with 🖤 by
          <span>Himanshu </span>
        </p>
      </div>
    </header>
  );
};
export default Navigation;
