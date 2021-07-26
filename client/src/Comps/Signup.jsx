import { useState, useRef } from "react";
import GoogleLogin from "react-google-login";
import { Container, Row, Form } from "react-bootstrap";
import PasswordValidator from "password-validator";
import API from "../utils/API";

// Not working
//! import "./signupLoginBackground.css";

const schema = new PasswordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

export default function Signup({ setUser }) {
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

    if (!schema.validate(formValues.password)) {
      alert(
        "Your password must be at lest 8 characters long, cannot contain spaces, and must include one number"
      );
      return;
    }

    API.signup(formValues)
      .then((response) => response.data)
      .then((user) => {
        console.log(user);
        const userToStore = JSON.stringify(user);
        setUser(userToStore);
        window.location.href = "/";
      })
      .catch((error) => {
        alert("That user already exists");
        console.log(error);
      });
  }

  const responseGoogle = (response) => {
    const { tokenObj, profileObj } = response;
    const { email, familyName, givenName, imageUrl } = profileObj;
    const id = tokenObj.id_token.slice(0, 50);
    console.log(email, familyName, givenName, imageUrl);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Form id="form" onSubmit={signup} className="text-center">
          <h2>Sign up here to get started</h2>
          <h5>
            {/* Need to make this font not bold */}
            Because we want to keep your information as safe as possible, please
            use your Google account to sign up
          </h5>
          {/* <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={nameRef}
              placeholder="Name"
              type="name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={phoneRef}
              type="number"
              placeholder="Phone number"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={emailRef}
              type="email"
              placeholder="Email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              ref={passwordRef}
              type="password"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="float-right">
            Submit
          </Button> */}
          <GoogleLogin
            clientId="957666672016-3850ch4mr24gvr89bmt514bn7u359mb4.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </Form>
      </Row>
      <Row className="justify-content-center">
        <span id="loginLink" className="text-center">
          Already have an account?
          <br /> Login <a href="/">here</a>!
        </span>
      </Row>
    </Container>
  );
}
