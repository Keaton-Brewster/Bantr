import { useEffect, useState } from "react";

const PREFIX = "CHAT_v1.0.0__";

export default function useLocalStorage(key, initialValue) {
  const isBrowser = (() => {
    return typeof window !== undefined;
  })();
  if (!isBrowser) return [];
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (typeof jsonValue === "string") return JSON.parse(jsonValue);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  // For some reason JSON.parse is not working properly inside
  // The useEffect. No idea what is going on or why
  return [value, setValue];
}
