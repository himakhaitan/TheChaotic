import ThreeColUI from "../../components/UI/Structure/ThreeColUI";
import classes from "./Blog.module.css";
import { useSelector, useDispatch } from "react-redux";
import toBase64String from "../../utils/toBase64String";
import { BsHeartFill } from "react-icons/bs";
import { BiCommentDots, BiCalendarAlt } from "react-icons/bi";
import Comment from "./Comment";
import {
  FaRegFolder,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaFacebookF,
} from "react-icons/fa";
import { likeAndUnlikeBlog } from "../../store/slice/essential";
import { useState } from "react";
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
const Helper = (props) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  let data = props.data;
  const categories = useSelector((state) => state.essential.categories);
  let date = new Date(data.published);
  let cate = categories.find((item) => item.id === data.category);
  const likedFunc = () => {
    if (!liked) {
      dispatch(likeAndUnlikeBlog(data._id, true));
      data.likes++;
      setLiked(true);
    } else {
      dispatch(likeAndUnlikeBlog(data._id, false));
      data.likes--;
      setLiked(false);
    }
  };
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
              <p className={`${classes.icon} ${liked && classes.liked}`}>
                <BsHeartFill onClick={likedFunc} className={classes.likeIcon} />
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
                <Link to={`/category/${cate.id}`}>{cate.item}</Link>
              </p>
            </div>
          </div>
        </div>
        <p className={classes.blogTextContent}>{data.content}</p>
        <div className={classes.tags}>
          <Tagcloud array={data.tags} />
        </div>
        {/* Comment Section */}
        <Comment data={data.comments} blogID={data._id} />
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
            <a
              target="_blank"
              rel="noreferrer"
              href={data.author.socials.facebook || null}
            >
              <FaFacebookF />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={data.author.socials.github || null}
            >
              <FaGithub />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={data.author.socials.instagram || null}
            >
              <FaInstagram />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={data.author.socials.linkedin || null}
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </ThreeColUI>
  );
};

export default Helper;
