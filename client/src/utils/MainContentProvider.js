import React from "react";

const MainContentContext = React.createContext();

export function useMainContentControls() {
  return React.useContext(MainContentContext);
}

export default function MainContentProvider({ children }) {
  const [currentDisplay, setCurrentDisplay] = React.useState("conversation");
  const value = {};
  return <MainContentContext.Provider>{children}</MainContentContext.Provider>;
}
