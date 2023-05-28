import {
  emailValidationMessages,
  passwordValidationMessages,
  roleValidationMessages,
  UserRole,
} from '../';
import * as Joi from 'joi';

export class LoginCredentials {
  readonly email: string;
  readonly password: string;
  readonly role: UserRole;
}

export const loginCredentialsJoi = Joi.object({
  email: Joi.string().required().email().messages(emailValidationMessages),
  password: Joi.string().required().messages(passwordValidationMessages),
  role: Joi.string().required().messages(roleValidationMessages),
});