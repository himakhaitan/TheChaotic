// import { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { essentialAction } from "./store/slice/essential";

// Pages
import Home from "./pages/Home/Home";
import CategoryA from "./pages/CategoryA/CategoryA";
import CategoryB from "./pages/CategoryB/CategoryB";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

// Components
import Spinner from "./components/UI/Spinner/Spinner";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(essentialAction.fetchCategories());
  // }, [dispatch]);
  const isLoading = useSelector((state) => state.essential.isLoading);
  return (
    <div className="home">
      <Navigation />
      <Suspense>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/technology" component={CategoryA} exact />
          <Route path="/money" component={CategoryB} exact />
          <Route path="/about" component={About} exact />
          <Route path="/contact" component={Contact} exact />
        </Switch>
      </Suspense>
      {isLoading && <Spinner />}
    </div>
  );
}

export default App;
