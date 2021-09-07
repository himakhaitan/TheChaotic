import React from "react";
import classes from "./Navigation.module.css";
import Logo from "../UI/Logo/Logo";
import { BiNavigation } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className={classes.header}>
      <nav className={classes.navigation}>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} exact to="/technology">
              Technology
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} exact to="/money">
              Money
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} exact to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={classes.active} exact to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <Logo className={classes.logo} />
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
