import React from "react";
import ThreeColUI from "../../components/UI/Structure/ThreeColUI";
import LayoutA from "../../components/UI/LayoutA/LayoutA";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <ThreeColUI>
      <div className={classes.mainContent}>
        <LayoutA
          image_url={
            "https://images.pexels.com/photos/291732/pexels-photo-291732.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        />
        <LayoutA
          image_url={
            "https://images.pexels.com/photos/1210273/pexels-photo-1210273.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        />
      </div>
    </ThreeColUI>
  );
};

export default Home;
