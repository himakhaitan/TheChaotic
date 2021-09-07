import ThreeColUI from "../../components/UI/Structure/ThreeColUI";
import Pagination from "../../components/UI/Pagination/Pagination";
import LayoutB from "../../components/UI/LayoutB/LayoutB";
import classes from "./CategoryB.module.css";

const CategoryB = () => {
  return (
    <ThreeColUI>
      <div className={classes.mainContent}>
        <LayoutB />
        <LayoutB />
        <Pagination />
      </div>
    </ThreeColUI>
  );
};
export default CategoryB;
