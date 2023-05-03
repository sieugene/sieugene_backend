import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  async all() {
    return this.prisma.post.findMany();
  }
  async create(post: Prisma.PostCreateInput) {
    return this.prisma.post.create({
      data: post,
    });
  }
  async findFirst(where: Prisma.PostFindFirstArgs['where']) {
    return this.prisma.post.findFirst({
      where,
    });
  }
  async update(id: Post['id'], data: Prisma.PostUpdateArgs['data']) {
    return this.prisma.post.update({
      where: {
        id,
      },
      data,
    });
  }
  async delete(id: Post['id']) {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
