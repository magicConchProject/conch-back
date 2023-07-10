import { Injectable } from '@nestjs/common';
import { CreateMyGptSettingDto } from './dto/create-my-gpt-setting.dto';
import { UpdateMyGptSettingDto } from './dto/update-my-gpt-setting.dto';

@Injectable()
export class MyGptSettingService {
  create(createMyGptSettingDto: CreateMyGptSettingDto) {
    return 'This action adds a new myGptSetting';
  }

  findAll() {
    return `This action returns all myGptSetting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} myGptSetting`;
  }

  update(id: number, updateMyGptSettingDto: UpdateMyGptSettingDto) {
    return `This action updates a #${id} myGptSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} myGptSetting`;
  }
}
