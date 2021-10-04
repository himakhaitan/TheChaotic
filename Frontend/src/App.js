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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSortedBlogs("likes", 3));
    dispatch(fetchSortedBlogs("published", 10));
    dispatch(updateCategories());
  }, [dispatch]);

  const isLoading = useSelector((state) => state.essential.isLoading);
  return (
    <div className="home">
      <Navigation />
      <Suspense fallback={Spinner}>
        <Switch>
          <Route path="/" component={Home} exact />
          {/* <Route path="/technology" component={CategoryA} exact /> */}
          {/* <Route path="/money" component={CategoryB} exact /> */}
          <Route path="/category/:id" component={Category} exact />
          <Route path="/tags/:tag" component={Tag} exact />
          <Route path="/blog/:blogID" component={Blog} exact />
          <Route path="/about" component={About} exact />
          <PrivateRoute path="/contact" component={Contact} exact />
        </Switch>
      </Suspense>
      {isLoading && <Spinner />}
    </div>
  );
}

export default App;
