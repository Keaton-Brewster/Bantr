import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { CometChatUI } from "./CometChatWorkspace/src";
import useLocalStorage from "./utils/useLocalStorage";
import ConversationProvider from "./utils/ConversationProvider";
import ViewportProvider from "./utils/ViewportProvider";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./index.css";

function App() {
  const [user, setUser] = useLocalStorage("user", 0);
  const mutableUser = typeof user === "string" ? JSON.parse(user) : user;

  return (
    <ConversationProvider user={mutableUser}>
      <ViewportProvider>
        <CometChatUI friendsOnly style={{ height: "100%" }} />
        {/* <Router>
          <Switch>
            <Route exact path="/signup">
              <Signup setUser={setUser} />
            </Route>
            <Route exact path="/">
              <Home localStorage={[user, setUser]} />
            </Route>
          </Switch>
        </Router> */}
      </ViewportProvider>
    </ConversationProvider>
  );
}

export default App;
