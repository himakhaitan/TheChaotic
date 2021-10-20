import { useEffect } from "react";
import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCategories } from "./store/slice/essential";
import { fetchSortedBlogs } from "./store/slice/blog";
import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { AuthActions } from "./store/slice/auth";

// Pages
import Home from "./pages/Home/Home";

// Components
import Spinner from "./components/UI/Spinner/Spinner";

// Lazy Loading
const Category = React.lazy(() => import("./pages/Category/Category"));
const Contact = React.lazy(() => import("./pages/Contact/Contact"));
const Tag = React.lazy(() => import("./pages/Tags/Tag"));
const Blog = React.lazy(() => import("./pages/Blog/Blog"));
const About = React.lazy(() => import("./pages/About/About"));
const AdminLogin = React.lazy(() => import("./pages/AdminLogin/AdminLogin"));
const Dashboard = React.lazy(() => import("./pages/Dashboard/Dashboard"));
const page404 = React.lazy(() => import("./pages/404/404"));

function App() {
  const dispatch = useDispatch();

  if (localStorage.jwtToken) {
    // SET Auth Token
    axios.defaults.headers.common["Authorization"] = localStorage.jwtToken;
    dispatch(
      AuthActions.login({
        token: localStorage.jwtToken,
      })
    );
    const decoded = jwt_decode(localStorage.jwtToken);
    // Check for Expire Token
    const currentTime = Date.now() / 1000;
    if (decoded.exp <= currentTime) {
      // Logout User
      dispatch(AuthActions.logout());
      // Redirect to Login
      window.location.href = "/admin/login";
    }
  }

  useEffect(() => {
    dispatch(fetchSortedBlogs("likes", 3));
    dispatch(fetchSortedBlogs("published", 10));
    dispatch(updateCategories());
  }, [dispatch]);

  const isLoading = useSelector((state) => state.essential.isLoading);
  return (
    <div className="home">
      <Navigation />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" component={Home} exact />
          {/* <Route path="/technology" component={CategoryA} exact /> */}
          {/* <Route path="/money" component={CategoryB} exact /> */}
          <Route path="/category/:id" component={Category} exact />
          <Route path="/tags/:tag" component={Tag} exact />
          <Route path="/blog/:blogID" component={Blog} exact />
          <Route path="/about" component={About} exact />
          <Route path="/contact" component={Contact} exact />
          <PublicRoute path="/admin/login" component={AdminLogin} exact />
          <PrivateRoute path="/admin/dashboard" component={Dashboard} />
          <Route path="*" component={page404} />
        </Switch>
      </Suspense>
      {isLoading && <Spinner />}
    </div>
  );
}

export default App;
