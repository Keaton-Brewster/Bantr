import { useState, useEffect } from "react";
import { useContentContext } from "../../../utils/ContentProvider";
import { Spinner } from "react-bootstrap";
import API from "../../../utils/API";

export default function Contacts() {
  const { selectedContact } = useContentContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.getContact(
      selectedContact,
      (contact) => {
        console.log(contact);
      },
      (error) => {
        console.error(error);
      }
    ).then(() => {
      setIsLoading(false);
    });
  }, [selectedContact]);

  return isLoading ? (
    // If loading, return loader
    <Spinner className="absoluteCenter" animation="border" />
  ) : // Otherwise return the content: The selected contact if applicable
  selectedContact ? (
    <div>{selectedContact}</div>
  ) : (
    // otherwise it will just tell you to select a contact
    <div className="absoluteCenter">Select A Contact</div>
  );
}
