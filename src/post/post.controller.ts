import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import {
  PostNotFoundPipe,
  PostNotFoundPipeData,
} from './pipes/PostNotFound.pipe';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('all')
  async getAllPosts() {
    return this.postService.all();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  createUser(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteRpc(
    @Param('id', ParseIntPipe, PostNotFoundPipe)
    { post }: PostNotFoundPipeData,
  ) {
    await this.postService.delete(post.id);
    return true;
  }
}
