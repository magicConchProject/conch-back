import { Module } from '@nestjs/common';
import { ChatGptStoreService } from './chat-gpt-store.service';
import { ChatGptStoreController } from './chat-gpt-store.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { ChatGptStore } from './entities/chat-gpt-store.entity';
import { ChatGptStoreRepository } from './repository/chat-gpt-store.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, ChatGptStore]),
  ],
  controllers: [ChatGptStoreController],
  providers: [ChatGptStoreService, ChatGptStoreRepository],
  exports: [ChatGptStoreService, ChatGptStoreRepository],
})
export class ChatGptStoreModule {}
