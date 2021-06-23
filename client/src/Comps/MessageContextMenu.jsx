import React from "react";

export default function MessageContextMenu({ position }) {
  const { xPos, yPos } = position;
  return <div style={{ top: { xPos }, left: { yPos } }}>Hello</div>;
}
