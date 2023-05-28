import { useCallback, useEffect, useState } from 'react';

import { containsError, ErrorNames, Validators } from '@utils';


type Errors = Record<ErrorNames, (param: any) => string>;

type InitialValue = string | (() => string);

const errors: Errors = {
  required: () => `Це поле обов'язкове *`,
  minLength: (length: number) => `Довжина цього поля має бути більшою ніж ${length} символів *`,
  numeric: () => `Поле повинно містити тільки цифри, без пробілів`,
  noSpaces: () => `Поле повинно бути без пробілів`,
  email: () => `Неправильний формат пошти *`,
  float: () => `Поле має містити лише цифри, без пробілів, розділ через крапку`,
  maxLength: (length: number) => `Довжина цього поля має бути  меншою ніж ${length} символів *`,
};

export const useTextField = (initialValue: InitialValue, validators?: Validators) => {
  const [value, setValue] = useState(() => {
    if (typeof initialValue === 'function') return initialValue();

    return initialValue;
  });
  const [touched, setIsTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  const onChangeText = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  const onBlur = useCallback(() => {
    setIsTouched(true);
  }, []);

  useEffect(() => {
    if (!validators) return;

    let error = null;

    for (const key in errors) {
      const typedKey = key as ErrorNames;

      if (validators[typedKey] === undefined) continue;

      if (containsError(typedKey, value, validators[typedKey])) {
        error = errors[typedKey](validators[typedKey]);
        break;
      }
    }

    setIsValid(error === null);
    setError(error);
  }, [value]);

  return {
    value,
    onChangeText,
    onBlur,
    touched,
    error,
    isValid
  };
};
