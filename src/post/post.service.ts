import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/entities/user.entity';
import { PostRepository } from './repository/post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}
  async create(createPostDto: CreatePostDto, user: User) {
    return await this.postRepository.create(createPostDto, user);
  }

  async findAll(
    group_id: number,
    page: number,
    limit: number,
    order: string,
    searchOption: string,
    search: string,
    user_id: number,
    tag_id: number,
  ) {
    return await this.postRepository.findAll(
      group_id,
      page,
      limit,
      order,
      searchOption,
      search,
      user_id,
      tag_id,
    );
  }

  async findOne(post_id: number, user_id: number) {
    return await this.postRepository.findOne(post_id, user_id);
  }

  async findMyAll(user_id: number, group_id: number) {
    return await this.postRepository.findMyAll(user_id, group_id);
  }

  async update(
    id: number,
    title: string,
    contents: string,
    tag_id: number | null,
  ) {
    return await this.postRepository.editPost(id, title, contents, tag_id);
  }

  async plusView(id: number) {
    return await this.postRepository.plusView(id);
  }

  async remove(id: number) {
    return await this.postRepository.deletePost(id);
  }
}
