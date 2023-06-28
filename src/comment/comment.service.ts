import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './repository/comment.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async create(createCommentDto: CreateCommentDto, user: User) {
    return await this.commentRepository.create(createCommentDto, user);
  }

  async findAll(post_id: number, user_id: number) {
    return await this.commentRepository.findAll(post_id, user_id);
  }

  async findMyAll(user_id: number) {
    return await this.commentRepository.findMyAll(user_id);
  }

  async update(id: number, comment: string) {
    return await this.commentRepository.editComment(id, comment);
  }

  async remove(id: number) {
    return await this.commentRepository.deleteComment(id);
  }
}
