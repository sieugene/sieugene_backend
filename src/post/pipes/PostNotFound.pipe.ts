import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { Post } from '@prisma/client';
import { PostService } from '../post.service';

export type PostNotFoundPipeData = {
  id: number;
  post: Post;
};

@Injectable()
export class PostNotFoundPipe implements PipeTransform {
  constructor(private readonly postService: PostService) {}

  async transform(
    id: number,
    metadata: ArgumentMetadata,
  ): Promise<PostNotFoundPipeData> {
    const post = await this.postService.findFirst({
      id,
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return { id, post };
  }
}
