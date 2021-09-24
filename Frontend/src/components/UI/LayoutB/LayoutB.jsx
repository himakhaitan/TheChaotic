import React from "react";
import { useState } from "react";
import { likeAndUnlikeBlog } from "../../../store/slice/essential";
import { useDispatch } from "react-redux";
import classes from "./LayoutB.module.css";
import { BsHeartFill, BsEye } from "react-icons/bs";
import { BiCommentDots } from "react-icons/bi";
import { Link } from "react-router-dom";
import toBase64String from "../../../utils/toBase64String";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const LayoutB = (props) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const date = new Date(props.data.published);
  const likedFunc = () => {
    if (!liked) {
      dispatch(likeAndUnlikeBlog(props.data._id, true));
      setLiked(true);
    } else {
      dispatch(likeAndUnlikeBlog(props.data._id, false));
      setLiked(false);
    }
  };
  return (
    <div className={classes.blogCont}>
      <img
        src={`data:${props.data.image.contentType};base64,${toBase64String(
          props.data.image.data.data
        )}`}
        alt={props.data.title}
      />
      <h3>
        <Link to={`/blog/${props.data._id}`}>{props.data.title}</Link>
      </h3>
      <p className={classes.blogTextContent}>{props.data.content}</p>
      <div className={classes.writter}>
        <img
          src={`data:${
            props.data.author.profilePhoto.contentType
          };base64,${toBase64String(props.data.image.data.data)}`}
          alt={props.data.author.name}
        />
        <div className={classes.writterStats}>
          <p>Written By</p>
          <h5>
            <span>{props.data.author.name}</span>, {months[date.getMonth()]}{" "}
            {date.getDate()}, {date.getFullYear()}
          </h5>
        </div>
      </div>
      <div className={classes.blogUtils}>
        <button>
          <Link to={`/blog/${props.data._id}`}>Continue Reading</Link>
        </button>
        <div className={classes.insight}>
          <p className={`${classes.icon} ${liked && classes.liked}`}>
            <BsHeartFill onClick={likedFunc} className={classes.likeIcon} />
          </p>
          <p>
            {liked && props.data.likes + 1}
            {!liked && props.data.likes}
          </p>
          <p className={classes.icon}>
            <BsEye />
          </p>
          <p>100</p>
          <p className={classes.icon}>
            <BiCommentDots />
          </p>
          <p>{props.data.comments.length}</p>
        </div>
      </div>
    </div>
  );
};

export default LayoutB;
