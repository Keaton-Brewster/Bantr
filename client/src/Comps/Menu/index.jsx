import { useRef } from "react";
import MenuBar from "./MenuBar";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import Settings from "./Settings";
import { useViewport } from "../../utils/ViewportProvider";
import { useContentContext } from "../../utils/ContentProvider";

export default function Sidebar() {
  const { activeMenu, display } = useContentContext();
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
      <div className={display.menu ? "show" : "hide"}>
        {renderSwitch()}
        <MenuBar containerRef={containerRef} />
      </div>
    </div>
  );
}
