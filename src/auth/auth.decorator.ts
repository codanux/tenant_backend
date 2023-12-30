import { SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export enum Role {
    User = 'user',
    Admin = 'admin',
}

export const ROLES_KEY = 'roles';
export const Auth = (...roles: Role[]) => {

  return applyDecorators(
    ApiBearerAuth(),
    SetMetadata(ROLES_KEY, roles),
  )
};