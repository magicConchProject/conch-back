import { Test, TestingModule } from '@nestjs/testing';
import { MyGptSettingController } from './my-gpt-setting.controller';
import { MyGptSettingService } from './my-gpt-setting.service';

describe('MyGptSettingController', () => {
  let controller: MyGptSettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyGptSettingController],
      providers: [MyGptSettingService],
    }).compile();

    controller = module.get<MyGptSettingController>(MyGptSettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
