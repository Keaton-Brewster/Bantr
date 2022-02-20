/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, useContext } from "react";
import API from "./API";
import { useUserContext } from "../utils/UserProvider";

const contactContext = createContext();

export function useContactContext() {
  return useContext(contactContext);
}

export default function ContactProvider({ children }) {
  const { user, setUser } = useUserContext();
  const [sortedContacts, setSortedContacts] = useState();
  const [selectedContact, setSelectedContact] = useState();

  const getContactInformation = (cb) => {
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
  };

  useEffect(() => {
    getContactInformation((allContacts) => {
      setSortedContacts(allContacts);
    });

    return () => {};
  }, []);

  const value = {
    contacts: sortedContacts,
    setContacts: setSortedContacts,
    selectedContact,
    setSelectedContact,
    setUser,
  };

  return (
    <contactContext.Provider value={value}>{children}</contactContext.Provider>
  );
}
