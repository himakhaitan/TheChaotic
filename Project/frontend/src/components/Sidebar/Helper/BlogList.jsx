import React from "react";
import { BiCommentDetail, BiUser, BiCalendarAlt } from "react-icons/bi";

import classes from "./BlogList.module.css";

export default function BlogList() {
  const data = [
    {
      imgSrc:
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      imgAlt: "Hello",
      articleLink: "www",
      title: "Even the all- powerful Pointing has no control",
      date: "June 28, 2019",
      author: "Himanshu",
      commentCount: 19,
    },
    {
      imgSrc:
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      imgAlt: "Hello",
      articleLink: "www",
      title: "Even the all- powerful Pointing has no control",
      date: "June 28, 2019",
      author: "Himanshu",
      commentCount: 19,
    },
    {
      imgSrc:
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      imgAlt: "Hello",
      articleLink: "www",
      title: "Even the all- powerful Pointing has no control",
      date: "June 28, 2019",
      author: "Himanshu",
      commentCount: 19,
    },
  ];
  return (
    <div className={classes.sidegrp}>
      <h3 className={classes["sidebar-heading"]}>Popular Articles</h3>
      <ul className={classes.articleGrp}>
        {data.map((element, index) => {
          return (
            <li key={index}>
              <div className={classes.articleImg}>
                <img src={element.imgSrc} alt={element.imgAlt} />
              </div>
              <div className={classes.articleContent}>
                <h3 className={classes.articleHead}>
                  <a href={element.articleLink}>{element.title}</a>
                </h3>
                <div className={classes.articleMeta}>
                  <div>
                    <p>
                      <span>
                        <BiCalendarAlt />
                      </span>
                      {element.date}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>
                        <BiUser />
                      </span>{" "}
                      {element.author}
                    </p>
                  </div>
                  <div>
                    <p>
                      <span>
                        <BiCommentDetail />
                      </span>{" "}
                      {element.commentCount}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
