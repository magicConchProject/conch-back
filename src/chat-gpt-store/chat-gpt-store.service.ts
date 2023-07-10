import { Injectable } from '@nestjs/common';
import { CreateChatGptStoreDto } from './dto/create-chat-gpt-store.dto';
import { UpdateChatGptStoreDto } from './dto/update-chat-gpt-store.dto';

@Injectable()
export class ChatGptStoreService {
  create(createChatGptStoreDto: CreateChatGptStoreDto) {
    return 'This action adds a new chatGptStore';
  }

  findAll() {
    return `This action returns all chatGptStore`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatGptStore`;
  }

  update(id: number, updateChatGptStoreDto: UpdateChatGptStoreDto) {
    return `This action updates a #${id} chatGptStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatGptStore`;
  }
}
