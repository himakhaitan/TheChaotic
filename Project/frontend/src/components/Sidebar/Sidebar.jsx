import React from "react";
import { BiSearch } from "react-icons/bi";

import classes from "./Sidebar.module.css";

import Category from "./Helper/Category";
import TagCloud from "./Helper/TagCloud";
import BlogList from "./Helper/BlogList";

const Sidebar = () => {
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
  const categoryData = [
    {
      href: "www",
      item: "Fashion",
      count: 12,
    },
    {
      href: "www",
      item: "Technology",
      count: 8,
    },
    {
      href: "www",
      item: "Travel",
      count: 2,
    },
    {
      href: "www",
      item: "Money",
      count: 20,
    },
    {
      href: "www",
      item: "Photography",
      count: 3,
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
      <BlogList/>
      <TagCloud heading="Tag Cloud" data={TagData} />
      <div className={classes.newsletterGrp}>
        <h3 className={classes["news-heading"]}>Newsletter</h3>
        <p>
          Far far away, behind the word mountains, far from the countries
          Vokalia
        </p>
        <form action="">
          <input
            type="text"
            className={classes.newsInput}
            placeholder="E-mail Address"
          />
          <input type="submit" value="Submit" className={classes.newsSubmit} />
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
