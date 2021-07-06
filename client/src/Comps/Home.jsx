import React from "react";
import Dashboard from "../Comps/Dashboard";
import Login from "../Comps/Login";

export default function Home({ localStorage }) {
  const [user, setUser] = localStorage;
  return (
    <> {user ? <Dashboard user={user} /> : <Login onLoginSubmit={setUser} />}</>
  );
}
