import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { FaRegSmile } from "react-icons/fa";
// import ImageUploading from "react-images-uploading";
// import Picker from "emoji-picker-react";

export default function ModalTextInput({
  //PROPS
  //====================================================================
  textRef,
  setCurrentInput,
  emojiPickerState,
}) {
  //STATE
  //====================================================================
  const [emojiPickerShow, setEmojiPickerShow] = emojiPickerState;

  //FUNCTIONS
  //====================================================================
  function handleInputChange(event) {
    event.preventDefault();
    setCurrentInput(textRef.current.innerText);
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

  // function handleImageLoaderChange(imageList, addUpdateIndex) {
  //   console.log(imageList, addUpdateIndex);
  //   setImages(imageList);
  // }

  //EFFECTS
  //====================================================================
  useEffect(() => {
    textRef.current.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    /*  At some point in time it would be good to re visit this so that you can do CMD+Enter and have the message send. 
          Obviously this would only work for computers, but it would be a good basic function to have */
    <div>
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
        <Col xs={10}>
          <span
            id="chatInput"
            className="textarea"
            role="textbox"
            contentEditable
            onInput={handleInputChange}
            onBlur={handleInputChange}
            ref={textRef}
          />
        </Col>
        <Col xs={2} className="text-center chatInputButton">
          <FaRegSmile id="openEmojisButton" onClick={toggleEmojiMenu} />
        </Col>
      </Row>
    </div>
  );
}
