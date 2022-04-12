import React from "react";
import Dashboard from "../Comps/Dashboard";
import Login from "../Comps/Login";
import { useUserContext } from "../utils/UserProvider";
import "../Comps/Inputs/input.sass";

export default function Home() {
  const { user, setUser } = useUserContext();
  return <> {user ? <Dashboard user={user} /> : <Login setUser={setUser} />}</>;
}
