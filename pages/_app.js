import React, { useEffect } from "react";
import ViewportProvider from "../lib/contexts/ViewportProvider";
import UserProvider from "../lib/contexts/UserProvider";
import ConversationProvider from "../lib/contexts/ConversationProvider";
import ContactProvider from "../lib/contexts/ContactProvider";
import UIProvider from "../lib/contexts/UIProvider";

import useLocalStorage from "../lib/hooks/useLocalStorage";
import ThemeProvider from "../lib/Theme/ThemeProvider";

function App({ Component, pageProps }) {
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
  }, []);

  //COMPONENT
  //================================================================================
  return <Component {...pageProps} />;
}

export default App;

{
  /* <UserProvider user={user} setUser={setUser}>
<ThemeProvider>
  <ViewportProvider>
    <UIProvider>
      <ConversationProvider>
        <ContactProvider></ContactProvider>
      </ConversationProvider>
    </UIProvider>
  </ViewportProvider>
</ThemeProvider>
</UserProvider> */
}
