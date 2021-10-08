import classes from "./Input.module.css";
import { MdError } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

export default function FileInput(props) {
  return (
    <div className={classes.inputGrp}>
      <label htmlFor={props.id}>{props.label}</label>
      <p>:</p>
      <div className={classes.mainGrp}>
        <input
          id={props.id}
          accept={props.accept}
          className={classes.simpleInput}
          type="file"
          onChange={props.onChange}
        />
        {!props.error && (props.value !== null) && (
          <div className={classes.cicon}>
            <FaRegCheckCircle />
          </div>
        )}
        {props.error && (
          <div className={classes.icon}>
            <MdError />
            <p className={classes.error}>{props.errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
