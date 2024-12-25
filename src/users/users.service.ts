import { HttpException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as crypto from 'crypto';
import { UserBalance } from './entities/user.balance.entity';

@Injectable()
export class UsersService {
  private userRepository: Repository<User>;
  private userBalanceRepository: Repository<UserBalance>;

  constructor(
    @Inject('CONNECTION') private readonly connection: DataSource
  ) {
    this.userRepository = connection.getRepository(User);
    this.userBalanceRepository = connection.getRepository(UserBalance);
  }

  private readonly privateKey = 'my_private_key';

  generateHash(data: any): string {
      const serializedData = JSON.stringify(data);
      return crypto
          .createHmac('sha256', this.privateKey)
          .update(serializedData)
          .digest('hex');
  }

  verifyHash(data: any, hash: string): boolean {
      const calculatedHash = this.generateHash(data);
      return calculatedHash === hash;
  }

  async withdraw(userId: number, amount: number, currency: string) {
    const balances = await this.userBalanceRepository.find({ where: { userId, currency } });

    if (balances.length === 0) {
      throw new HttpException('Insufficient funds', 400);
    }

    let totalAmount = 0;
    for (const balance of balances) {
      const { userId, amount, currency } = balance
      if (this.verifyHash({ userId, amount, currency }, balance.hash)) {
        totalAmount += balance.amount;
      }
      else  {
        throw new HttpException('Data has been tampered', 400);
      }
    }

    if (totalAmount < amount) {
      throw new HttpException('Insufficient funds', 400); 
    }

    await this.deposit(userId, -amount, currency);

    return totalAmount-amount;
  }

  async deposit(userId: number, amount: number, currency: string) {
    const hash = this.generateHash({ userId, amount, currency });
    const balance = await this.userBalanceRepository.save({ userId, amount, currency, hash });
    return balance;
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  async findAll(query) {
    const { page = 1, itemsPerPage = 10, search } = query;
    const q = this.userRepository.createQueryBuilder('user')
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .orderBy('user.id', 'DESC');

    if (search) {
      q.where('user.name LIKE :search', { search: `%${search}%` });
    }

    const [rows, count] = await q.getManyAndCount();
    return { rows, count };
  }

  findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      return 'User not found';
    }
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
