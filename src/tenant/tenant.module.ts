import { Global, Module, Scope } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { REQUEST } from '@nestjs/core';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [TenantController],
  providers: [
    TenantService,
    {
      provide: 'CONNECTION',
      scope: Scope.REQUEST,
      useFactory: async (request: Request, service: TenantService) => {
        const tenantId = request.headers['tenant-id'] || '888a3849-6c21-4c5b-b308-8cf4086d3c23'
        if (!tenantId) {
          throw new Error('Tenant ID is required');
        }
        return service.getDataSource(tenantId);
      },
      inject: [REQUEST, TenantService],
    },
  ],
  exports: [TenantService, 'CONNECTION']
})
export class TenantModule {}
