import ThreeColUI from "../../../components/UI/Structure/ThreeColUI";
import Pagination from "../../../components/UI/Pagination/Pagination";
import LayoutB from "../../../components/UI/LayoutB/LayoutB";
import classes from "./CategoryB.module.css";

const CategoryB = (props) => {
  return (
    <ThreeColUI>
      <div className={classes.mainContent}>
        {props.data.map((element, index) => {
          return <LayoutB key={index} data={element} />;
        })}
        <Pagination />
      </div>
    </ThreeColUI>
  );
};
export default CategoryB;
