import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import useLocalStorage from "./utils/useLocalStorage";
import { Provider } from "./utils/ConvorsationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [user, setUser] = useLocalStorage("user", null);

  return (
    <Provider id={user._id}>
      <Router>
        <Switch>
          <Route exact path="/signup">
            <Signup setUser={setUser} />
          </Route>
          <Route exact path="/">
            <Home localStorage={[user, setUser]} />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
