import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { handleCreateResponser, isValidRegion } from '../common/utils';
import { UserRole } from '../common';

import { CreateObserverDto } from '../observers/dto';
import { ObserversService } from '../observers/observers.service';
import { IObserver } from '../observers/observers.model';

import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.model';

import { AdminsService } from '../admins/admins.service';
import { IAdmin } from '../admins/admins.model';
import { CreateAdminDto } from '../admins/dto';

import {
  JWTAdminPayload,
  JWTObserverPayload,
  JWTUserPayload,
  LoginCredentials,
} from '../common/auth';

import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private observerService: ObserversService,
    private adminService: AdminsService,
  ) {}

  async login({ email, password, role }: LoginCredentials) {
    const { config, generateTokenResponse, handleAuthInit } =
      handleCreateResponser<
        IUser | IObserver | IAdmin,
        JWTUserPayload | JWTObserverPayload | JWTAdminPayload
      >();

    switch (role) {
      case UserRole.USER:
        await handleAuthInit(this.userService, email);
        break;

      case UserRole.OBSERVER:
        await handleAuthInit(this.observerService, email);
        break;

      case UserRole.ADMIN:
        await handleAuthInit(this.adminService, email);
        break;

      default:
        throw new HttpException('Invalid user role', HttpStatus.BAD_REQUEST);
    }

    if (!config.user) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      config.user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    return generateTokenResponse(this.createToken);
  }

  async registerUser(dto: CreateUserDto) {
    const isEmailTaken = await this.userService.findByEmail(dto.email);

    if (isEmailTaken) {
      throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST);
    }

    if (!isValidRegion(dto.region)) {
      throw new HttpException(
        'Invalid region selected',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });

    return this.userService.createTokenResponse(user, this.createToken);
  }

  async registerAdmin(dto: CreateAdminDto) {
    const isEmailTaken = await this.adminService.findByEmail(dto.email);

    if (isEmailTaken) {
      throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST);
    }

    const isRegisterCodeCorrect = await bcrypt.compare(
      dto.registerCode,
      process.env.ADMIN_KEY,
    );

    if (!isRegisterCodeCorrect) {
      throw new HttpException(
        'Invalid register code provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.adminService.createUser({
      ...dto,
      password: hashedPassword,
    });

    return this.adminService.createTokenResponse(user, this.createToken);
  }

  async registerObserver(dto: CreateObserverDto) {
    const isEmailTaken = await this.observerService.findByEmail(dto.email);

    if (isEmailTaken) {
      throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST);
    }

    if (!isValidRegion(dto.region)) {
      throw new HttpException(
        'Invalid region selected',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.observerService.createUser({
      ...dto,
      password: hashedPassword,
    });

    return this.observerService.createAuthResponse(user);
  }

  async tokenAuth(req) {
    const role: UserRole = req.user.role;
    const email: string = req.user.email;

    const { config, generateAuthResponse, handleAuthInit } =
      handleCreateResponser<
        IUser | IAdmin | IObserver,
        JWTUserPayload | JWTObserverPayload | JWTAdminPayload
      >();

    switch (role) {
      case UserRole.USER:
        await handleAuthInit(this.userService, email);
        break;

      case UserRole.OBSERVER:
        await handleAuthInit(this.observerService, email);
        break;

      case UserRole.ADMIN:
        await handleAuthInit(this.adminService, email);
        break;

      default:
        throw new HttpException('Server error', HttpStatus.BAD_REQUEST);
    }

    if (!config.user) {
      throw new HttpException(
        'There is no user with such email',
        HttpStatus.FORBIDDEN,
      );
    }

    return generateAuthResponse();
  }

  private createToken(
    payload: JWTAdminPayload | JWTObserverPayload | JWTUserPayload,
  ) {
    return jwt.sign(payload, process.env.JWT_AUTH_KEY, {
      expiresIn: '24h',
    });
  }
}
