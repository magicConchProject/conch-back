import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateMyGptSettingDto } from '../dto/update-my-gpt-setting.dto';
import { MyGptSetting } from '../entities/my-gpt-setting.entity';

@Injectable()
export class MyGptSettingRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(MyGptSetting)
    private readonly myGptSetting: Repository<MyGptSetting>,
  ) {}

  async getSetting(user_id: number) {
    return await this.myGptSetting
      .createQueryBuilder('my_gpt_setting')
      .where('userId = :user_id', { user_id })
      .getOne();
  }

  /**
   * gpt setting 값 전체 나옴
   */
  async updateSetting(setting: UpdateMyGptSettingDto, user_id: number) {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    const existingSetting = await this.myGptSetting.findOne({
      where: { user: user },
      relations: ['user'],
    });
    if (existingSetting) {
      return await this.myGptSetting
        .createQueryBuilder()
        .update('my_gpt_setting')
        .set(setting)
        .where('userId = :user_id', { user_id })
        .execute();
    }
    return await this.myGptSetting.save(
      this.myGptSetting.create({ user, ...setting }),
    );
  }
}
