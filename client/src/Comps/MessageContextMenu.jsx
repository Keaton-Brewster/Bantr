import React from "react";

export default function MessageContextMenu({ show, position }) {
  const { x, y } = position;

  const style = { top: y, left: x };

  return (
    <nav id="contextMenu" className={show ? "show" : "hide"} style={style}>
      <ul className="context-menu__items">
        <li className="context-menu__item">
          <a href="#" className="context-menu__link">
            <i className="fa fa-eye"></i> View Task
          </a>
        </li>
        <li className="context-menu__item">
          <a href="#" className="context-menu__link">
            <i className="fa fa-edit"></i> Edit Task
          </a>
        </li>
        <li className="context-menu__item">
          <a href="#" className="context-menu__link">
            <i className="fa fa-times"></i> Delete Task
          </a>
        </li>
      </ul>
    </nav>
  );
}
