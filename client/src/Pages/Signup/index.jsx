import { useState, useRef } from "react";
import { Container, Row, Form, Button, Spinner } from "react-bootstrap";
import API from "../../utils/API";
import "./signup.css";

export default function Signup() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const nameRef = useRef();

  function handleChange(e) {
    e.preventDefault();
    setFormValues({
      name: nameRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  }

  function signup(e) {
    e.preventDefault();
    API.signup(formValues).then((response) => {
      console.log(response);
      window.location.href = "/login";
    });
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Form id="form" onSubmit={signup}>
          <h2>Sign up here to get started</h2>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={nameRef}
              placeholder="Name"
              type="name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={phoneRef}
              type="number"
              placeholder="Phone number"
            />
          </Form.Group>
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
