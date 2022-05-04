import { useEffect } from "react";
import ThemeProvider from "../lib/Theme/ThemeProvider";
import UserProvider from "../lib/contexts/UserProvider";
import UIProvider from "../lib/contexts/UIProvider";
import ConversationProvider from "../lib/contexts/ConversationProvider";
import ViewportProvider from "../lib/contexts/ViewportProvider";
import useLocalStorage from "../components/hooks/useLocalStorage";

function MyApp({ Component, pageProps }) {
  //STATE
  //================================================================================
  useEffect(() => {
    const [user, setUser] = useLocalStorage("user", 0);
  }, []);

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

  //RENDER
  //================================================================================
  return (
    <>
      <UserProvider user={user} setUser={setUser}>
        <ConversationProvider>
          <ViewportProvider>
            <UIProvider>
              <ThemeProvider theme={theme}>
                <Component {...pageProps} />
              </ThemeProvider>
            </UIProvider>
          </ViewportProvider>
        </ConversationProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
