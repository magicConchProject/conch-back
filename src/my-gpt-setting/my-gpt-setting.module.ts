import { Module } from '@nestjs/common';
import { MyGptSettingService } from './my-gpt-setting.service';
import { MyGptSettingController } from './my-gpt-setting.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { MyGptSetting } from './entities/my-gpt-setting.entity';
import { MyGptSettingRepository } from './repository/my-gpt-setting.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, MyGptSetting]),
  ],
  controllers: [MyGptSettingController],
  providers: [MyGptSettingService, MyGptSettingRepository],
  exports: [MyGptSettingService, MyGptSettingRepository],
})
export class MyGptSettingModule {}
