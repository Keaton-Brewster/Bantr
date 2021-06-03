import { useState, useRef } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import API from "../../utils/API";
import "./login.css";

export default function Home() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleChange(e) {
    e.preventDefault();
    setFormValues({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }

  function login(e) {
    e.preventDefault();
    API.login(formValues)
      .then((response) => {
        window.location.href = "/home";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container id="login">
      <Row className="justify-content-center">
        <Form id="form" onSubmit={login}>
          <h2>Login</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={emailRef}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="float-right">
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
