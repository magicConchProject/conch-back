import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { GroupRepository } from './repository/group.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(createGroupDto: CreateGroupDto) {
    // await this.groupRepository.save(createGroupDto);
    const isGroupExist = await this.groupRepository.findGroupByName(
      createGroupDto.name,
    );

    //그룹이 이미 존재 한다면 인증 오류 발생
    if (isGroupExist) {
      throw new UnauthorizedException('해당 그룹은 이미 존재합니다.');
    }

    //그룹 생성
    const res = await this.groupRepository.create(createGroupDto);
    return res;
  }

  //내가 참여중인 그룹 리스트
  async findAll(userId: number) {
    const groups = await this.groupRepository.findAll(userId);
    return groups;
  }

  //그룹 조회
  async search(userId: number, search: string) {
    const groups = await this.groupRepository.serachGroups(userId, search);
    return groups;
  }

  //그룹장이 나인 그룹 리스트
  async fundMyAll(userId: number) {
    return await this.groupRepository.findMyAll(userId);
  }
  //그룹장이 내가 아닌 참여중이 그룹 리스트
  async findNotMyAll(userId: number) {
    return await this.groupRepository.findNotMyAll(userId);
  }

  //그룹 탈퇴
  async canellationGroup(userGroupId: number, groupId: number) {
    return await this.groupRepository.canellationGroup(userGroupId, groupId);
  }

  //그룹 이름 갱신
  async update(id: number, name: string) {
    return await this.groupRepository.editGroupInfo(id, name);
  }

  //그룹 삭제
  async remove(id: number) {
    return await this.groupRepository.deleteGroup(id);
  }

  //그룹 참여, 허용, 조회, 거절=======================
  async participate(user: User, group: Group) {
    return await this.groupRepository.participateGroups(user, group);
  }

  async findAllParticipation(userId: number) {
    return await this.groupRepository.findAllParticipation(userId);
  }

  async acceptParticipation(userGroupId: number) {
    return await this.groupRepository.acceptParticipation(userGroupId);
  }

  async denyParticipation(userGroupId: number, groupId: number) {
    return await this.groupRepository.denyParticipation(userGroupId, groupId);
  }
  //====================================================
}
