import React, { useState } from "react";
import classes from "./Navigation.module.css";
import Logo from "../UI/Logo/Logo";
import validator from "validator";
import { BiNavigation } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import newsletterRegister from "../../utils/newsletter";

const Navigation = () => {
  const [email, setEmail] = useState("");
  const [errorState, setErrorState] = useState({
    success: true,
    message: "",
  });

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const submitHandler = async () => {
    if (email.length === 0) {
      setErrorState({
        success: false,
        message: "E-mail Can't Be Empty",
      });
    } else {
      if (!validator.isEmail(email)) {
        setErrorState({
          success: false,
          message: "Invalid E-mail",
        });
      } else {
        const { success, message } = await newsletterRegister(email);
        if (success) {
          setEmail("");
        }
        console.log(success, message);
        setErrorState({
          success,
          message,
        });
      }
    }
  };
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
            value={email}
            onChange={emailChangeHandler}
            className={`${classes.newsletterInput}`}
            placeholder="Enter Email Address"
          />
          <div className={classes.submitIcon} onClick={submitHandler}>
            <BiNavigation />
          </div>
        </div>
        <p className={`${!errorState.success ? classes.error : classes.success} ${classes.message}`}>
          &nbsp;{errorState.message}
        </p>
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
