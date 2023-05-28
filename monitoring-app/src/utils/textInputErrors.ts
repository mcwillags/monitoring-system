export interface Validators {
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  email?: boolean;
  noSpaces?: boolean;
  numeric?: boolean;
  float?: boolean;
}

export type ErrorNames = keyof Validators;

const emailRegexp = /^[^\s@]{2,}@[^.\s@]{2,}\.[^\s@]{2,}$/;
const noSpaceRegexp = /\s/;
const isNumericRegexp = /^[0-9]+$/
const isFloatRegexp = /^\d+(\.\d+)?$/;

export function containsError<Error extends ErrorNames>(
  error: ErrorNames,
  value: string,
  validatorValue: Validators[Error]
): boolean {
  if (!validatorValue) return false;

  switch (error) {
    case 'required':
      return validatorValue && !value;

    case 'minLength':
      // @ts-ignore
      return value.length < validatorValue;

    case 'maxLength':
      // @ts-ignore
      return value.length > validatorValue;

    case 'email':
      return validatorValue && !emailRegexp.test(value);

    case 'noSpaces':
      return validatorValue && noSpaceRegexp.test(value);

    case 'numeric':
      return validatorValue && !isNumericRegexp.test(value);

    case 'float':
      return validatorValue && !isFloatRegexp.test(value);

    default:
      return false;
  }
}
