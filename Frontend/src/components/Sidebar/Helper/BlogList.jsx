import React from "react";
import { BiCommentDetail, BiUser, BiCalendarAlt } from "react-icons/bi";
import { useSelector } from "react-redux";
import toBase64String from "../../../utils/toBase64String";
import classes from "./BlogList.module.css";
import { Link } from "react-router-dom";
const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Sept",
  "October",
  "Nov",
  "Dec",
];
const Card = (props) => {
  const date = new Date(props.element.published);
  return (
    <li key={props.index}>
      <div className={classes.articleImg}>
        <img
          src={`data:${props.element.image.contentType};base64,${toBase64String(
            props.element.image.data.data
          )}`}
          alt={props.element.title}
        />
      </div>
      <div className={classes.articleContent}>
        <h3 className={classes.articleHead}>
          <Link to={`/blog/${props.element._id}`}>
            {props.element.title.substring(0, 38) + "..."}
          </Link>
        </h3>
        <div className={classes.articleMeta}>
          <div>
            <p>
              <span>
                <BiCalendarAlt />
              </span>
              {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
            </p>
          </div>
          <div>
            <p>
              <span>
                <BiUser />
              </span>{" "}
              {props.element.author.name.substring(0, 8)}
            </p>
          </div>
          <div>
            <p>
              <span>
                <BiCommentDetail />
              </span>{" "}
              {props.element.comments.length}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default function BlogList() {
  const popular = useSelector((state) => state.blog.likes);
  return (
    <div className={classes.sidegrp}>
      <h3 className={classes["sidebar-heading"]}>Popular Articles</h3>
      <ul className={classes.articleGrp}>
        {popular.map((element, index) => {
          return <Card element={element} index={index} />;
        })}
      </ul>
    </div>
  );
}
