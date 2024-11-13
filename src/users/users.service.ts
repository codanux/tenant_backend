import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private user: Repository<User>;

  constructor(
    @Inject('CONNECTION') private readonly connection: DataSource
  ) {
    this.user = connection.getRepository(User);
  }

  create(createUserDto: CreateUserDto) {
    return this.user.save(createUserDto);
  }

  async findAll() {
    const q = this.user.createQueryBuilder('user');
    const [rows, count] = await q.getManyAndCount();
    return { rows, count };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.user.findOne({ where: { id } });
    if (!user) {
      return 'User not found';
    }
    return this.user.save({ ...user, ...updateUserDto });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
