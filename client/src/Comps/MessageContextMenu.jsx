import React from "react";

export default function MessageContextMenu({ position }) {
  const { xPos, yPos } = position;
  return <div style={{ top: { yPos }, left: { xPos } }}>Hello</div>;
}
