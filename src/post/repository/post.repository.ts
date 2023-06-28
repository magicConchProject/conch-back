import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from 'src/group/entities/group.entity';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class PostRepository {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  /**
   * @description 포스트 생성 함수
   * @param post
   * @param user
   * @returns
   */
  async create(post: CreatePostDto, user: User): Promise<Post | null> {
    const group = await this.groupRepository.findBy({
      id: In([post.group_id]),
    });

    const tag = await this.tagRepository.findBy({
      id: In([post.tag_id]),
    });

    const myPost = new Post();
    myPost.title = post.title;
    myPost.contents = post.contents;
    myPost.group = group[0];
    myPost.tag = tag[0];
    myPost.user = user;

    return await this.postRepository.save(myPost);
  }

  /**
   * @description 그룹 아이디에 해당하는 포스트 리스트 반환
   * @todo 페이지네이션 추가 구현 필요
   * @param groupId
   */
  async findAll(
    group_Id: number,
    page: number,
    limit: number,
    order: string,
    searchOption: string,
    search: string,
    user_id: number,
    tag_id: number | null,
  ) {
    // const page = 3;
    // const limit = 6;
    const offset = (page - 1) * limit;

    // console.log(postsCount, Math.ceil(postsCount / 5));

    if (searchOption == 'name') searchOption = 'user.name';
    else if (searchOption == 'title') searchOption = 'post.title';

    const queryBuilder = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.postDate',
        'post.views',
        'user.name',
      ])
      .where('post.group_id = :group_Id', { group_Id })
      .orderBy(`post.${order}`, 'DESC')
      .andWhere(`${searchOption} LIKE :search`, { search: `%${search}%` })
      .skip(offset)
      .take(limit);

    if (tag_id.toString() != 'null') {
      // console.log(tag_id.toString() == 'null', typeof tag_id);

      queryBuilder.andWhere(`post.tag_id = :tag_id`, { tag_id });
    }

    const [posts, total] = await queryBuilder.getManyAndCount();

    const group = await this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.manager', 'user')
      .select(['group.name', 'user.id'])
      .where('group.id = :group_Id', { group_Id })
      .getOne();

    // console.log(group);
    const isManager = group.manager.id === user_id;

    delete group.manager;
    return { posts, total, group, isManager };
  }

  async findOne(post_id: number, user_id: number) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.tag', 'tag')
      .select([
        'post.id',
        'post.title',
        'post.postDate',
        'post.views',
        'post.contents',
        'user.name',
        'user.id',
        'tag.id',
      ])
      .where('post.id = :post_id', { post_id })
      .getOne();

    // console.log(post.user);
    const isEditable = post.user.id === user_id;

    delete post.user.id;
    return { post, isEditable };
  }

  /**
   * @description 특정 유저가 작성한 게시글 리스트 가져오기
   * @param userId
   * @returns
   */
  async findMyAll(userId: number, groupId: number) {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.group', 'group')
      .select([
        'post.id',
        'post.title',
        'post.postDate',
        'post.views',
        'group.name',
      ])
      .where('post.user = :userId', { userId })
      .andWhere('post.group = :groupId', { groupId })
      .orderBy('post.postDate', 'DESC')
      .getMany();
  }

  /**
   * @description 포스트 수정
   * @param postId
   * @param title
   * @param contents
   * @returns
   */
  async editPost(
    postId: number,
    title: string,
    contents: string,
    tag_id: number | null,
  ) {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (tag_id) {
      const tagEntity = await this.tagRepository.findOne({
        where: { id: tag_id },
      });
      post.tag = tagEntity;
    } else {
      post.tag = null;
    }

    post.title = title;
    post.contents = contents;

    await this.postRepository.save(post);

    return { message: 'success' };
  }
  async plusView(postId: number) {
    await this.postRepository
      .createQueryBuilder()
      .update('post')
      .set({
        views: () => 'views + 1',
      })
      .where('id = :id', { id: postId })
      .execute();

    return { message: 'success' };
  }
  /**
   * @description 포스트 삭제
   * @param postId
   * @returns
   */
  async deletePost(postId: number) {
    await this.postRepository.delete({ id: postId });
    return { message: 'success' };
  }
}
