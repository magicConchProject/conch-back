import { Test, TestingModule } from '@nestjs/testing';
import { MyGptSettingService } from './my-gpt-setting.service';

describe('MyGptSettingService', () => {
  let service: MyGptSettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyGptSettingService],
    }).compile();

    service = module.get<MyGptSettingService>(MyGptSettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
