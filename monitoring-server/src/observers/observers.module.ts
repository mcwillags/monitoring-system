import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SCHEMAS_NAMES } from '../common';

import { ObserverSchema } from './observers.model';
import { ObserversService } from './observers.service';
import { ObserversController } from './observers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SCHEMAS_NAMES.OBSERVER, schema: ObserverSchema },
    ]),
  ],
  providers: [ObserversService],
  controllers: [ObserversController],
  exports: [ObserversService, MongooseModule],
})
export class ObserversModule {}
