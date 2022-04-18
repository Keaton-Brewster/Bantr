import { useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

import { lightTheme, darkTheme } from "./Theme/themes";

export default function useTheme() {
  //STATE
  //================================================================================
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [themeName, setThemeName] = useState(theme);

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (themeName === "light") setTheme(lightTheme);
    else if (themeName === "dark") setTheme(darkTheme);

    return () => {
      setThemeName(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeName]);

  return [theme, setThemeName];
}
