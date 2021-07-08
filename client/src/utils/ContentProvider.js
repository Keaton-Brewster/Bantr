import { useState, createContext, useContext } from "react";

const mainContentContext = createContext();

export function useContentContext() {
  return useContext(mainContentContext);
}

export default function ContentProvider({ children }) {
  const [activeContent, setActiveContent] = useState("messaging");
  const [activeMenu, setActiveMenu] = useState("conversations");

  const value = { activeContent, setActiveContent, activeMenu, setActiveMenu };

  return (
    <mainContentContext.Provider value={value}>
      {children}
    </mainContentContext.Provider>
  );
}
