import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signInDto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @Post('login')
  signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto.email, SignInDto.password);
  }
  
}