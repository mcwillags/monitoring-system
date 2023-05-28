import mongoose from 'mongoose';
import * as Joi from 'joi';
import {
  emailValidationMessages,
  passwordValidationMessages,
  badgeNumberValidationMessages,
  brigadeNumberValidationMessages,
  fullNameValidationMessages,
  regionValidationMessages,
  defaultMonitoringSettings,
  monitoringValidationMessages,
  RegionsValues,
  UserRole,
} from '../common';

export interface MonitoringSettings {
  maxHeartRateLevel: number;
  minOxygenLevel: number;
  maxTemperatureLevel: number;
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  fullName: string;
  brigadeNumber: string;
  badgeNumber: string;
  region: RegionsValues;
  role: UserRole.USER;
  monitoringSettings: MonitoringSettings;
}

export const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  brigadeNumber: { type: String, required: true },
  badgeNumber: { type: String, required: true },
  region: { type: String, required: true },
  role: { type: String, default: UserRole.USER },
  monitoringSettings: {
    maxHeartRateLevel: {
      type: Number,
      default: defaultMonitoringSettings.maxHeartRateLevel,
    },
    minOxygenLevel: {
      type: Number,
      default: defaultMonitoringSettings.minOxygenLevel,
    },
    maxTemperatureLevel: {
      type: Number,
      default: defaultMonitoringSettings.maxTemperatureLevel,
    },
  },
});

// JOI

export const createUserJoi = Joi.object({
  email: Joi.string().email().required().messages(emailValidationMessages),
  fullName: Joi.string().required().messages(fullNameValidationMessages),
  password: Joi.string().required().messages(passwordValidationMessages),
  badgeNumber: Joi.string().required().messages(badgeNumberValidationMessages),
  brigadeNumber: Joi.string()
    .required()
    .messages(brigadeNumberValidationMessages),
  region: Joi.string().required().messages(regionValidationMessages),
}).options({ allowUnknown: true });

export const changeMonitoringSettingsJoi = Joi.object({
  maxHeartRateLevel: Joi.number()
    .required()
    .max(3)
    .messages(monitoringValidationMessages),
  minOxygenLevel: Joi.number()
    .required()
    .max(3)
    .messages(monitoringValidationMessages),
  maxTemperatureLevel: Joi.number()
    .required()
    .max(5)
    .messages(monitoringValidationMessages),
});
