import { useEffect, useState } from "react";

const PREFIX = "CHAT_v1.0.0-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    // Within this if statement, we can also take the users information if they previously used the app, and sign them in
    // Just don't save passwords to the local storage!
    if (jsonValue != null || undefined) return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
