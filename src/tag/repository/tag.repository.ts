import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Group } from 'src/group/entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagRepository {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  /**
   * @description 태그 생성 함수
   * @param group_id 그룹 아이디
   * @param name 태그 이름
   * @returns Tag
   */
  async create(group_id: number, name: string): Promise<Tag | null> {
    const group = await this.groupRepository.findBy({ id: In([group_id]) });

    const myTag = new Tag();
    myTag.name = name;
    myTag.group = group[0];

    return await this.tagRepository.save(myTag);
  }

  /**
   * @description 그룹에 속한 태그 찾기
   * @param group_id 그룹 아이디
   * @returns Tag[]
   */
  async findTagByGroup(group_id: number) {
    const tag = await this.tagRepository
      .createQueryBuilder('tag')
      .where('tag.group_id = :group_id', { group_id })
      .getMany();

    return tag;
  }

  /**
   * @description 태그 수정 함수
   * @param tag_id 태그 아이디
   * @param name 태그 이름
   * @returns `{message : 'success'}`
   */
  async editTag(tag_id: number, name: string): Promise<object> {
    await this.tagRepository
      .createQueryBuilder()
      .update('tag')
      .set({
        name,
      })
      .where('id = :id', { id: tag_id })
      .execute();

    return { message: 'success' };
  }

  /**
   * @description 태그 삭제 함수
   * @param tag_id 태그 아이디
   * @returns `{message: 'success'}`
   */
  async deleteTag(tag_id: number): Promise<object> {
    await this.tagRepository.delete({ id: tag_id });

    return { message: 'success' };
  }
}
