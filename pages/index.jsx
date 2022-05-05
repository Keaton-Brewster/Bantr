import { useAppContext } from "../lib/providers/AppProvider";

import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

import "../components/Inputs/input.module.sass";


export default function Home() {
  const { state } = useAppContext();
  const { user } = state;
  return <> {user ? <Dashboard user={user} /> : <Login />}</>;
}
