import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEMAS_NAMES } from '../common';

import { AdminSchema } from './admins.model';
import { AdminsService } from './admins.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SCHEMAS_NAMES.ADMIN, schema: AdminSchema },
    ]),
  ],
  providers: [AdminsService],
  exports: [MongooseModule, AdminsService],
})
export class AdminsModule {}
