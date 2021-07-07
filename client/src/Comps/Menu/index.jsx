import { useState, useRef } from "react";
import MenuBar from "./MenuBar";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import Settings from "./Settings";
import { useViewport } from "../../utils/ViewportProvider";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("conversations");
  const containerRef = useRef();
  const { show } = useViewport();

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
      <div className={show.menu ? "show" : "hide"}>
        {renderSwitch()}
        <MenuBar
          containerRef={containerRef}
          menuState={{ activeMenu, setActiveMenu }}
        />
      </div>
    </div>
  );
}
