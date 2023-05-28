import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SCHEMAS_NAMES } from '../common';

import { CreateObserverDto, ChangeRegionDto, ChangePasswordDto } from './dto';
import { IObserver } from './observers.model';
import {
  CreateToken,
  LoginResponse,
  AuthResponse,
  JWTObserverPayload,
  ObserverResponse,
} from '../common/auth';
import { isValidRegion } from '../common/utils';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class ObserversService {
  constructor(
    @InjectModel(SCHEMAS_NAMES.OBSERVER)
    private readonly observerModel: Model<IObserver>,
  ) {}

  async getAllObservers() {
    const observers = await this.observerModel.find();

    return observers.map((observer) => ({
      _id: String(observer._id),
      email: observer.email,
      region: observer.region,
      role: observer.role,
    }));
  }

  async changePassword(req, { password, newPassword }: ChangePasswordDto) {
    const userId = req.user._id;

    const user = await this.observerModel.findById(userId);

    if (!user) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Wrong password provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUsersPassword = await bcrypt.hash(newPassword, 10);

    await this.observerModel.findByIdAndUpdate(userId, {
      password: newUsersPassword,
    });

    return {
      message: 'Success',
    };
  }

  async changeObserverRegion(req, { region }: ChangeRegionDto) {
    if (!isValidRegion(region)) {
      throw new HttpException(
        'Invalid region provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.observerModel.findByIdAndUpdate(req.params.id, {
      region,
    });

    const user = await this.observerModel.findById(req.params.id);

    return this.createAuthResponse(user);
  }

  async createUser(observerDto: CreateObserverDto) {
    const newObserver = new this.observerModel(observerDto);

    await newObserver.save();

    return newObserver;
  }

  findByEmail(email: string) {
    return this.observerModel.findOne({ email });
  }

  createTokenResponse(
    user: IObserver,
    createToken: CreateToken<JWTObserverPayload>,
  ): LoginResponse<ObserverResponse> {
    const token = createToken({
      _id: String(user._id),
      role: user.role,
      region: user.region,
      email: user.email,
    });

    const observerResponse = this.createObserverResponse(user);

    return {
      token,
      user: observerResponse,
    };
  }

  createAuthResponse(user: IObserver): AuthResponse<ObserverResponse> {
    const observerResponse = this.createObserverResponse(user);

    return {
      user: observerResponse,
    };
  }

  createObserverResponse({
    _id,
    region,
    email,
    role,
  }: IObserver): ObserverResponse {
    return {
      _id: String(_id),
      region,
      email,
      role,
    };
  }
}
