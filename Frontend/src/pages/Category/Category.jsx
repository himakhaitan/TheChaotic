import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { fetchByCategory } from "../../store/slice/blog";
import CategoryB from "./CategoryB/CategoryB";
import Spinner from "../../components/UI/Spinner/Spinner";

const Category = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const categories = useSelector((state) => state.blog.byCategory);
  const isFound = categories.find((element) => element.categoryID === id);
  let toBeRendering;
  if (!isFound) {
    toBeRendering = <Spinner />;
    dispatch(fetchByCategory(id));
  } else {
    toBeRendering = <CategoryB data={isFound.blogs} />;
  }
  return toBeRendering;
};
export default Category;
