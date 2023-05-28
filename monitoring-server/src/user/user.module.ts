import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { SCHEMAS_NAMES } from '../common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SCHEMAS_NAMES.USER, schema: UserSchema },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, MongooseModule],
})
export class UserModule {}