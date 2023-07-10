import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChatGptStoreService } from './chat-gpt-store.service';
import { CreateChatGptStoreDto } from './dto/create-chat-gpt-store.dto';
import { UpdateChatGptStoreDto } from './dto/update-chat-gpt-store.dto';

@Controller('chat-gpt-store')
export class ChatGptStoreController {
  constructor(private readonly chatGptStoreService: ChatGptStoreService) {}

  @Post()
  create(@Body() createChatGptStoreDto: CreateChatGptStoreDto) {
    return this.chatGptStoreService.create(createChatGptStoreDto);
  }

  @Get()
  findAll() {
    return this.chatGptStoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatGptStoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatGptStoreDto: UpdateChatGptStoreDto) {
    return this.chatGptStoreService.update(+id, updateChatGptStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatGptStoreService.remove(+id);
  }
}
