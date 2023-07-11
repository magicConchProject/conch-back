import { Injectable } from '@nestjs/common';
import { CreateMyGptSettingDto } from './dto/create-my-gpt-setting.dto';
import { UpdateMyGptSettingDto } from './dto/update-my-gpt-setting.dto';
import { MyGptSettingRepository } from './repository/my-gpt-setting.repository';

@Injectable()
export class MyGptSettingService {
  constructor(
    private readonly myGptSettingRepository: MyGptSettingRepository,
  ) {}
  create(createMyGptSettingDto: CreateMyGptSettingDto) {
    return 'This action adds a new myGptSetting';
  }

  findAll() {
    return `This action returns all myGptSetting`;
  }

  findOne(user_id: number) {
    return this.myGptSettingRepository.getSetting(user_id);
  }

  update(user_id: number, updateMyGptSettingDto: UpdateMyGptSettingDto) {
    return this.myGptSettingRepository.updateSetting(
      updateMyGptSettingDto,
      user_id,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} myGptSetting`;
  }
}
