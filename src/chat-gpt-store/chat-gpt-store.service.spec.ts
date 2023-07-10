import { Test, TestingModule } from '@nestjs/testing';
import { ChatGptStoreService } from './chat-gpt-store.service';

describe('ChatGptStoreService', () => {
  let service: ChatGptStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGptStoreService],
    }).compile();

    service = module.get<ChatGptStoreService>(ChatGptStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
