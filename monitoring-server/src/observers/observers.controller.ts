import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard, RoleDecorator, RoleGuard, UserRole } from '../common';

import { ObserversService } from './observers.service';
import { ChangeRegionDto, ChangePasswordDto } from './dto';

@Controller('observers')
export class ObserversController {
  constructor(private observerService: ObserversService) {}

  @RoleDecorator([UserRole.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/')
  getObservers() {
    return this.observerService.getAllObservers();
  }

  @RoleDecorator([UserRole.OBSERVER, UserRole.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('/password')
  changeObserverPassword(@Req() request, @Body() dto: ChangePasswordDto) {
    return this.observerService.changePassword(request, dto);
  }

  @RoleDecorator([UserRole.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('/:id')
  changeObserverRegion(@Req() request, @Body() dto: ChangeRegionDto) {
    return this.observerService.changeObserverRegion(request, dto);
  }
}
