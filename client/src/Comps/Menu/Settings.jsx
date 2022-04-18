import React, { useEffect } from "react";
import useLocalStorage from "../../utils/useLocalStorage";
import { useThemes } from "../../utils/ThemeProvider";

import { Button, ListGroup } from "react-bootstrap";
import LGItem from "./LGItem";
import DarkModeToggle from "react-dark-mode-toggle";

import { lightTheme, darkTheme } from "../../utils/Theme/themes";

export default function Settings() {
  //STATE
  //================================================================================
  const [user, setUser] = useLocalStorage("user", 0);
  const [theme, setTheme] = useThemes();

  //FUNCTIONS
  //================================================================================
  function logout(event) {
    event.preventDefault();
    setUser(0);
    window.location.href = "/";
  }

  function handleThemeToggle(isLightMode) {
    if (isLightMode) setTheme(darkTheme);
    else if (!isLightMode) setTheme(lightTheme);
  }

  //EFFECTS
  //================================================================================

  //COMPONENT
  //================================================================================
  return (
    <>
      <ListGroup>
        <LGItem className="LGItem text-center" BGTransition>
          <Button onClick={logout}>Logout</Button>
        </LGItem>
        <LGItem className="LGItem" BGTransition>
          <span>App Theme </span>
          <DarkModeToggle
            onChange={handleThemeToggle}
            checked={theme.name === "dark" ? true : false}
            size={80}
          />
        </LGItem>
      </ListGroup>
    </>
  );
}
