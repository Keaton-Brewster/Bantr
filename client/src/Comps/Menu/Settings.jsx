import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import DarkModeToggle from "react-dark-mode-toggle";
import useLocalStorage from "../../utils/useLocalStorage";
import { useThemes } from "../../utils/ThemeProvider";
import LGItem from "./LGItems";

export default function Settings() {
  //STATE
  //================================================================================
  const [user, setUser] = useLocalStorage("user", 0);
  const { theme, setTheme } = useThemes();

  //FUNCTIONS
  //================================================================================
  function logout(event) {
    event.preventDefault();
    setUser(0);
    window.location.href = "/";
  }

  function handleThemeToggle(isDarkMode) {
    if (isDarkMode) setTheme("dark");
    else if (!isDarkMode) setTheme("light");
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
            checked={theme === "dark" ? true : false}
            size={80}
          />
        </LGItem>
      </ListGroup>
    </>
  );
}
