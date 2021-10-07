import classes from "./page.module.css";
import TwoColUI from "../../components/UI/Structure/TwoColUI";
import img404 from "../../assets/404.png";
import { Link } from "react-router-dom";
const page404 = () => {
  return (
    <TwoColUI className={classes.main}>
      <div className={classes.img}>
        <img src={img404} alt="404 The Chaotic" />
      </div>
      <div className={classes.container}>
        <div className={classes.contain}>
          <h2>
            4<span>0</span>4!
          </h2>
          <h4>Page Not Found</h4>
          <div className={classes.button}>
            <Link to="/">Home Page</Link>
          </div>
          <p>Can't find the page you are looking for.</p>
        </div>
      </div>
    </TwoColUI>
  );
};

export default page404;
