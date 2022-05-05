import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import { useAppContext } from "../lib/providers/AppProvider";
// import "../Comps/Inputs/input.sass";

export default function Home() {
  const { state } = useAppContext();
  const { user } = state;
  return <> {user ? <Dashboard user={user} /> : <Login />}</>;
}
