import { UserRole } from '../constants';
import { SetMetadata } from '@nestjs/common';

export const RoleDecorator = (roles: UserRole[]) => SetMetadata('Role', roles);