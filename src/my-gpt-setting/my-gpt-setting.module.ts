import { Module } from '@nestjs/common';
import { MyGptSettingService } from './my-gpt-setting.service';
import { MyGptSettingController } from './my-gpt-setting.controller';

@Module({
  controllers: [MyGptSettingController],
  providers: [MyGptSettingService]
})
export class MyGptSettingModule {}
