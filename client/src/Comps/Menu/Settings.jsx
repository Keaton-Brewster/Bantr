import { Button } from "react-bootstrap";
import useLocalStorage from "../../utils/useLocalStorage";

export default function Settings() {
  const [user, setUser] = useLocalStorage("user", 0);

  function logout(event) {
    event.preventDefault();
    setUser(0);
    window.location.href = "/";
  }

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
