/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect } from "react";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserProvider({ user, setUser, children }) {
  const value = {
    user,
    setUser,
  };

  useEffect(() => {
    // For some reason, the user useLocalStorage hook fails to return a parsed version. 
    // So i am running a double check here. Hopefully this doesn't cause future issues..
    if (typeof user === "string") setUser(JSON.parse(user));
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
