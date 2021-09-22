import React from "react";
import ThreeColUI from "../../components/UI/Structure/ThreeColUI";
import LayoutA from "../../components/UI/LayoutA/LayoutA";
import classes from "./Home.module.css";
import Pagination from "../../components/UI/Pagination/Pagination";
import { useSelector } from "react-redux";

const Home = () => {
  const home = useSelector((state) => state.blog.published);
  return (
    <ThreeColUI>
      <div className={classes.mainContent}>
        {home.map((item, index) => {
          return <LayoutA key={index} data={item} />;
        })}
        <Pagination />
      </div>
    </ThreeColUI>
  );
};

export default Home;
