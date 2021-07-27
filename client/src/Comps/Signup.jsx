import { useState, useEffect, useRef } from "react";
import GoogleLogin from "react-google-login";
import { Container, Row, Form } from "react-bootstrap";
import PasswordValidator from "password-validator";
import Header from "./Header";
import { useViewport } from "../utils/ViewportProvider";
import API from "../utils/API";

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
  const { width } = useViewport();
  const [formWidth, setFormWidth] = useState("100%");

  function handleSignup(newUser) {
    API.signup(
      newUser,
      // CB for the newly created user
      (user) => {
        if (!user) return;
        const storableUser = JSON.stringify(user);
        setUser(storableUser);
        window.location.href = "/";
      },
      // CB for error handling / debugging
      (error) => {
        if (error) console.error(error);
        if (error.toString().includes("code 500"))
          return alert("That user already exists. Please sign in.");
      }
    );
  }

  const googleSignup = (response) => {
    if (response.error) return;

    const { tokenObj, profileObj } = response;
    const { email, familyName, givenName, imageUrl } = profileObj;
    const newUser = {
      email,
      familyName,
      givenName,
      imageUrl,
      key: tokenObj.id_token.slice(0, 40),
    };

    handleSignup(newUser);
  };

  useEffect(() => {
    if (width < 680) setFormWidth("100%");
    setFormWidth(`${width / 2}px`);
    return () => {
      return;
    };
  }, [width]);

  return (
    <>
      <Header />

      <Container style={{ width: formWidth }}>
        <Row className="justify-content-center">
          <Form id="form" className="text-center">
            <h2>Sign up here to get started</h2>
            <h5>
              {/* Need to make this font not bold */}
              Because we want to keep your information as safe as possible,
              please use your Google account to sign up
            </h5>
            <div className="m-5">
              <GoogleLogin
                clientId="957666672016-3850ch4mr24gvr89bmt514bn7u359mb4.apps.googleusercontent.com"
                buttonText="Sign up"
                onSuccess={googleSignup}
                onFailure={googleSignup}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          </Form>
        </Row>
        <Row className="justify-content-center">
          <span id="loginLink" className="text-center">
            Already have an account?
            <br /> Login <a href="/">here</a>!
          </span>
        </Row>
      </Container>
    </>
  );
}
