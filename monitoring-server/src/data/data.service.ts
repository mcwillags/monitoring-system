import { Injectable } from '@nestjs/common';
import { REGIONS } from '../common';

@Injectable()
export class DataService {
  getAvailableRegions() {
    return REGIONS;
  }
}