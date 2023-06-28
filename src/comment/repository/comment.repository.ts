import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/group/entities/group.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { In, Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Post>,
  ) {}

  /**
   * @description 댓글 디비 저장 함수
   * @param user
   * @param comment
   * @returns
   */
  async create(comment: CreateCommentDto, user: User): Promise<Comment | null> {
    const post = await this.postRepository.findBy({
      id: In([comment.post_id]),
    });

    const myComment = new Comment();
    myComment.comment = comment.comment;
    myComment.post = post[0];
    myComment.user = user;

    return await this.commentRepository.save(myComment);
  }

  /**
   * @description 포스트 아이디에 해당하는 댓글 리스트 반환
   * @param post_Id
   * @returns
   */
  async findAll(post_Id: number, user_id: number) {
    const comments: any = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .select([
        'comment.id',
        'comment.commentDate',
        'comment.comment',
        'user.name',
      ])
      .addSelect(`(comment.user = ${user_id}) as isEditable`)
      .where('comment.post_id = :post_Id', { post_Id })
      .orderBy('comment.commentDate', 'ASC')
      .getRawMany();

    // console.log(comments);
    return comments;
  }

  async findMyAll(user_Id: number) {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.post', 'post')
      .select(['comment', 'post.title'])
      .where('comment.user = :user_Id', { user_Id })
      .orderBy('comment.commentDate', 'DESC')
      .getMany();

    return comments;
  }

  async editComment(commentId: number, comment: string) {
    await this.commentRepository
      .createQueryBuilder()
      .update('comment')
      .set({
        comment,
      })
      .where('id = :id', { id: commentId })
      .execute();

    return { message: 'success' };
  }

  async deleteComment(commentId: number) {
    await this.commentRepository.delete({ id: commentId });

    return { message: 'success' };
  }
}
