import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authState = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        authState.isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/admin/login" />
        )
      }
    ></Route>
  );
};
export default PrivateRoute;
