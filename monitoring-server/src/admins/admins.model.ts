import {
  emailValidationMessages,
  passwordValidationMessages,
  registerCodeMessages,
  UserRole,
} from '../common';
import mongoose from 'mongoose';
import * as Joi from 'joi';

export interface IAdmin extends mongoose.Document{
  email: string;
  password: string;
  role: UserRole.ADMIN;
}

export const AdminSchema = new mongoose.Schema<IAdmin>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: UserRole.ADMIN },
});

// JOI

export const createAdminJoi = Joi.object({
  email: Joi.string().required().email().messages(emailValidationMessages),
  password: Joi.string().required().messages(passwordValidationMessages),
  registerCode: Joi.string().required().messages(registerCodeMessages),
})