import { PartialType } from '@nestjs/mapped-types';
import { CreateChatGptStoreDto } from './create-chat-gpt-store.dto';

export class UpdateChatGptStoreDto extends PartialType(CreateChatGptStoreDto) {}
