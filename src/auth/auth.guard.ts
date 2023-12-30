import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, Role } from './auth.decorator';
import { UsersService } from 'src/users/users.service';

  

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector, private usersService: UsersService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (requiredRoles == undefined) return true; 
      
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: jwtConstants.secret
          }
        );
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }

      if (requiredRoles.length) {
        const user_id = request['user'].id;
        const user = await this.usersService.findOne(user_id);
        return requiredRoles.some((role) => user.role === role);
      }
      
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }