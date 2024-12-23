import { Module } from '@nestjs/common';
import { InovicesService } from './inovices.service';
import { InovicesController } from './inovices.controller';
import { TenantsModule } from 'src/tenants/tenants.module';

@Module({
  imports: [
    TenantsModule
  ],
  controllers: [InovicesController],
  providers: [InovicesService],
})
export class InovicesModule {}
