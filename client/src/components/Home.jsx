import React from "react";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import { useUserContext } from "../utils/providers/UserProvider";
import "../components/Inputs/input.sass";

export default function Home() {
  const { user, setUser } = useUserContext();
  return <> {user ? <Dashboard user={user} /> : <Login setUser={setUser} />}</>;
}
