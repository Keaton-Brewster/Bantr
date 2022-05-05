import React from "react";
import { Navbar } from "react-bootstrap";
import { useViewport } from "../../lib/providers/ViewportProvider";
// import "./header.sass";

export default function Header() {
  const { width } = useViewport();

  const style = {
    marginLeft: width / 16 + "px ",
  };

  return (
    <Navbar id="header" expand="lg" className="p-3">
      <h1 style={style}>Bantr</h1>
    </Navbar>
  );
}
