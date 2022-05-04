import React from "react";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import { useUserContext } from "../lib/contexts/UserProvider";
// import "../Comps/Inputs/input.sass";

export default function Home() {
  const { user, setUser } = useUserContext();
  return <> {user ? <Dashboard user={user} /> : <Login setUser={setUser} />}</>;
}
