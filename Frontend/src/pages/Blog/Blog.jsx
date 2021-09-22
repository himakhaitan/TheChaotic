import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ThreeColUI from "../../components/UI/Structure/ThreeColUI";
import classes from "./Blog.module.css";
import axios from "axios";
import { useSelector } from "react-redux";
import variable from "../../config/variables";
import { useDispatch } from "react-redux";
import { essentialAction } from "../../store/slice/essential";
import toBase64String from "../../utils/toBase64String";
import { BsHeartFill } from "react-icons/bs";
import { BiCommentDots, BiCalendarAlt } from "react-icons/bi";
import {
  FaRegFolder,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import Tagcloud from "../../components/Sidebar/Helper/TagCloud";

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

const Blog = () => {
  const categories = useSelector((state) => state.essential.categories);
  const [data, setData] = useState({
    _id: "",
    title: "",
    content: "",
    image: {
      data: {
        type: "Buffer",
        data: [],
      },
      contentType: "",
    },
    likes: 0,
    published: Date.now(),
    comments: [],
    category: "",
    tags: [],

    author: {
      _id: "",
      name: "",
      socials: {},
      desc: "",
      profilePhoto: {
        data: {
          type: "Buffer",
          data: [],
        },
        contentType: "",
      },
    },
  });
  const { blogID } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(essentialAction.toggleSpinner());
    const fetching = async () => {
      const response = await axios.get(
        `${variable.serverURL}/blog/post/${blogID}`
      );
      if (!response.data.success) {
        alert(response.data.message);
      } else {
        setData(response.data.blog);
      }
    };
    fetching();
    dispatch(essentialAction.toggleSpinner());
  }, [blogID, dispatch]);
  const date = new Date(data.published);
  let cate = categories.find((item) => item.id === data.category);
  if (!cate) {
    cate = {};
    cate.item = " ";
    cate.id = "";
  }
  return (
    <ThreeColUI>
      <div className={classes.blogCont}>
        <img
          className={classes.blogImg}
          src={`data:${data.image.contentType};base64,${toBase64String(
            data.image.data.data
          )}`}
          alt={data.title}
        />
        <h3 className={classes.blogTitle}>{data.title}</h3>
        <div className={classes.insightBox}>
          <div className={classes.insight}>
            <div>
              <p className={classes.icon}>
                <BiCalendarAlt />
              </p>
              <p>
                {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
              </p>
            </div>
            <div>
              <p className={classes.icon}>
                <BsHeartFill />
              </p>
              <p>{data.likes + " Likes"}</p>
            </div>
            {/* <p className={classes.icon}>
              <BsEye />
            </p>
            <p>100 Views</p> */}
            <div>
              <p className={classes.icon}>
                <BiCommentDots />
              </p>
              <p>{data.comments.length + " Comments"}</p>
            </div>
            <div>
              <p className={classes.icon + " " + classes.category}>
                <FaRegFolder />
              </p>
              <p className={classes.category}>
                <Link to={`/category/${cate.id}`}> {cate.item}</Link>
              </p>
            </div>
          </div>
        </div>
        <p className={classes.blogTextContent}>{data.content}</p>
        <div className={classes.tags}>
          {" "}
          <Tagcloud array={data.tags} />
        </div>
        <div className={classes.writeDiv}>
          <div className={classes.writter}>
            <img
              src={`data:${
                data.author.profilePhoto.contentType
              };base64,${toBase64String(data.image.data.data)}`}
              alt={data.author.name}
            />
            <div className={classes.writterStats}>
              <p>Written By</p>
              <h5>
                <span>{data.author.name}</span>
              </h5>
            </div>
          </div>
          <div className={classes.authorSocial}>
            <FaFacebookF /> <FaGithub /> <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
    </ThreeColUI>
  );
};

export default Blog;
