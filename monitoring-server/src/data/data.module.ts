import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';

@Module({
  imports: [],
  providers: [DataService],
  controllers: [DataController],
  exports: [DataService],
})
export class DataModule {}