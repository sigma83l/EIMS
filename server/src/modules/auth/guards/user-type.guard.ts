import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '../types/user-types.enum';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserType = this.reflector.get<string>(
      'userType',
      context.getHandler(),
    );

    if (!requiredUserType) {
      return true; // No userType restriction, allow access
    }

    const { user } = context.switchToHttp().getRequest();

    return user && user.userType === requiredUserType;
  }
}