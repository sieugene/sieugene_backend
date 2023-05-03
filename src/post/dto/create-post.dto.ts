import { IsDate, IsString } from 'class-validator';

import { Post } from '@prisma/client';

export class CreatePostDto implements Omit<Post, 'id'> {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  link: string;

  @IsString()
  category: string;

  @IsString()
  content: string;

  @IsString()
  date: Date;
}
