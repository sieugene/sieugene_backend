import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: User['username']) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async create(user: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const isExist = await this.findOne(user?.username);
    if (!isExist) {
      const createdUser = await this.prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });

      const { password, ...result } = createdUser;
      return {
        ...result,
        password: undefined,
      };
    }
    throw new HttpException(
      'User with that username already exists',
      HttpStatus.BAD_REQUEST,
    );
  }
}
