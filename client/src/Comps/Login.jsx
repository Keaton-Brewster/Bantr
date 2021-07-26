import { useState, useRef } from "react";
import GoogleLogin from "react-google-login";
import { Container, Row, Form, Button } from "react-bootstrap";
import API from "../utils/API";

export default function Login({ onLoginSubmit }) {
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
        const userToStore = JSON.stringify(response.data);
        onLoginSubmit(userToStore);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const responseGoogle = (response) => {
    console.log(response.tokenObj.id_token.slice(0, 50));
  };

  // In order to set this up properly I am going to need to be sure to take care of all possible
  /* Ways a user can interact with the google signin form:
        ? Signing in Successfully
        ? Closing the sign in window, and it's error response
        ? Trying to sign in but getting the password to your account wrong?
    */

  return (
    <Container id="login">
      <Row className="justify-content-center">
        <Form id="form" onSubmit={login} className="text-center">
          <h2>Login</h2>
          <h5>
            {/* Need to make this font not bold */}
            Use the Google profile associated with your account
          </h5>
          {/* <Form.Group className="mb-3" controlId="formBasicEmail">
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
        <span id="signupLink" className="text-center">
          Don't have an account?
          <br /> Sign up <a href="/signup">here</a>!
        </span>
      </Row>
    </Container>
  );
}
