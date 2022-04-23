import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ViewportProvider from "./utils/ViewportProvider";
import UserProvider from "./utils/UserProvider";
import ConversationProvider from "./utils/ConversationProvider";
import ContactProvider from "./utils/ContactProvider";
import UIProvider from "./utils/UIProvider";

import useLocalStorage from "./utils/useLocalStorage";
import ThemeProvider from "./utils/Theme/ThemeProvider";

import Home from "./Comps/Home";
import Signup from "./Comps/Signup";

function App() {
  // I need a better way to handle the updating of user information
  // if a conversation, contact, or message is added/deleted
  // I need an effect that will listen for that and call the db to update the user
  //  witihin the app accordingly. Right now, after reseting the database,
  // all the contacts are still stored on the user in local storage which is fine,
  // but like i said, just need an update effect so that if things change on the db
  // side, it is reflected in the browser siede

  //STATE
  //================================================================================
  const [user, setUser] = useLocalStorage("user", 0);

  //FUNCTIONS
  //================================================================================
  const checkForESC = (event) => {
    if (event.key !== "Escape") return;
    event.preventDefault();
    document.activeElement.blur();
  };

  //EFFECTS
  //================================================================================
  // Basic functionality of "hit esc - kill focus"
  useEffect(() => {
    document.addEventListener("keydown", checkForESC, false);

    return () => {
      document.removeEventListener("keydown", checkForESC, false);
    };
  });

  //COMPONENT
  //================================================================================
  return (
    <UserProvider user={user} setUser={setUser}>
      <ThemeProvider>
        <ViewportProvider>
          <UIProvider>
            <ConversationProvider>
              <ContactProvider>
                <Router>
                  <Switch>
                    <Route exact path="/signup">
                      <Signup />
                    </Route>
                    <Route exact path="/">
                      <Home />
                    </Route>
                  </Switch>
                </Router>
              </ContactProvider>
            </ConversationProvider>
          </UIProvider>
        </ViewportProvider>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
