import { useEffect, useState, useRef } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";
import "./signup.css";

export default function Signup() {
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

  function signup(e) {
    e.preventDefault();
    console.log("signed up!", formValues);
  }

  useEffect(() => {
    console.log(formValues);
  }, [formValues]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Form id="form" onSubmit={signup}>
          <h2>Sign up here to get started</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={emailRef}
              type="email"
              placeholder="Enter email"
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
