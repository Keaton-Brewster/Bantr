import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Home() {
  const [messages, setMessages] = useState([]);

  const testMessages = [
    { from: "Tim", to: "Keaton", message: "Hello", date: Date.now() },
    { from: "Mom", to: "keaton", message: "lets eat", date: Date.now() },
  ];

  return (
    <>
      <Container fluid>
        <Col></Col>
        <Col></Col>
      </Container>
    </>
  );
}
