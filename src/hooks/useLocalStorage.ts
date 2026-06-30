import { useEffect, useState } from "react";
import { storage } from "../services/storage/localStorage";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => storage.read(key, initial));

  useEffect(() => {
    storage.write(key, value);
  }, [key, value]);

  return [value, setValue] as const;
}
