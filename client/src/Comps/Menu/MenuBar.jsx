import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { BiConversation, BiGroup } from "react-icons/bi";
import { IoSettingsSharp } from "react-icons/io5";
import { useContentContext } from "../../utils/ContentProvider";
import { useViewport } from "../../utils/ViewportProvider";
import "./menubar.css";

export default function MenuBar({ containerRef }) {
  const [menubarWidth, setMenubarWidth] = useState("100%");
  const { activeMenu, setActiveMenu } = useContentContext();
  const { width } = useViewport();

  function handleMenuChange(event, menuSelection) {
    event.preventDefault();
    setActiveMenu(menuSelection);
  }

  useEffect(() => {
    if (width >= 680) setMenubarWidth(`${containerRef.current.offsetWidth}px`);
    else setMenubarWidth("100%");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <div id="menuBar" style={{ width: menubarWidth }}>
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link
            id="conversations"
            onClick={(e) => handleMenuChange(e, "conversations")}
          >
            <BiConversation
              className={`menuIcons ${
                activeMenu === "conversations" ? "activeMenuIcon" : ""
              }`}
            />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            id="contacts"
            onClick={(e) => handleMenuChange(e, "contacts")}
          >
            <BiGroup
              className={`menuIcons ${
                activeMenu === "contacts" ? "activeMenuIcon" : ""
              }`}
            />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            id="settings"
            onClick={(e) => handleMenuChange(e, "settings")}
          >
            <IoSettingsSharp
              className={`menuIcons ${
                activeMenu === "settings" ? "activeMenuIcon" : ""
              }`}
            />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
