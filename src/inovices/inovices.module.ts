import { Module } from '@nestjs/common';
import { InovicesService } from './inovices.service';
import { InovicesController } from './inovices.controller';

@Module({
  controllers: [InovicesController],
  providers: [InovicesService],
})
export class InovicesModule {}
