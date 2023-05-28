import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SCHEMAS_NAMES } from '../common';
import { Model } from 'mongoose';

import { CreateAdminDto } from './dto';
import { IAdmin } from './admins.model';
import {
  AdminResponse,
  AuthResponse,
  CreateToken,
  JWTAdminPayload,
  LoginResponse,
} from '../common/auth';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(SCHEMAS_NAMES.ADMIN)
    private readonly adminModel: Model<IAdmin>,
  ) {}

  async createUser(adminCredentials: CreateAdminDto): Promise<IAdmin> {
    const newAdmin = new this.adminModel(adminCredentials);

    await newAdmin.save();

    return newAdmin;
  }

  findByEmail(email: string) {
    return this.adminModel.findOne({ email });
  }

  createTokenResponse(
    user: IAdmin,
    createToken: CreateToken<JWTAdminPayload>,
  ): LoginResponse<AdminResponse> {
    const token = createToken({
      _id: String(user._id),
      email: user.email,
      role: user.role,
    });

    const adminResponse = this.createAdminResponse(user);

    return {
      token,
      user: adminResponse,
    };
  }

  createAuthResponse(user: IAdmin): AuthResponse<AdminResponse> {
    const adminResponse = this.createAdminResponse(user);

    return {
      user: adminResponse,
    };
  }

  createAdminResponse({ _id, email, role }: IAdmin): AdminResponse {
    return {
      _id: String(_id),
      email,
      role,
    };
  }
}
