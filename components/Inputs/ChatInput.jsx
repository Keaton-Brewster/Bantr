import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { useConversations } from "../../lib/providers/ConversationProvider";
import { useViewport } from "../../lib/providers/ViewportProvider";
import TextInputBox from "./TextInputBox";
// import ImageUploading from "react-images-uploading";
// import Picker from "emoji-picker-react";

function ChatInput({ className, containerRef }) {
  //STATE
  //================================================================================
  const [currentInput, setCurrentInput] = useState(null);
  const { sendMessage } = useConversations();
  const { width, scrollToBottomMessages } = useViewport();
  const [chatboxWidth, setChatboxWidth] = useState("100%");
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);
  // const [images, setImages] = useState([]);
  const textRef = useRef();

  //FUNCTIONS
  //================================================================================
  function messageSubmit(event) {
    event.preventDefault();
    if (!currentInput) return;
    setEmojiPickerShow(false);
    scrollToBottomMessages();
    sendMessage(currentInput);
    setCurrentInput(null);
    textRef.current.textContent = "";

    // On desktop this is effective, but I may want to adjust this when it comes to mobile interaction
    document.activeElement.blur();
  }

  function handleInputChange(event) {
    event.preventDefault();
    setCurrentInput(textRef.current.innerText);
  }

  function toggleEmojiMenu(event) {
    event.preventDefault();
    setEmojiPickerShow(!emojiPickerShow);
  }

  // function addEmoji(event, emojiData) {
  //   event.preventDefault();
  //   const messagePlusEmoji = `${textRef.current.value} ${emojiData.emoji}`;
  //   setCurrentInput(messagePlusEmoji);
  //   textRef.current.value = messagePlusEmoji;
  // }

  function testForCMD(event) {
    if (document.activeElement !== textRef.current) return;
    if (!currentInput) return;
    if (event.key === "Enter" && event.metaKey) {
      messageSubmit(event);
    }
  }

  // function handleImageLoaderChange(imageList, addUpdateIndex) {
  //   console.log(imageList, addUpdateIndex);
  //   setImages(imageList);
  // }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (width >= 680) setChatboxWidth(`${containerRef.current.offsetWidth}px`);
    else setChatboxWidth("100%");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  useEffect(() => {
    document.addEventListener("keydown", testForCMD, false);

    return () => {
      document.removeEventListener("keydown", testForCMD, false);
    };
  });

  //COMPONENT
  //================================================================================
  return (
    /*  At some point in time it would be good to re visit this so that you can do CMD+Enter and have the message send. 
        Obviously this would only work for computers, but it would be a good basic function to have */
    <div id="chatBox" style={{ width: chatboxWidth }} className={className}>
      <Row>
        <div className={`${emojiPickerShow ? "show" : "hide"}`}>
          {/* <Picker
            disableSkinTonePicker={true}
            onEmojiClick={addEmoji}
            pickerStyle={{ width: "100%" }}
          /> */}
        </div>
      </Row>
      <Row>
        {
          //* THIS WILL WORK FOR NOW, IN TERMS OF PROOF OF CONTECPT,
          //* BUT I WILL NEED TO MAKE THIS WORK WITH FIREBASE IF I WANT
          //* A PRODUCTION QUALITY APP
          //*
          //* Until I can do that ^^^ I am disabling this image uploader. It's
          //* Not needed for MVP      KB 2.8.22
        }
        {/* <ImageUploading
          multiple
          value={images}
          onChange={handleImageLoaderChange}
          maxNumber={10}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop here
              </button>
              &nbsp;
              <button onClick={onImageRemoveAll}>Remove all images</button>
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image["data_url"]} alt="" width="100" />
                  <div className="image-item__btn-wrapper">
                    <button onClick={() => onImageUpdate(index)}>Update</button>
                    <button onClick={() => onImageRemove(index)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading> */}
      </Row>
      <Row>
        <Col xs={9}>
          <TextInputBox ref={textRef} handleInputChange={handleInputChange} />
        </Col>
        <Col xs={2} className="text-center chatInputButton">
          <FaRegSmile id="openEmojisButton" onClick={toggleEmojiMenu} />
        </Col>
        <Col xs={1} className="text-center chatInputButton">
          <button id="sendButton" onClick={messageSubmit}>
            <FaArrowUp className="sendButton" />
          </button>
        </Col>
      </Row>
    </div>
  );
}

export default styled(ChatInput)`
  transition: background 0.5s ease;
  margin-right: auto;
  margin-left: auto;
  position: fixed;
  bottom: 0;
  padding: 15px;
  padding-right: 30px;
`;
