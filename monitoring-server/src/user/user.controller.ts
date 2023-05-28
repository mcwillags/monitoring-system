import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ChangeBrigadeDto,
  ChangePasswordDto,
  GetRegionBrigadesDto,
  ChangeMonitoringSettingsDto,
} from './dto';
import { changeMonitoringSettingsJoi } from './user.model';
import {
  JoiValidationPipe,
  JwtAuthGuard,
  RoleDecorator,
  RoleGuard,
  UserRole,
} from '../common';

@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @RoleDecorator([UserRole.OBSERVER, UserRole.ADMIN])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/brigades')
  getBrigadesByRegion(@Body() body: GetRegionBrigadesDto) {
    return this.usersService.getBrigadesByRegion(body);
  }

  @RoleDecorator([UserRole.USER])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('/password')
  changeUserPassword(@Body() dto: ChangePasswordDto, @Req() request) {
    return this.usersService.changeUserPassword(dto, request);
  }

  @RoleDecorator([UserRole.USER])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/monitoring-settings')
  changeUserMonitoringSettings(
    @Body() dto: ChangeMonitoringSettingsDto,
    @Req() request,
  ) {
    return this.usersService.changeUserMonitoringSettings(dto, request);
  }

  @RoleDecorator([UserRole.USER])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @UsePipes(new JoiValidationPipe(changeMonitoringSettingsJoi))
  @Get('/monitoring-settings')
  getUserMonitoringSettings(@Req() request) {
    return this.usersService.getUserMonitoringSettings(request);
  }

  @RoleDecorator([UserRole.USER])
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('/brigade')
  changeUserBrigade(@Body() dto: ChangeBrigadeDto, @Req() request) {
    return this.usersService.changeUserBrigade(dto, request);
  }
}
