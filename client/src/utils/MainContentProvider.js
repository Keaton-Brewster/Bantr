import { useState, createContext, useContext } from "react";

const mainContentContext = createContext();

export function useMainContent() {
  return useContext(mainContentContext);
}

export default function MainContentProvider({ children }) {
  const [activeContent, setActiveContent] = useState("messaging");

  const value = { activeContent, setActiveContent };

  return (
    <mainContentContext.Provider value={value}>
      {children}
    </mainContentContext.Provider>
  );
}
