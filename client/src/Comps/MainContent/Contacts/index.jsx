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
        setIsLoading(false);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [selectedContact]);

  return isLoading ? (
    <Spinner className="absoluteCenter" animation="border" />
  ) : (
    <div className="absoluteCenter">{selectedContact}</div>
  );
}
