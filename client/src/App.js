import { Route, Switch } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import NoMatch from "./components/NoMatch";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Issue from "./pages/Issue";
import LandingPage from "./pages/LandingPage";
import Wall from "./pages/Wall";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute exact path="/wall/:_id" component={Wall} />
        <ProtectedRoute exact path="/issue/:_id" component={Issue} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
