import {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";
import { isMobile } from "react-device-detect";
import { useViewport } from "./ViewportProvider";
import reducer, { initialState } from "./Reducer";

const mainContentContext = createContext();

export function useContentContext() {
  return useContext(mainContentContext);
}

export default function ContentProvider({ children }) {
  //
  //* I know what I need to do to the state!
  // The thing to do is to set up a reducer that imports all the
  // components and renders them conditionally in their respective
  // places
  //
  //! I just had what I think might be the best way to handle contect state management.
  //! USE LOCAL STORAGE YOU DUMMY. You need to be able to keep track of what is going on for the user, what converstaion theyre on,
  //! what page theyre on, etc, and what better way to get around this than by using local storage.
  const { width, height } = useViewport();
  const [display, setDisplay] = useState(() => {
    if (isMobile) return { menu: true, mainContent: false };
    return { menu: true, mainContent: true };
  });
  const [activeContent, setActiveContent] = useState({
    conversations: true,
  });
  const [activeMenu, setActiveMenu] = useState({
    conversations: true,
  });

  // This handles the changes between mobile layout and desktop layout
  useEffect(() => {
    const { menu, mainContent } = display;

    if (!isMobile && (!menu || !mainContent)) {
      return setDisplay({
        menu: true,
        mainContent: true,
      });
    }
    if (isMobile && menu && mainContent) {
      return setDisplay({
        menu: true,
        mainContent: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const value = {
    activeContent,
    setActiveContent,
    activeMenu,
    setActiveMenu,
    display,
    setDisplay,
  };
  // const value = useReducer(reducer, initialState);
  return (
    <mainContentContext.Provider value={value}>
      {children}
    </mainContentContext.Provider>
  );
}
