import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Comps/Signup";
import Home from "./Comps/Home";
import useLocalStorage from "./utils/useLocalStorage";
import ConversationProvider from "./utils/ConversationProvider";
import ViewportProvider from "./utils/ViewportProvider";
import ContentProvider from "./utils/ContentProvider";
import ContactProvider from "./utils/ContactProvider";

function App() {
  const [user, setUser] = useLocalStorage("user", 0);
  const mutableUser = typeof user === "string" ? JSON.parse(user) : user;

  const checkForESC = (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    document.activeElement.blur();
  };

  //? On an application level I need to be checking if the users data has been updated in the data base everytime the app loads
  //? I also probably need to implement a better way to update the user

  // Basic functionality of like "hit esc - kill focus"
  useEffect(() => {
    document.addEventListener("keydown", checkForESC, false);

    return () => {
      document.removeEventListener("keydown", checkForESC, false);
    };
  });

  return (
    <ViewportProvider>
      <ContentProvider>
        <ConversationProvider user={mutableUser}>
          <ContactProvider user={mutableUser}>
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
          </ContactProvider>
        </ConversationProvider>
      </ContentProvider>
    </ViewportProvider>
  );
}

export default App;
