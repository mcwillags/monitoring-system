import { Controller, Get } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private dataService: DataService) {}

  @Get('/available-regions')
  getAvailableRegions() {
    return this.dataService.getAvailableRegions();
  }
}
