import React from "react";
import GoogleLogin from "react-google-login";
import { Container, Row, Form } from "react-bootstrap";
import API from "../utils/API.js";
import Header from "./Header";
import { useUserContext } from "../utils/UserProvider.js";

export default function Login() {
  const { setUser } = useUserContext();

  function handleLogin(response) {
    // Working on a better was to handle authentication
    const { profileObj } = response;
    API.login(
      profileObj,
      (user) => {
        const storableUser = JSON.stringify(user);
        setUser(storableUser);
      },
      (error) => {
        alert("No user could be found. Please sign up!");
        console.error(error);
      }
    );
  }

  function handleFailure() {
    alert("whoops, something went wrong!");
  }

  return (
    <>
      <Header />
      <Container id="login">
        <Row className="justify-content-center">
          <Form id="form" className="text-center">
            <h2>Login</h2>
            <h5>
              {/* Need to make this font not bold */}
              Use your Google account to sign in
            </h5>
            <GoogleLogin
              clientId="957666672016-3850ch4mr24gvr89bmt514bn7u359mb4.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={handleLogin}
              onFailure={handleFailure}
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
    </>
  );
}
