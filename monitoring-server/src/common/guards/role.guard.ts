import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.get<UserRole>('Role', context.getHandler());

      if (!roles) {
        return true;
      }


      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!roles.includes(user.role)) {
        throw new ForbiddenException({ message: 'Not allowed ' });
      }

      return true;

    } catch (err) {
      throw new ForbiddenException({ message: 'Not allowed ' });
    }
  }
}
