import { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCategories } from "./store/slice/essential";
import { fetchSortedBlogs } from "./store/slice/blog";

// Pages
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Blog from "./pages/Blog/Blog";
import Tag from "./pages/Tags/Tag";

// Components
import Spinner from "./components/UI/Spinner/Spinner";

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
      <Suspense>
        <Switch>
          <Route path="/" component={Home} exact />
          {/* <Route path="/technology" component={CategoryA} exact /> */}
          {/* <Route path="/money" component={CategoryB} exact /> */}
          <Route path="/category/:id" component={Category} exact />
          <Route path="/tags/:tag" component={Tag} exact />
          <Route path="/blog/:blogID" component={Blog} exact />
          <Route path="/about" component={About} exact />
          <Route path="/contact" component={Contact} exact />
        </Switch>
      </Suspense>
      {isLoading && <Spinner />}
    </div>
  );
}

export default App;
