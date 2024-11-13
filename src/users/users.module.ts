import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TenantsModule } from 'src/tenants/tenants.module';

@Module({
  imports: [
    TenantsModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
