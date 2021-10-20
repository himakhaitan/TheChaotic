import { useState } from "react";
import classes from "./AdminLogin.module.css";
import TwoColUI from "../../components/UI/Structure/TwoColUI";
import { FcGoogle } from "react-icons/fc";
import { FaUserCircle, FaUnlockAlt, FaGithub } from "react-icons/fa";
import myImg from "../../assets/imgs.jpg";
import axios from "axios";
import variables from "../../config/variables";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../store/slice/auth";
import { essentialAction } from "../../store/slice/essential";

const Admin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPassChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(essentialAction.toggleSpinner());
    const data = {
      email,
      password,
    };
    const response = await axios.post(
      `${variables.serverURL}/authentication/login`,
      data
    );
    console.log(response);
    if (response.data.success) {
      dispatch(
        AuthActions.login({
          token: response.data.token,
        })
      );
    } else {
      alert(response.data.message);
    }
    dispatch(essentialAction.toggleSpinner());
  };
  return (
    <TwoColUI className={classes.main}>
      <div className={classes.Img}>
        <img src={myImg} alt="" />
      </div>
      <div className={classes.container}>
        <div className={classes.logo}>
          <span className={classes.headSpan}>Let's</span>
          <span className={classes.headSpan}>Get Started</span>
        </div>
        <div className={classes.inputGrp}>
          <div className={classes.icon}>
            <FaUserCircle />
          </div>
          <input
            onChange={onEmailChange}
            value={email}
            placeholder="E-mail"
            className={classes.formInput}
            type="text"
          />
        </div>
        <div className={classes.inputGrp}>
          <div className={classes.icon}>
            <FaUnlockAlt />
          </div>
          <input
            onChange={onPassChange}
            value={password}
            placeholder="Password"
            className={classes.formInput}
            type="password"
          />
        </div>
        <div onClick={submitHandler} className={classes.submit}>
          <div className={classes.submitButton}>Login</div>
        </div>
        <p className={classes.or}>--- or ---</p>
        <div className={classes.socialLogins}>
          <div className={classes.gbutton + " " + classes.button}>
            <div className={classes.primDiv + " " + classes.gDiv}>
              <FcGoogle className={classes.google} />
            </div>
            <div className={classes.secoDiv}>Sign in with Google</div>
          </div>
          <div className={classes.gitbutton + " " + classes.button}>
            <div className={classes.primDiv + " " + classes.gitDiv}>
              <FaGithub className={classes.google} />
            </div>
            <div className={classes.secoDiv}>Sign in with GitHub</div>
          </div>
        </div>
      </div>
    </TwoColUI>
  );
};

export default Admin;
