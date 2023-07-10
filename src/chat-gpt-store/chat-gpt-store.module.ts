import { Module } from '@nestjs/common';
import { ChatGptStoreService } from './chat-gpt-store.service';
import { ChatGptStoreController } from './chat-gpt-store.controller';

@Module({
  controllers: [ChatGptStoreController],
  providers: [ChatGptStoreService]
})
export class ChatGptStoreModule {}
