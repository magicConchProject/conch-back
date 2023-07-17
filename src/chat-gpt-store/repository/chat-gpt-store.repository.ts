import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateChatGptStoreDto } from '../dto/create-chat-gpt-store.dto';
import { ChatGptStore } from '../entities/chat-gpt-store.entity';

@Injectable()
export class ChatGptStoreRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(ChatGptStore)
    private readonly chatGptStore: Repository<ChatGptStore>,
  ) {}

  /**
   * store list 조회
   * @returns
   */
  async getStoreList() {
    return await this.chatGptStore
      .createQueryBuilder('chat_gpt_store')
      .leftJoinAndSelect('chat_gpt_store.user', 'user')
      .select(['chat_gpt_store', 'user.name'])
      .getMany();
  }

  /**
   * store detail 정보 조회
   * @param id
   * @returns
   */
  async getStoreDetail(id: number) {
    return await this.chatGptStore
      .createQueryBuilder('chat_gpt_store')
      .where('id = :id', { id })
      .getOne();
  }

  /**
   * 데이터 저장하기
   * @param data
   * @param user_id
   * @returns
   */
  async addStore(data: CreateChatGptStoreDto, user_id: number) {
    const user = await this.userRepository.findOne({ where: { id: user_id } });
    return await this.chatGptStore.save(
      this.chatGptStore.create({ user, ...data }),
    );
  }
}
