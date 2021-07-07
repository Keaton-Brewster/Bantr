import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { useViewport } from "../../../utils/ViewportProvider";

export default function ChatInput({ textRef, sendMessage, containerRef }) {
  const { width, scrollToBottomMessages } = useViewport();
  const [chatboxWidth, setChatboxWidth] = useState({});

  useEffect(() => {
    if (width >= 575) setChatboxWidth(`${containerRef.current.offsetWidth}px`);
    else setChatboxWidth("100%");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    /*  At some point in time it would be good to re visit this so that you can do CMD+Enter and have the message send. 
        Obviously this would only work for computers, but it would be a good basic function to have */
    <div id="chatBox" style={{ width: chatboxWidth }}>
      <Row>
        <Col xs={10}>
          <textarea ref={textRef} rows="1" id="chatInput" type="text" />
        </Col>
        <Col xs={2}>
          <button
            id="sendButton"
            onClick={(e) => {
              e.preventDefault();
              scrollToBottomMessages();
              sendMessage(textRef.current.value);
              textRef.current.value = "";
            }}
          >
            <FaArrowRight className="bg-primary sendButton" />
          </button>
        </Col>
      </Row>
    </div>
  );
}
