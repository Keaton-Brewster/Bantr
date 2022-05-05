import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Container, Row, Form } from "react-bootstrap";
import Header from "../components/Header";
import { useViewport } from "../lib/providers/ViewportProvider";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import API from "..//lib/API";
import { firebaseSignIn } from "../firebase";

function Signup({ setUser, className }) {
  // STATE
  //================================================================================
  const { width } = useViewport();
  const [formWidth, setFormWidth] = useState("100%");
  const [phoneNum, setphoneNUM] = useState();
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // REFS
  //================================================================================
  const givenNameRef = useRef();
  const familyNameRef = useRef();

  // FUNCTIONS
  //================================================================================
  function handleSignup(newUser) {
    API.signup(
      newUser,
      (user) => {
        const stringifiedUser = JSON.stringify(user);
        setUser(stringifiedUser);
        window.location.href = "/";
      },
      (error) => {
        alert("That user already exists. Please sign in.");
        console.log(error);
      }
    );
  }

  function googleSignup(event) {
    event.preventDefault();
    if (!givenName || !familyName || !phoneNum) return;

    firebaseSignIn(
      (user) => {
        console.log(user);
        const { email, photoURL, uid } = user;
        const newUser = {
          email,
          givenName,
          familyName,
          photoURL,
          phoneNum,
          uid,
        };
        handleSignup(newUser);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function handleGivenNameChange(e) {
    e.preventDefault();
    if (!givenNameRef.current.value) return;
    setGivenName(givenNameRef.current.value);
  }

  function handleFamilyNameChange(e) {
    e.preventDefault();
    if (!familyNameRef.current.value) return;
    setFamilyName(familyNameRef.current.value);
  }

  // EFFECTS
  //================================================================================
  useEffect(() => {
    if (width < 680) setFormWidth("100%");
    setFormWidth(`${width / 1.5}px`);
    return () => {
      return;
    };
  }, [width]);

  useEffect(() => {
    if (
      phoneNum === undefined ||
      phoneNum === null ||
      !familyName ||
      !givenName
    )
      return;

    let mutablePN = phoneNum.replace(/[+]/g, "");
    if (mutablePN.match(/\d/g).length === 11 && givenName && familyName)
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [phoneNum, familyName, givenName]);

  // RENDER
  //================================================================================
  return (
    <div className={className}>
      <Header />

      <Container style={{ width: formWidth }}>
        <Row className="justify-content-center">
          <Form id="form" className={`text-center`}>
            <h2>Sign up here to get started</h2>
            <h5 className="mb-3 font-light">
              {/* Need to make this font not bold */}
              Because we want to keep your information as safe as possible, just
              fill in your phone number, and then please use your Google account
              to sign up.
            </h5>
            <PhoneInput
              id="phoneInput"
              country="US"
              defaultCountry="US"
              placeholder="+0 000 000 0000"
              value={phoneNum}
              onChange={setphoneNUM}
            />
            <div className="m-5">
              <input
                onChange={handleGivenNameChange}
                placeholder="First Name"
                type="text"
                ref={givenNameRef}
              ></input>
              <input
                onChange={handleFamilyNameChange}
                placeholder="Last Name"
                type="text"
                ref={familyNameRef}
              ></input>
              <button
                className="button"
                onClick={googleSignup}
                disabled={buttonDisabled}
              >
                Sign up using your google account
              </button>
              {/* <GoogleLogin
                clientId="957666672016-3850ch4mr24gvr89bmt514bn7u359mb4.apps.googleusercontent.com"
                buttonText="Sign up"
                onSuccess={googleSignup}
                onFailure={googleSignup}
                cookiePolicy={"single_host_origin"}
                disabled={buttonDisabled}
              /> */}
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
    </div>
  );
}

export default styled(Signup)`
  & .button:disabled {
    background-color: black;
    color: grey;
  }
`;
