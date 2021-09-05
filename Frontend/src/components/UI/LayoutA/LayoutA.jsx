import classes from "./LayoutA.module.css";

const LayoutA = (props) => {
  return (
    <div className={classes.blogDiv}>
      <div className={classes.blogImg}>
        <img src={props.image_url} alt="" />
      </div>
      <div className={classes.blogDetails}>
        <h2>
          <a href="hello"> Loving Heart is the Truest Wisdom</a>
        </h2>
        <div className={classes.blogMeta}>
          <div>
            <span>C</span> June 29, 2019
          </div>
          <div className={classes.tagMeta}>
            <a href="hello">
              <span>F</span> Travel
            </a>
          </div>
          <div>
            <span>C</span> 5 Comments
          </div>
        </div>
        <p className={classes.blogText}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi ratione
          suscipit necessitatibus nisi, repudiand.
        </p>
        <p className={classes.readMore}>
          <a href="##"> Read More {">"}</a>
        </p>
      </div>
    </div>
  );
};
export default LayoutA;
