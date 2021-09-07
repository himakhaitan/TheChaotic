import classes from "./About.module.css";
import TwoColUI from "../../components/UI/Structure/TwoColUI";
import myImg from "../../assets/PSX_20210409_200544.jpg";
import { ImInstagram } from "react-icons/im";
import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";

const About = (props) => {
  return (
    <TwoColUI className={classes.main}>
      <div className={classes.aboutImg}>
        <img src={myImg} alt="" />
      </div>
      <div className={classes.aboutContent}>
        <div>
          <h2>
            I'm <span>Himanshu Khaitan</span>, a Passionate Developer & Trader
          </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
            maxime neque doloremque maiores sequi, iure numquam. Quo odit iure,
            voluptates quaerat non sunt maxime sit aspernatur, harum ea, maiores
            accusamus.
          </p>
          <div className={classes.socials}>
            <a rel="noreferrer" target="_blank"  href="https://www.instagram.com/hima_khaitan/">
              <ImInstagram />
            </a>
            <a rel="noreferrer" target="_blank"  href="https://github.com/himakhaitan">
             <FaGithub/>
            </a>
            <a rel="noreferrer" target="_blank"  href="https://www.linkedin.com/in/himanshu-khaitan-431666204/">
              <FaLinkedin />
            </a>
            <a rel="noreferrer" target="_blank" href="https://dev.to/hima_khaitan">
              <FaDev />
            </a>
          </div>
        </div>
      </div>
    </TwoColUI>
  );
};
export default About;
