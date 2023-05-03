// src/articles/dto/create-article.dto.ts

import { User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto implements Pick<User, 'username' | 'password'> {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
