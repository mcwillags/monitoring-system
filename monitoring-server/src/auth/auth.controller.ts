import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import {
  JoiValidationPipe,
  JwtAuthGuard,
  UserRole,
  RoleGuard,
  RoleDecorator,
} from '../common';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../user/dto';
import { createUserJoi } from '../user/user.model';

import { loginCredentialsJoi, LoginCredentials } from '../common/auth';
import { createAdminJoi } from '../admins/admins.model';
import { CreateAdminDto } from '../admins/dto';

import { CreateObserverDto } from '../observers/dto';
import { createObserverJoi } from '../observers/observers.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register/user')
  @UsePipes(new JoiValidationPipe(createUserJoi))
  registerUser(@Body() userCredentials: CreateUserDto) {
    return this.authService.registerUser(userCredentials);
  }

  @Post('/register/admin')
  @UsePipes(new JoiValidationPipe(createAdminJoi))
  registerAdmin(@Body() adminCredentials: CreateAdminDto) {
    return this.authService.registerAdmin(adminCredentials);
  }

  @RoleDecorator([UserRole.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UsePipes(new JoiValidationPipe(createObserverJoi))
  @Post('/register/observer')
  registerObserver(@Body() observerCredentials: CreateObserverDto) {
    return this.authService.registerObserver(observerCredentials);
  }

  @Post('/login')
  @UsePipes(new JoiValidationPipe(loginCredentialsJoi))
  loginUser(@Body() userCredentials: LoginCredentials) {
    return this.authService.login(userCredentials);
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  tokenAuth(@Req() req) {
    return this.authService.tokenAuth(req);
  }
}
