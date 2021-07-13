import { Button, ListGroup } from "react-bootstrap";
import useLocalStorage from "../../utils/useLocalStorage";

export default function Settings() {
  const [user, setUser] = useLocalStorage("user", 0);

  function logout(event) {
    event.preventDefault();
    setUser(0);
    window.location.href = "/";
  }

  return (
    <>
      <ListGroup>
        <ListGroup.Item className="text-center">
          <Button onClick={logout}>Logout</Button>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
}
