import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import variable from "../../config/variables";

import Spinner from "../../components/UI/Spinner/Spinner";
import Helper from "./Helper";

const Blog = () => {
  const [data, setData] = useState(null);
  let { blogID } = useParams();
  useEffect(() => {
    const fetching = async () => {
      const response = await axios.get(
        `${variable.serverURL}/blog/post/${blogID}`
      );
      if (!response.data.success) {
        alert(response.data.message);
      } else {
        setData(response.data.blog);
      }
    };
    fetching();
  }, [blogID]);

  return (
    <Fragment>
      {!data && <Spinner />}
      {data && <Helper data={data} />}
    </Fragment>
  );
};

export default Blog;
