import TwoColUI from "../../components/UI/Structure/TwoColUI";
import LayoutA from "../../components/UI/LayoutA/LayoutA";
import Pagination from "../../components/UI/Pagination/Pagination";

const CategoryA = () => {
  return (
    <TwoColUI>
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
      <Pagination/>
    </TwoColUI>
  );
};

export default CategoryA;
