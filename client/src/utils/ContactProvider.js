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

  //! This function does not work the way I was hoping that it would.
  //! which is fine I will just need to sink some extra time into it.
  const getContactInformation = async (cb) => {
    const allContacts = await contacts.forEach((_id) => {
      API.getContact(
        _id,
        (contact) => {
          console.log(contact);
          return contact;
        },
        (err) => {
          console.error(err);
        }
      );
    });
    cb(allContacts);
  };


  //! For some reason the function is not activiating within the mount
  //! even though the mount itself is taking place and the console statement 
  //! is coming through
  useEffect(() => {
    console.log("contact provider mounted");
    getContactInformation((contacts) => {
      setSortedContacts(contacts);
    });

    return () => {
      console.log("contact provider unmounted");
    };
  }, []);

  const value = {
    contacts: sortedContacts,
    setContacts: setSortedContacts,
  };

  return (
    <contactContext.Provider value={value}>{children}</contactContext.Provider>
  );
}
