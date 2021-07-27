import React from "react";
import GoogleLogin from "react-google-login";
import { Container, Row, Form } from "react-bootstrap";
import API from "../utils/API";
import Header from "./Header";

export default function Login({ setUser }) {
  function handleLogin(key) {
    API.login(
      key,
      (user) => {
        if (!user) return;
        const storableUser = JSON.stringify(user);
        setUser(storableUser);
      },
      (error) => {
        if (error) console.error(error);
      }
    );
  }

  const googleLogin = (response) => {
    const key = {
      y: response.profileObj.email,
      z: response.profileObj.googleId,
    };
    handleLogin(key);
  };

  // In order to set this up properly I am going to need to be sure to take care of all possible
  /* Ways a user can interact with the google signin form:
        ? Signing in Successfully
        ? Closing the sign in window, and it's error response
        ? Trying to sign in but getting the password to your account wrong?
    */

  return (
    <>
      <Header />
      <Container id="login">
        <Row className="justify-content-center">
          <Form id="form" className="text-center">
            <h2>Login</h2>
            <h5>
              {/* Need to make this font not bold */}
              Use the Google profile associated with your account
            </h5>
            <GoogleLogin
              clientId="957666672016-3850ch4mr24gvr89bmt514bn7u359mb4.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={googleLogin}
              onFailure={googleLogin}
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
