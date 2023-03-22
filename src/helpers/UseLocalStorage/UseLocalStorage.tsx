import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  initValue: number[],
): [number[], Dispatch<SetStateAction<number[]>>] => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);

      return (storedValue) ? JSON.parse(storedValue) : initValue;
    } catch {
      return initValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
