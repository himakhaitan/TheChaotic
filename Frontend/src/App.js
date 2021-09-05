import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="home">
      <Navigation />
      <Suspense>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
