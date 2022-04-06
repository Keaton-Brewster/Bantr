import React from "react";
import { Badge } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import "./recipient.sass";

export default function Recipient({ userInfo, removeRecipient }) {
  return (
    <Badge pill bg="primary">
      {`${userInfo.givenName} ${userInfo.familyName}`}
      <button onClick={removeRecipient}>
        <GrClose className="removeRecipientButton" />
      </button>
    </Badge>
  );
}
