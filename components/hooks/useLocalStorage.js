import { useEffect, useState } from "react";

const PREFIX = "CHAT_v1.0.0__";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;
  const [value, setValue] = useState(() => {
    const jsonValue =
      typeof window !== undefined
        ? localStorage.getItem(prefixedKey)
        : { error: "Window object not found" };

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
