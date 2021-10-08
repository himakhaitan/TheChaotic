import classes from "./Input.module.css";
import { MdError } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

const LargeInput = (props) => {
  return (
    <div className={classes.inputGrp}>
      <label htmlFor={props.id}>{props.label}</label>
      <p>:</p>
      <div className={classes.mainGrp}>
        <textarea
          id={props.id}
          rows={props.rows}
          className={classes.simpleInput}
          type={props.type || "text"}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
        />
        {!props.error && props.value.length !== 0 && (
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
};

export default LargeInput;
