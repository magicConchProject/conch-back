import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Group } from '../entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroupDto } from '../dto/create-group.dto';
import { User } from 'src/user/entities/user.entity';
import { UserGroup } from 'src/usergroup/entities/usergroup.entity';

@Injectable()
export class GroupRepository {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserGroup)
    private readonly userGroupRepository: Repository<UserGroup>,
  ) {}

  async findGroupByName(name: string): Promise<Group | null> {
    const group = await this.groupRepository.findOne({
      where: { name: name },
    });

    return group;
  }

  /**
   * @description 그룹 생성 함수
   * @param group 그룹 이름 + user
   * @returns Group
   */
  async create(group: CreateGroupDto): Promise<Group | null> {
    //memeberCount = 1;
    //manager = id;

    const myGroup: any = {
      name: group.name,
      manager: group.user,
      memberCount: 1,
    };

    const newGroup = await this.groupRepository.save(myGroup);

    const userGroup = new UserGroup();
    userGroup.user = group.user;
    userGroup.group = newGroup;
    userGroup.joined = true;

    await this.userGroupRepository.save(userGroup);

    return newGroup;
  }

  /**
   * @description 유저 아이디에 해당하는 그룹 리스트 반환
   * @param userId
   * @returns
   */
  async findAll(userId: number) {
    const groups = await this.userGroupRepository
      .createQueryBuilder('userGroup')
      .leftJoinAndSelect('userGroup.group', 'group')
      .leftJoinAndSelect('group.manager', 'manager')
      .select(['userGroup', 'group', 'manager.name', 'manager.id'])
      .where('userGroup.user = :userId', { userId })
      .getMany();

    return groups;
  }

  /**
   * @description 내 그룹(내가 주인인)
   * @param userId
   * @returns
   */
  async findMyAll(userId: number) {
    return await this.groupRepository
      .createQueryBuilder('group')
      .where('group.manager = :userId', { userId })
      .getMany();
  }

  /**
   * @description 내가 주인이 아닌 그룹
   * @param userId
   * @returns
   */
  async findNotMyAll(userId: number) {
    return await this.userGroupRepository
      .createQueryBuilder('userGroup')
      .leftJoinAndSelect('userGroup.group', 'group')
      .leftJoinAndSelect('group.manager', 'manager')
      .select(['userGroup', 'group', 'manager.name', 'manager.id'])
      .where('userGroup.user = :userId', { userId })
      .andWhere('manager.id != :userId', { userId })
      .getMany();
  }

  /**
   * @description 그룹 탈퇴하기
   * @param userGroupId
   * @returns
   */
  async canellationGroup(userGroupId: number, groupId: number) {
    await this.userGroupRepository.delete({ id: userGroupId });

    //멤버 수 재계산
    const count = await this.userGroupRepository
      .createQueryBuilder('userGroup')
      .where('userGroup.group = :groupId', { groupId: groupId })
      .getCount();

    await this.groupRepository
      .createQueryBuilder()
      .update('group')
      .set({
        memberCount: count,
      })
      .where('id = :id', { id: groupId })
      .execute();

    return { message: 'success' };
  }

  /**
   * @description 그룹 수정 - 이름 밖에 없긴함
   * @param groupId 그룹 아이디
   * @param name 그룹 이름
   * @returns `{ message: 'success' };`
   */
  async editGroupInfo(groupId: number, name: string) {
    await this.groupRepository
      .createQueryBuilder()
      .update('group')
      .set({
        name,
      })
      .where('id = :id', { id: groupId })
      .execute();

    return { message: 'success' };
  }

  /**
   * @description 그룹 삭제
   * @param groupId
   * @returns
   */
  async deleteGroup(groupId: number) {
    await this.groupRepository.delete({ id: groupId });

    return { message: 'success' };
  }

  /**
   * @description 그룹 검색 함수
   * @param userId 검색자 (유저 ID)
   * @param search 검색어
   * @returns groups[]
   */
  async serachGroups(userId: number, search: string) {
    const groups = await this.groupRepository
      .createQueryBuilder('group')
      .leftJoin('group.userGroups', 'userGroup', 'userGroup.user = :userId', {
        userId,
      })
      .where('userGroup.user IS NULL')
      .andWhere('group.name LIKE :name', { name: `%${search}%` })
      .getMany();

    return groups;
  }

  /**
   * @description 참가신청 - usergroup에 추가
   * @param userId 참가자
   * @param groupId 그룹
   */
  async participateGroups(user: User, group: Group) {
    const userGroup = new UserGroup();
    userGroup.user = user;
    userGroup.group = group;
    userGroup.joined = false;

    await this.userGroupRepository.save(userGroup);

    const count = await this.userGroupRepository
      .createQueryBuilder('userGroup')
      .where('userGroup.group = :groupId', { groupId: group.id })
      .getCount();

    await this.groupRepository
      .createQueryBuilder()
      .update('group')
      .set({
        memberCount: count,
      })
      .where('id = :id', { id: group.id })
      .execute();

    return { message: 'success' };
  }

  /**
   * @description 내가 주인인거에 대한 업데이트 해야할
   * @param userId
   * @returns
   */
  async findAllParticipation(userId: number) {
    const mygroup = await this.userGroupRepository
      .createQueryBuilder('userGroup')
      .leftJoinAndSelect('userGroup.group', 'group')
      .leftJoinAndSelect('userGroup.user', 'user')
      .leftJoinAndSelect('group.manager', 'manager')
      .select(['userGroup', 'group', 'manager.name', 'manager.id', 'user.name'])
      .where('manager.id = :userId', { userId })
      .andWhere('userGroup.joined = 0')
      .getMany();

    return mygroup;
  }

  /**
   * @description 유저 참여 요청 허용
   * @param userGroupId
   * @returns
   */
  async acceptParticipation(userGroupId: number) {
    await this.userGroupRepository
      .createQueryBuilder()
      .update('user_group')
      .set({
        joined: true,
      })
      .where('id = :id', { id: userGroupId })
      .execute();

    return { message: 'success' };
  }

  /**
   * @description 유저 참여 거부
   * @param userGroupId
   * @param groupId
   * @returns
   */
  async denyParticipation(userGroupId: number, groupId: number) {
    await this.userGroupRepository.delete({ id: userGroupId });
    const count = await this.userGroupRepository
      .createQueryBuilder('userGroup')
      .where('userGroup.group = :groupId', { groupId: groupId })
      .getCount();
    await this.groupRepository
      .createQueryBuilder()
      .update('group')
      .set({
        memberCount: count,
      })
      .where('id = :id', { id: groupId })
      .execute();

    return { message: 'success' };
  }
}
