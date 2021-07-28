import { useRef, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { FaArrowUp } from "react-icons/fa";
import { FaRegSmile } from "react-icons/fa";
import { useConversations } from "../../../utils/ConversationProvider";
import { useViewport } from "../../../utils/ViewportProvider";
import ImageUploading from "react-images-uploading";
import Picker from "emoji-picker-react";
import "./chatInput.sass";

export default function ChatInput({ containerRef }) {
  const [currentInput, setCurrentInput] = useState(null);
  const { sendMessage } = useConversations();
  const { width, scrollToBottomMessages } = useViewport();
  const [chatboxWidth, setChatboxWidth] = useState("100%");
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);
  const [images, setImages] = useState([]);
  const textRef = useRef();

  function messageSubmit(event) {
    event.preventDefault();
    if (!currentInput) return;
    setEmojiPickerShow(false);
    scrollToBottomMessages();
    sendMessage(currentInput);
    textRef.current.value = "";
  }

  function handleInputChange(event) {
    event.preventDefault();
    setCurrentInput(textRef.current.value);
  }

  function toggleEmojiMenu(event) {
    event.preventDefault();
    setEmojiPickerShow(!emojiPickerShow);
  }

  function addEmoji(event, emojiData) {
    event.preventDefault();
    const messagePlusEmoji = `${textRef.current.value} ${emojiData.emoji}`;
    setCurrentInput(messagePlusEmoji);
    textRef.current.value = messagePlusEmoji;
  }

  function handleImageLoaderChange(imageList, addUpdateIndex) {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  }

  useEffect(() => {
    if (width >= 680) setChatboxWidth(`${containerRef.current.offsetWidth}px`);
    else setChatboxWidth("100%");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    /*  At some point in time it would be good to re visit this so that you can do CMD+Enter and have the message send. 
        Obviously this would only work for computers, but it would be a good basic function to have */
    <div id="chatBox" style={{ width: chatboxWidth }}>
      <Row>
        <div className={`${emojiPickerShow ? "show" : "hide"}`}>
          <Picker
            disableSkinTonePicker={true}
            onEmojiClick={addEmoji}
            pickerStyle={{ width: "100%" }}
          />
        </div>
      </Row>
      <Row>
        {
          //? THIS WILL WORK FOR NOW, IN TERMS OF PROOF OF CONTECPT,
          //? BUT I WILL NEED TO MAKE THIS WORK WITH FIREBASE IF I WANT
          //? A PRODUCTION QUALITY APP
        }
        <ImageUploading
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
        </ImageUploading>
      </Row>
      <Row>
        <Col xs={9}>
          <textarea
            ref={textRef}
            rows="1"
            id="chatInput"
            type="text"
            onChange={handleInputChange}
          />
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
