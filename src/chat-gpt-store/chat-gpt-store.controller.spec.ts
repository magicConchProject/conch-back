import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptStoreController } from './chat-gpt-store.controller';
import { ChatGptStoreService } from './chat-gpt-store.service';

describe('ChatGptStoreController', () => {
  let controller: ChatGptStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatGptStoreController],
      providers: [ChatGptStoreService],
    }).compile();

    controller = module.get<ChatGptStoreController>(ChatGptStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
