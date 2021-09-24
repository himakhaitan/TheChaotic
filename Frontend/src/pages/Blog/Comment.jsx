import classes from "./Comment.module.css";
import { BiNavigation } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { essentialAction } from "../../store/slice/essential";
import variable from "../../config/variables";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

function Com(props) {
  const date = new Date(props.item.date);
  return (
    <div key={props.item._id} className={classes.comment}>
      <p>
        {props.item.author} | {date.getDate()} {months[date.getMonth()]},{" "}
        {date.getFullYear()}
      </p>
      <p>{props.item.text}</p>
    </div>
  );
}

export default function Comment(props) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);
  const [comment, setComment] = useState();
  const changeHandler = (event) => {
    setComment(event.target.value);
  };
  const submitHandler = async () => {
    dispatch(essentialAction.toggleSpinner());
    const response = await axios.post(
      `${variable.serverURL}/blog/post/comment/${props.blogID}`,
      {
        comment: comment,
      }
    );
    console.log(response);
    if (!response.data.success) {
      alert(response.data.message);
    } else {
      setData(response.data.comments);
      setComment("");
    }
    dispatch(essentialAction.toggleSpinner());
  };
  return (
    <div className={classes.commentDiv}>
      <h4 className={classes.commentTitle}>Comment Section</h4>
      {data.map((item) => {
        return <Com item={item} />;
      })}
      <div className={classes.line}></div>
      <div className={classes.commentIn}>
        <input
          type="text"
          value={comment}
          onChange={changeHandler}
          placeholder="Write New Comment..."
          className={classes.commentInput}
        />
        <div className={classes.submit}>
          <BiNavigation onClick={submitHandler} />
        </div>
      </div>
    </div>
  );
}
