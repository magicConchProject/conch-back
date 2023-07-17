import { Injectable } from '@nestjs/common';
import { CreateChatGptStoreDto } from './dto/create-chat-gpt-store.dto';
import { UpdateChatGptStoreDto } from './dto/update-chat-gpt-store.dto';
import { ChatGptStoreRepository } from './repository/chat-gpt-store.repository';

@Injectable()
export class ChatGptStoreService {
  constructor(
    private readonly chatGptStoreRepository: ChatGptStoreRepository,
  ) {}
  addStore(createChatGptStoreDto: CreateChatGptStoreDto, user_id: number) {
    return this.chatGptStoreRepository.addStore(createChatGptStoreDto, user_id);
  }

  create(createChatGptStoreDto: CreateChatGptStoreDto) {
    return 'This action adds a new chatGptStore';
  }

  findAll() {
    return this.chatGptStoreRepository.getStoreList();
  }

  findOne(id: number) {
    return this.chatGptStoreRepository.getStoreDetail(id);
  }

  update(id: number, updateChatGptStoreDto: UpdateChatGptStoreDto) {
    return `This action updates a #${id} chatGptStore`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatGptStore`;
  }
}
