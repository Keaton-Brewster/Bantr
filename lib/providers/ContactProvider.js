/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, useContext } from "react";
import { useAppContext } from "./AppProvider";
import useContactSorting from "../../components/hooks/useContactSorting";

import { getContacts } from "../api";

const ContactContext = createContext();

export function useContactContext() {
  return useContext(ContactContext);
}

export default function ContactProvider({ children }) {
  //STATE
  //================================================================================
  const { state, dispatch } = useAppContext();
  const { user } = state;
  // const [contacts, setContacts] = useState();
  const [searchValue, setSearchValue] = useState(null);
  const [contacts, setContacts] = useContactSorting(searchValue);
  const [selectedContact, setSelectedContact] = useState();

  //FUNCTIONS
  //================================================================================
  function sortContacts(contacts) {
    return contacts.sort((a, b) => {
      if (a.familyName < b.familyName) {
        return -1;
      }
      if (a.familyName > b.familyName) {
        return 1;
      }
      return 0;
    });
  }

  function getContactInformation(cb) {
    const id_array = user.contacts;
    getContacts(
      id_array,
      (contacts) => {
        cb(contacts);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    getContactInformation((allContacts) => {
      const sorted = sortContacts(allContacts);
      setContacts(sorted);
    });
  }, [contacts]);

  //PROVIDER VALUES
  //================================================================================
  const value = {
    contacts: contacts,
    setContacts: setContacts,
    selectedContact,
    setSelectedContact,
    setSearchValue,
  };

  //COMPONENT
  //================================================================================
  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
}
