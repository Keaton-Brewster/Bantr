import { useState, useRef } from "react";
import MenuBar from "./MenuBar";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import Settings from "./Settings";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("conversations");
  const containerRef = useRef();

  function renderSwitch() {
    switch (activeMenu) {
      case "conversations":
        return <Conversations />;
      case "contacts":
        return <Contacts />;
      case "settings":
        return <Settings />;
      default:
        return <Conversations />;
    }
  }

  return (
    <div ref={containerRef}>
      {renderSwitch()}
      <MenuBar
        containerRef={containerRef}
        menuState={{ activeMenu, setActiveMenu }}
      />
    </div>
  );
}
