import classes from './Pagination.module.css';
import { NavLink } from 'react-router-dom';
const Pagination = () => {
  return (
    <div className={classes.pagination}>
      <NavLink to="/23" className={classes.pageItem}>{"<"}</NavLink>
      <NavLink to="/23" className={`${classes.pageItem} ${classes.activePage}`}>1</NavLink>
      <NavLink to="/23" className={classes.pageItem}>2</NavLink>
      <NavLink to="/23" className={classes.pageItem}>3</NavLink>
      <NavLink to="/23" className={classes.pageItem}>4</NavLink>
      <NavLink to="/23" className={classes.pageItem}>5</NavLink>
      <NavLink to="/23" className={classes.pageItem}>{">"}</NavLink>
    </div>
  );
};
export default Pagination;