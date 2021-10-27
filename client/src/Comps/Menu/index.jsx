import { useRef } from "react";
import MenuBar from "./MenuBar";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import Settings from "./Settings";
import { useContentContext } from "../../utils/ContentProvider";

export default function Sidebar() {
  // const { activeMenu, display } = useContentContext();
  // const containerRef = useRef();

  // function renderSwitch() {
  //   if (activeMenu.conversations) return <Conversations />;
  //   if (activeMenu.contacts) return <Contacts />;
  //   if (activeMenu.settings) return <Settings />;
  // }

  return (
    // <div ref={containerRef}>
    <div>hello</div>
    /* <div className={display.menu ? "show" : "hide"}>
        {renderSwitch()}
        <MenuBar containerRef={containerRef} />
      </div> */
    // </div>
  );
}
