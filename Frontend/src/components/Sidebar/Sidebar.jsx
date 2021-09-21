import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import validator from "validator";
import classes from "./Sidebar.module.css";
import { useSelector } from "react-redux";

import newsletterRegister from "../../utils/newsletter";

import Category from "./Helper/Category";
import TagCloud from "./Helper/TagCloud";
import BlogList from "./Helper/BlogList";

import { HiOutlineCheckCircle } from "react-icons/hi";
import { BiErrorCircle } from "react-icons/bi";

const Sidebar = () => {
  const categoryData = useSelector((state) => state.essential.categories);
  const TagData = [
    {
      item: "Money",
      href: "www",
    },
    {
      item: "Travel",
      href: "www",
    },
    {
      item: "Business",
      href: "www",
    },
    {
      item: "Javascript",
      href: "www",
    },
    {
      item: "Nature",
      href: "www",
    },
    {
      item: "People",
      href: "www",
    },
    {
      item: "Code",
      href: "www",
    },
  ];
  const archieveData = [
    {
      href: "www",
      item: "December 2018",
      count: 12,
    },
    {
      href: "www",
      item: "March 2019",
      count: 8,
    },
    {
      href: "www",
      item: "November 2019",
      count: 2,
    },
    {
      href: "www",
      item: "May 2020",
      count: 20,
    },
    {
      href: "www",
      item: "February 2021",
      count: 3,
    },
  ];
  const [newsLetter, setNewsLetter] = useState("");
  const [newsLetterError, setNewsLetterError] = useState(false);

  const changeHandler = (event) => {
    setSubmitMessage({
      success: true,
      message: "",
    });
    setNewsLetter(event.target.value);
    if (!validator.isEmail(newsLetter)) {
      setNewsLetterError(true);
    } else {
      setNewsLetterError(false);
    }
  };
  const [submitMessage, setSubmitMessage] = useState({
    success: true,
    message: "",
  });
  const submitHandler = async () => {
    if (newsLetter.length === 0) {
      setNewsLetterError(true);
    } else {
      const { success, message } = await newsletterRegister(newsLetter);
      if (success) {
        setNewsLetter("");
      }
      setSubmitMessage({
        success,
        message,
      });
    }
  };

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidegrp + " " + classes.searchgrp}>
        <input
          type="text"
          className={classes.searchbar}
          placeholder="Type a keyword and enter"
        />
        <div className={classes.searchIcon}>
          <BiSearch />
        </div>
      </div>
      <Category heading="Categories" data={categoryData} />
      <BlogList />
      <TagCloud heading="Tag Cloud" data={TagData} />
      <div className={classes.newsletterGrp}>
        <h3 className={classes["news-heading"]}>Newsletter</h3>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia
        </p>
        <form action="">
          <div className={classes.newsContainer}>
            <input
              type="text"
              value={newsLetter}
              className={classes.newsInput}
              placeholder="E-mail Address"
              onChange={changeHandler}
            />
            <div className={classes.newsDivIcon}>
              {newsLetterError && (
                <BiErrorCircle className={classes.newsLetterIcon} />
              )}
              {!newsLetterError && newsLetter && (
                <HiOutlineCheckCircle className={classes.newsLetterIcon} />
              )}
            </div>
          </div>
          <p
            className={
              submitMessage.success
                ? classes.successMessage
                : classes.errorMessage
            }
          >
            {submitMessage.message}
          </p>
          <input
            type="button"
            value="Submit"
            disabled={newsLetterError}
            onClick={submitHandler}
            className={classes.newsSubmit}
          />
        </form>
      </div>
      <Category heading="Archives" data={archieveData} />
      <div className={classes.sidegrp}>
        <h3 className={classes["sidebar-heading"]}>About</h3>
        <p className={classes.aboutText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur velit
          asperiores quam totam perspiciatis laudantium et, corrupti facilis
          explicabo atque.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
