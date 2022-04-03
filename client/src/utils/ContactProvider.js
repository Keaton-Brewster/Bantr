/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, useContext } from "react";
import API from "./API";
import { useUserContext } from "../utils/UserProvider";
import useContactSorting from "./useContactSorting";

const contactContext = createContext();

export function useContactContext() {
  return useContext(contactContext);
}

export default function ContactProvider({ children }) {
  //STATE
  //================================================================================
  const { user, setUser } = useUserContext();
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
    API.getContacts(
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
  }, []);

  //PROVIDER VALUES
  //================================================================================
  const value = {
    contacts: contacts,
    setContacts: setContacts,
    selectedContact,
    setSelectedContact,
    setUser,
    setSearchValue,
  };

  //COMPONENT
  //================================================================================
  return (
    <contactContext.Provider value={value}>{children}</contactContext.Provider>
  );
}
