import { Body, Controller, Post, Patch, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signInDto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Auth } from './auth.decorator';
import { Throttle } from '@nestjs/throttler';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  
  @Post('login')
  signIn(@Body() SignInDto: SignInDto) {
    return this.authService.signIn(SignInDto.email, SignInDto.password);
  }
  
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('register')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Auth()
  @Patch('update')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req.user;
    return this.authService.update(id, updateUserDto);
  }

}