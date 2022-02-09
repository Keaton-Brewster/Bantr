import { useState, useEffect, useCallback } from "react";
import { useContentContext } from "../../../utils/ContentProvider";
import { Spinner } from "react-bootstrap";
import API from "../../../utils/API";

export default function Contacts() {
  const { selectedContact } = useContentContext();
  const [isLoading, setIsLoading] = useState(true);

  const contactFetch = useCallback(() => {
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

  // Always be checking to see if the selected contact has been changed
  // So that the display can update accordingly
  useEffect(() => {
    if (!selectedContact) return setIsLoading(false);
    else contactFetch();
  }, [selectedContact, contactFetch]);

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
