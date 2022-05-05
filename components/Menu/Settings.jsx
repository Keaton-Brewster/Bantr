import React from "react";
import { useAppContext } from "../../lib/providers/AppProvider";
import { useThemes } from "../../lib/Theme/ThemeProvider";
import { firebaseLogout } from "../../lib/firebase";

import { Button, ListGroup } from "react-bootstrap";
import LGItem from "./LGItem";
import DarkModeToggle from "react-dark-mode-toggle";

export default function Settings() {
  //STATE
  //================================================================================
  const { dispatch } = useAppContext();
  const [theme, setTheme] = useThemes();

  //FUNCTIONS
  //================================================================================
  function logout(event) {
    event.preventDefault();
    dispatch({ type: "set_user", payload: 0 });
    firebaseLogout();
    window.location.href = "/";
  }

  function handleThemeToggle(isLightMode) {
    if (isLightMode) setTheme("dark");
    else if (!isLightMode) setTheme("light");
  }

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
