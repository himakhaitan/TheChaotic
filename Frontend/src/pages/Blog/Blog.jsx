import React from "react";
import { useParams } from "react-router";
import ThreeColUI from "../../components/UI/Structure/ThreeColUI";
import classes from "./Blog.module.css";

const Blog = () => {
  const { blogID } = useParams();
  return (
    <ThreeColUI>
      <div className={classes.mainContent}>
        <h1>{blogID}</h1>
      </div>
    </ThreeColUI>
  );
};

export default Blog;
