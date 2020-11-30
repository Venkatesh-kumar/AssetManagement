import {Switch,Route} from "react-router-dom";
import "materialize-css/dist/css/materialize.css"
import Home from "./pages/home"
import Asset from "./pages/asset"
import Login from "./pages/login"

function App() {
  return (
    <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/asset/:id" exact component={Asset}></Route>
        <Route path="/asset/login/:id" exact component={Login}></Route>
      </Switch>
  );
}

export default App;
