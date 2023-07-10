import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { In, Repository } from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  /**
   * @description 비밀번호 없이 특정 유저 조회
   * @param userId
   * @returns userId, username, email
   */
  async findUserByIdWithoutPassword(userId: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: {
        password: false,
      },
    });
    return user;
  }

  /**
   * @description 이메일을 사용해서 유저 조회
   * @param email
   * @returns
   */
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async create(user: CreateUserDto): Promise<User | null> {
    // const { groups, ...users } = user;

    const saltOrRounds = 10;
    user.password = await bcrypt.hash(user.password, saltOrRounds);

    // const muser = this.userRepository.create({ ...users, groups: output });

    return await this.userRepository.save(user);
  }

  async findUserInfo(user_id: number) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.name', 'user.email'])
      .where('id = :id', { id: user_id })
      .getOne();
  }

  async editUserName(user_id: number, name: string) {
    await this.userRepository
      .createQueryBuilder()
      .update('user')
      .set({
        name,
      })
      .where('id = :id', { id: user_id })
      .execute();

    return { message: 'success' };
  }

  async editPassword(user_id: number, password: string) {
    const saltOrRounds = 10;
    password = await bcrypt.hash(password, saltOrRounds);

    await this.userRepository
      .createQueryBuilder()
      .update('user')
      .set({
        password,
      })
      .where('id = :id', { id: user_id })
      .execute();

    return { message: 'success' };
  }

  //일단 보류
  async deleteUser(user_id: number) {}

  //토큰 관련 로직 모음
  //토큰 사용한 만큼 빼는 로직
  async updateToken(user_id: number, token_diff: number) {
    await this.userRepository
      .createQueryBuilder()
      .update('user')
      .set({ token: () => `token - ${token_diff}` })
      .where('id = :id', { id: user_id })
      .execute();
  }

  //토큰 더해주는 로직
  async addToken(user_id: number, token_add: number) {
    await this.userRepository
      .createQueryBuilder()
      .update('user')
      .set({ token: () => `token + ${token_add}` })
      .where('id = :id', { id: user_id })
      .execute();
  }
}
