/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useState,
  createContext,
  useContext,
  useReducer,
} from "react";
import { isMobile } from "react-device-detect";
import { useViewport } from "./ViewportProvider";
import reducer, { initialState } from "./Reducer";
import useLocalStorage from "./useLocalStorage";
import API from "./API";

const contactContext = createContext();

export function useContactContext() {
  return useContext(contactContext);
}

export default function ContactProvider({ user, children }) {
  const [sortedContacts, setSortedContacts] = useState();
  const [selectedContact, setSelectedContact] = useState();
  const { contacts } = user;

  const getContactInformation = (cb) => {
    const id_array = contacts;
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
  };

  return (
    <contactContext.Provider value={value}>{children}</contactContext.Provider>
  );
}
