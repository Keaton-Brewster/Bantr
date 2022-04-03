import { useEffect, useState } from "react";

export default function useContactSorting(searchValue) {
  //STATE
  //================================================================================
  const [contacts, setContacts] = useState();
  const [searchedContacts, setSearchedContacts] = useState(null);

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!searchValue) return setSearchedContacts(null);
    setSearchedContacts(() => {
      return contacts.filter((contact) => {
        const fullName =
          contact.givenName.toLowerCase() + contact.familyName.toLowerCase();
        return fullName.includes(searchValue.toLowerCase());
      });
    });
  }, [contacts, searchValue]);

  //RETURN
  //================================================================================
  if (!searchedContacts) return [contacts, setContacts];
  else return [searchedContacts, setContacts];
}
