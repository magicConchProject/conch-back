import { TagRepository } from './repository/tag.repository';
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}
  //태그 생성
  async create(group_id: number, name: string) {
    return await this.tagRepository.create(group_id, name);
  }

  //그룹에 속한 태그 리스트 return
  async findTagsByGroup(group_id: number) {
    return await this.tagRepository.findTagByGroup(group_id);
  }

  //태그 수정
  async edit(tag_id: number, name: string) {
    return await this.tagRepository.editTag(tag_id, name);
  }

  //태그 삭제
  async delete(tag_id: number) {
    return await this.tagRepository.deleteTag(tag_id);
  }
}
