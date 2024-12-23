import { Global, HttpException, Module, Scope } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity.main';
import { REQUEST } from '@nestjs/core';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [TenantsController],
  providers: [
    TenantsService,
    {
      provide: 'CONNECTION',
      scope: Scope.REQUEST,
      useFactory: async (request: Request, service: TenantsService) => {
        const tenantId = request.headers['tenant']
        if (!tenantId) {
          throw new HttpException('Tenant not found', 404);
        }
        return service.getDataSource(tenantId);
      },
      inject: [REQUEST, TenantsService],
    },
  ],
  exports: [TenantsService, 'CONNECTION']
})
export class TenantsModule {}
