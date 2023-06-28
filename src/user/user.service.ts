import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { SigninUserDto } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * @description 유저 생성 함수
   * @param createUserDto (email, username, password, group)
   * @returns email, username, group
   */
  async createUser(createUserDto: CreateUserDto) {
    // 유저 중복 등록 방지를 위해 새로운 유저를 생성하기 전 디비에 중복된 이메일을 가진 유저가 있는지 검사
    const isUserExist = await this.userRepository.findUserByEmail(
      createUserDto.email,
    );

    // 유저가 이미 존재 한다면 인증 오류 403 을 발생
    if (isUserExist) {
      throw new UnauthorizedException('해당 이메일은 이미 존재합니다.');
    }

    // 유저 생성
    const res = await this.userRepository.create(createUserDto);
    // 그룹 지정에 문재가 생겼을 경우 400 발생
    if (!res) throw new BadRequestException('not found group');
    //비밀번호만 빼고
    const { password, ...userinfo } = res;
    // 유저 정보 리턴
    return userinfo;
  }

  /**
   * @description 로그인 로직
   * @param data
   * @returns
   */
  async jwtLogin(data: SigninUserDto) {
    const { email, password } = data;

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('이메일을 확인해 주세요');
    }

    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호를 확인해주세요');
    }

    const payload = { email: email, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * @description 토큰 검증해서 인증된 유저인지 검증하는 함수
   * @param token jwt 토큰
   * @returns 유저 이름(name)
   */
  async verifyToken(token: string) {
    const payload = this.jwtService.verify(token);
    const user = await this.userRepository.findUserByIdWithoutPassword(
      payload.sub,
    );

    if (user) {
      return { name: user.name, premium: user.premium };
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }

/**
 * @description 유저 정보 조회
 * @param user_id 
 * @returns 
 */
  async findUserInfo(user_id: number) {
    return this.userRepository.findUserInfo(user_id);
  }

  /**
   * @description name 
   * @param user_id 
   * @param name 
   * @returns 
   */
  async editUserName(user_id: number, name: string) {
    return this.userRepository.editUserName(user_id , name);
  }

  /**
   * @description password 
   * @param user_id 
   * @param password 
   * @returns 
   */
  async editUserPassword(user_id: number, password: string) {
    return this.userRepository.editPassword(user_id, password)
  }
}
