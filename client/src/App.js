import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import useLocalStorage from "./utils/useLocalStorage";
import { Provider } from "./utils/ConversationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function App() {
  const [user, setUser] = useLocalStorage("user", 0);
  let mutableUser = typeof user === "string" ? JSON.parse(user) : user;

  return (
    <Provider user={mutableUser}>
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
