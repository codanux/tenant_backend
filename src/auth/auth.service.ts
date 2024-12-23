
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import admin from 'firebase-admin';
import * as serviceAccount from './firebase.json';
import { LoginUserDto } from './dto/login-user.dto';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private logger = new Logger(AuthService.name);

  async login(data: LoginUserDto): Promise<{ token: string, user: any }> {
    try {
      const { name, picture, email, uid } = await admin.auth().verifyIdToken(data.token);;
      let user = await this.usersService.findOne(email);
      if (!user) {
        user = await this.usersService.create({
          name,
          email,
          picture,
          uid,
        });
      }
    
      const payload = { id: user.id, email: user.email };
      return {
        token: await this.jwtService.signAsync(payload, { expiresIn: '365d' }),
        user
      };
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }

  }
}
