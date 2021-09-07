import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import CategoryA from "./pages/CategoryA/CategoryA";

function App() {
  return (
    <div className="home">
      <Navigation />
      <Suspense>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/technology" component={CategoryA} exact />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
