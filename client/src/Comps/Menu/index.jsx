import { useRef } from "react";
import { useUIContext } from "../../utils/UIProvider";
import { useThemes } from "../../utils/ThemeProvider";

import MenuBar from "./MenuBar";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import Settings from "./Settings";

export default function Sidebar() {
  const { theme } = useThemes();
  const { activeMenu, display } = useUIContext();
  const containerRef = useRef();

  function renderSwitch() {
    if (activeMenu.conversations) return <Conversations theme={theme} />;
    if (activeMenu.contacts) return <Contacts theme={theme} />;
    if (activeMenu.settings) return <Settings theme={theme} />;
  }

  return (
    <div ref={containerRef}>
      {/* <div>hello</div> */}
      <div className={display.menu ? "show" : "hide"}>
        {renderSwitch()}
        <MenuBar containerRef={containerRef} theme={theme} />
      </div>
    </div>
  );
}
