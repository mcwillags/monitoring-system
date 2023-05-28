import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './user.model';
import {
  ChangeBrigadeDto,
  ChangePasswordDto,
  CreateUserDto,
  GetRegionBrigadesDto,
  ChangeMonitoringSettingsDto,
} from './dto';
import { SCHEMAS_NAMES } from '../common';
import {
  AuthResponse,
  CreateToken,
  JWTUserPayload,
  LoginResponse,
  UserResponse,
} from '../common/auth';
import { isValidRegion } from '../common/utils';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(SCHEMAS_NAMES.USER) private readonly userModel: Model<IUser>,
  ) {}

  async createUser(userCredentials: CreateUserDto) {
    const user = new this.userModel(userCredentials);

    await user.save();

    return user;
  }

  async getBrigadesByRegion({ region }: GetRegionBrigadesDto) {
    if (!isValidRegion(region)) {
      throw new HttpException(
        'Invalid region provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const users = await this.userModel.find({ region });

    const brigades = users.reduce((acc, item) => {
      acc.add(item.brigadeNumber);

      return acc;
    }, new Set<string>());

    return {
      brigades: [...brigades],
    };
  }

  async changeUserPassword({ password, newPassword }: ChangePasswordDto, req) {
    const userId = req.user._id;

    const user = await this.userModel.findById(userId);

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

    await this.userModel.findByIdAndUpdate(userId, {
      password: newUsersPassword,
    });

    return {
      message: 'Success',
    };
  }

  async changeUserBrigade({ brigadeNumber }: ChangeBrigadeDto, req) {
    const userId = req.user._id;

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.userModel.findByIdAndUpdate(userId, { brigadeNumber });

    return {
      brigadeNumber,
    };
  }

  async getUserMonitoringSettings(req) {
    const userId = req.user._id;

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const monitoringSettings = user.monitoringSettings;

    return {
      monitoringSettings,
    };
  }

  async changeUserMonitoringSettings(
    monitoringSettings: ChangeMonitoringSettingsDto,
    req,
  ) {
    const userId = req.user._id;

    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.userModel.findByIdAndUpdate(userId, { monitoringSettings });

    return {
      monitoringSettings,
    };
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  getByBadgeNumber(badgeNumber: string) {
    return this.userModel.findOne({ badgeNumber });
  }

  createTokenResponse(
    user: IUser,
    createToken: CreateToken<JWTUserPayload>,
  ): LoginResponse<UserResponse> {
    const token = createToken({
      _id: String(user._id),
      region: user.region,
      badgeNumber: user.badgeNumber,
      brigadeNumber: user.brigadeNumber,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });

    const userResponse = this.createUserResponse(user);

    return {
      token,
      user: userResponse,
    };
  }

  createAuthResponse(user: IUser): AuthResponse<UserResponse> {
    const userResponse = this.createUserResponse(user);

    return {
      user: userResponse,
    };
  }

  createUserResponse({
    _id,
    region,
    badgeNumber,
    brigadeNumber,
    email,
    fullName,
    role,
  }: IUser): UserResponse {
    return {
      _id: String(_id),
      region,
      badgeNumber,
      brigadeNumber,
      email,
      fullName,
      role,
    };
  }
}
