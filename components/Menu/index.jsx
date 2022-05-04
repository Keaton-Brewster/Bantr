import { useRef } from "react";
import { useUIContext } from "../../lib/contexts/UIProvider";

import MenuBar from "./MenuBar";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import Settings from "./Settings";

export default function Sidebar() {
  const { activeMenu, display } = useUIContext();
  const containerRef = useRef();

  function renderSwitch() {
    if (activeMenu.conversations) return <Conversations />;
    if (activeMenu.contacts) return <Contacts />;
    if (activeMenu.settings) return <Settings />;
  }

  return (
    <div ref={containerRef}>
      {/* <div>hello</div> */}
      <div className={display.menu ? "show" : "hide"}>
        {renderSwitch()}
        <MenuBar containerRef={containerRef} />
      </div>
    </div>
  );
}
