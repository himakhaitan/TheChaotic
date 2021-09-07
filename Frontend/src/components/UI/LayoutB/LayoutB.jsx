import React from "react";
import classes from "./LayoutB.module.css";
import { BsHeartFill, BsEye } from "react-icons/bs";
import { BiCommentDots } from "react-icons/bi";

const LayoutB = (props) => {
  return (
    <div className={classes.blogCont}>
      <img
        src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg"
        alt=""
      />
      <h3>
        <a>A Loving Heart is the Truest Wisdom</a>
      </h3>
      <p className={classes.blogTextContent}>
        Even the all-powerful Pointing has no control about the blind texts it
        is an almost unorthographic life One day however a small line of blind
        text by the name of Lorem Ipsum decided to leave for the far World of
        Grammar.
      </p>
      <div className={classes.writter}>
        <img
          src="https://cdn.pixabay.com/photo/2015/03/26/09/40/suit-690048_1280.jpg"
          alt=""
        />
        <div className={classes.writterStats}>
          <p>Written By</p>
          <h5>
            <span>Himanshu Khaitan</span>, June 28, 2019
          </h5>
        </div>
      </div>
      <div className={classes.blogUtils}>
        <button>Continue Reading</button>
        <div className={classes.insight}>
          <p className={classes.icon}>
            <BsHeartFill />
          </p>
          <p>3</p>
          <p className={classes.icon}>
            <BsEye />
          </p>
          <p>100</p>
          <p className={classes.icon}>
            <BiCommentDots />
          </p>
          <p>5</p>
        </div>
      </div>
    </div>
  );
};

export default LayoutB;
