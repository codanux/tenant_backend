import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @UseInterceptors(CacheInterceptor)
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
