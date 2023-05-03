import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtReqPayloadUser } from './auth.types';

import { jwtConstants } from './constants';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    try {
      const user = await this.usersService.findOne(username);
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }
      const { password, ...result } = user;
      return {
        ...result,
      };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(user: User | Pick<User, 'username'>) {
    const existUser = await this.usersService.findOne(user.username);
    if (!existUser) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const payload: JwtReqPayloadUser = {
        username: existUser.username,
        sub: existUser.userId,
      };
      const token = this.jwtService.sign(payload);
      const cookie = this.getCookieWithJwtToken(token);
      return {
        access_token: token,
        cookie,
      };
    }
  }
  public getCookieWithJwtToken(token: string) {
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${jwtConstants.expiresIn}`;
  }
}
