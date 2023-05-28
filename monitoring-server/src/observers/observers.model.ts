import mongoose from 'mongoose';
import * as Joi from 'joi';
import {
  emailValidationMessages,
  passwordValidationMessages,
  regionValidationMessages,
  RegionsValues,
  UserRole,
} from '../common';

export interface IObserver extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  region: RegionsValues;
  role: UserRole.OBSERVER;
}

export const ObserverSchema = new mongoose.Schema<IObserver>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  region: { type: String, required: true },
  role: { type: String, default: UserRole.OBSERVER },
});

// JOI

export const createObserverJoi = Joi.object({
  email: Joi.string().required().email().messages(emailValidationMessages),
  password: Joi.string().required().messages(passwordValidationMessages),
  region: Joi.string().required().messages(regionValidationMessages),
});
