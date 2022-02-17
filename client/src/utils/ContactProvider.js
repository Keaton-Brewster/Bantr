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
  const { contacts } = user;
  const getContactInformation = async (cb) => {
    const allContacts = await contacts.map((_id) => {
      return API.getContact(
        _id,
        (contact) => {
          return contact;
        },
        (err) => {
          console.error(err);
        }
      );
    });
    cb(allContacts);
  };

  useEffect(() => {
    getContactInformation((contacts) => {
      setSortedContacts(contacts);
    });
  });

  const value = {
    contacts: sortedContacts,
    setContacts: setSortedContacts,
  };

  return (
    <contactContext.Provider value={value}>{children}</contactContext.Provider>
  );
}
