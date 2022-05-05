import { useEffect } from "react";
import AppProvider from "../lib/providers/AppProvider";
import ThemeProvider from "../lib/Theme/ThemeProvider";
import UIProvider from "../lib/providers/UIProvider";
import ConversationProvider from "../lib/providers/ConversationProvider";
import ViewportProvider from "../lib/providers/ViewportProvider";

function MyApp({ Component, pageProps }) {
  //STATE
  //================================================================================

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
      <AppProvider>
        <ConversationProvider>
          <ViewportProvider>
            <UIProvider>
              <ThemeProvider>
                <Component {...pageProps} />
                hello world
              </ThemeProvider>
            </UIProvider>
          </ViewportProvider>
        </ConversationProvider>
      </AppProvider>
    </>
  );
}

export default MyApp;
