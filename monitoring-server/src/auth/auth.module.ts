import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { AdminsModule } from '../admins/admins.module';

import { ObserversModule } from '../observers/observers.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, ObserversModule, AdminsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
