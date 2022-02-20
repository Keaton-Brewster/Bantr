import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Comps/Signup";
import Home from "./Comps/Home";
import useLocalStorage from "./utils/useLocalStorage";
import ViewportProvider from "./utils/ViewportProvider";
import UserProvider from "./utils/UserProvider";
import ConversationProvider from "./utils/ConversationProvider";
import ContactProvider from "./utils/ContactProvider";
import UIProvider from "./utils/UIProvider";

function App() {
  const [user, setUser] = useLocalStorage("user", 0);

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
    <UserProvider user={user} setUser={setUser}>
      <ViewportProvider>
        <UIProvider>
          <ConversationProvider>
            <ContactProvider>
              <Router>
                <Switch>
                  <Route exact path="/signup">
                    <Signup/>
                  </Route>
                  <Route exact path="/">
                    <Home/>
                  </Route>
                </Switch>
              </Router>
            </ContactProvider>
          </ConversationProvider>
        </UIProvider>
      </ViewportProvider>
    </UserProvider>
  );
}

export default App;
