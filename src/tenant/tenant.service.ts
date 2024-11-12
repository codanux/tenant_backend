import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
@Injectable()
export class TenantService {

  private dataSources: Map<string, DataSource> = new Map();

  constructor(
    @InjectRepository(Tenant) private tenant: Repository<Tenant>,
  ) {}

  async getDataSource(tenantId): Promise<DataSource> {
    try {
      if (this.dataSources.has(tenantId)) {
        return this.dataSources.get(tenantId);
      }

      const tenant = await this.tenant.findOne({ where: { id: tenantId } });
      if (!tenant) {
        throw new HttpException('Tenant not found', 404);
      }

      const dataSourceOptions: DataSourceOptions = {
        type: 'mysql',
        host: tenant.host,
        port: tenant.port,
        username: tenant.username,
        password: tenant.password,
        database: tenant.database,
        // TODO tenant entitiy ignore
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      };
      const dataSource = new DataSource(dataSourceOptions);
      await dataSource.initialize();
      this.dataSources.set(tenantId, dataSource);
      return dataSource;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async create(createTenantDto: CreateTenantDto) {
    return this.tenant.save(createTenantDto);
  }

  findAll() {
    return this.tenant.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  
  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
