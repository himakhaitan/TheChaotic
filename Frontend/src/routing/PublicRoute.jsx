import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import isAuthenticated from "../utils/isAuthenticated";

const PublicRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated(authState) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/dashboard" />
        )
      }
    ></Route>
  );
};
export default PublicRoute;
