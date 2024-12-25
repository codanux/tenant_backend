import { HttpException, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { DataSource, DataSourceOptions, Repository } from 'typeorm';
import { Tenant } from './entities/tenant.entity.main';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TenantsService {
  private dataSources: Map<string, DataSource> = new Map();

  constructor(
    @InjectRepository(Tenant) private tenantRepository: Repository<Tenant>,
  ) {}

  async getDataSource(tenantId): Promise<DataSource> {
    try {
      if (this.dataSources.has(tenantId)) {
        return this.dataSources.get(tenantId);
      }

      const tenant = await this.tenantRepository.findOne({ where: { slug: tenantId } });
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
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true
      };
      const dataSource = new DataSource(dataSourceOptions);
      await dataSource.initialize();
      this.dataSources.set(tenantId, dataSource);
      return dataSource;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  
  create(createTenantDto: CreateTenantDto) {
    return this.tenantRepository.save(createTenantDto);
  }

  async findAll(query: any) {
    const { page = 1, itemsPerPage = 10 } = query;
    const q = this.tenantRepository.createQueryBuilder('tenant')
      .take(itemsPerPage)
      .skip((page - 1) * itemsPerPage)
      .orderBy('tenant.id', 'DESC');

    const [rows, count] = await q.getManyAndCount();
    return {
      rows,
      count,
    }
  }

  findOne(id: number) {
    return this.tenantRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new HttpException('Tenant not found', 404);
    }
    Object.assign(tenant, updateTenantDto);
    await this.tenantRepository.save(tenant);
    return tenant;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}

