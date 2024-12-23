import {
    Body,
    Controller,
    Get,
    Post,
    Req
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './decorators/public.decorator';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Public()
    @Post('login')
    login(@Body() data: LoginUserDto) {
      return this.authService.login(data);
    }
  
    @Get('me')
    me(@Req() req: any) {
      return req.user;
    }
  }
  