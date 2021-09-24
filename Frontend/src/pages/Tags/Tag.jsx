import CategoryB from "../Category/CategoryB/CategoryB";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import variable from "../../config/variables";

const Tag = () => {
  const [data, setData] = useState(null);
  let { tag } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${variable.serverURL}/blog/tags/${tag}`
      );
      if (!response.data.success) {
        alert(response.data.message);
      } else {
        setData(response.data.blogs);
      }
    };
    fetchData();
  }, [tag]);
  return (
    <Fragment>
      {!data && <Spinner />}
      {data && <CategoryB data={data}/>}
    </Fragment>
  );
};
export default Tag;
