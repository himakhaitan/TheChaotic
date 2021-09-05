import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import ThreeColUI from "./components/UI/Structure/ThreeColUI";

function App() {
  return (
    <div className="home">
      <Navigation />
      <ThreeColUI>
        <h1>Hello World</h1>
      </ThreeColUI>
    </div>
  );
}

export default App;
