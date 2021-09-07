import TwoColUI from "../../components/UI/Structure/TwoColUI";
import classes from "./Contact.module.css";
import { ImInstagram } from "react-icons/im";
import { FaGithub, FaLinkedin, FaDev } from "react-icons/fa";

const Contact = () => {
  return (
    <TwoColUI className={classes.main}>
      <div className={classes.mainPrimary}>
        <div className={classes.mainLeft}>
          <h3>Get In Touch</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
            dolorem voluptatem quod nulla temporibus obcaecati illum consectetur
            commodi in facilis!
          </p>

          <div className={classes.socials}>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.instagram.com/hima_khaitan/"
            >
              <ImInstagram />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://github.com/himakhaitan"
            >
              <FaGithub />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/himanshu-khaitan-431666204/"
            >
              <FaLinkedin />
            </a>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://dev.to/hima_khaitan"
            >
              <FaDev />
            </a>
          </div>
        </div>
        <div className={classes.mainRight}>
          <h3>Say Something</h3>
          <form action="">
            <input
              className={classes.formInput}
              type="text"
              id="name"
              placeholder="Name"
            />
            <input
              className={classes.formInput}
              type="email"
              placeholder="E-mail Address"
            />
            <input
              className={classes.formInput}
              //   type="text"
              type="textArea"
              placeholder="Your Message"
            />
            <input className={classes.submit} type="submit" value="Submit" />
          </form>
        </div>
      </div>
      <div className={classes.mainSecondary}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, doloribus?
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem soluta
        nisi numquam vel illum dolorem? Libero totam assumenda fugiat earum?
      </div>
    </TwoColUI>
  );
};
export default Contact;
