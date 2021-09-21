import classes from "./LayoutA.module.css";
import { BiCalendarAlt, BiFolder, BiCommentDetail } from "react-icons/bi";
import toBase64String from "../../../utils/toBase64String";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

const LayoutA = (props) => {
  const categories = useSelector((state) => state.essential.categories);
  const category = categories.find((item) => item.id === props.data.category);
  const date = new Date(props.data.published);
  return (
    <div className={classes.blogDiv}>
      <div className={classes.blogImg}>
        <img
          src={`data:${props.data.image.contentType};base64,${toBase64String(
            props.data.image.data.data
          )}`}
          alt={props.data.title}
        />
      </div>
      <div className={classes.blogDetails}>
        <h2>
          <Link to={`/blog/${props.data._id}`}>
            {props.data.title.substring(0, 40) + "..."}
          </Link>
        </h2>
        <div className={classes.blogMeta}>
          <div>
            <span>
              <BiCalendarAlt />
            </span>{" "}
            {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
          </div>
          <div className={classes.tagMeta}>
            <Link to={`${category.href}`}>
              <span>
                <BiFolder />
              </span>{" "}
              {category.item}
            </Link>
          </div>
          <div>
            <span>
              <BiCommentDetail />
            </span>{" "}
            {props.data.comments.length} Comments
          </div>
        </div>
        <p className={classes.blogText}>
          {props.data.content.substring(0, 100) + "..."}
        </p>
        <p className={classes.readMore}>
          <Link to={`/blog/${props.data._id}`}> Read More {">"}</Link>
        </p>
      </div>
    </div>
  );
};
export default LayoutA;
