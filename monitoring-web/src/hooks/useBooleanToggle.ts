import { useState } from 'react';

export const useBooleanToggle = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);

  const toggle = (value?: boolean) => {
    if (value) setValue(value);
    else setValue((prev) => !prev);
  };

  return [value, toggle] as const;
};