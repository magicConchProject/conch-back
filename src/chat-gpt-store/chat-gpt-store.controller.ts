import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChatGptStoreService } from './chat-gpt-store.service';
import { CreateChatGptStoreDto } from './dto/create-chat-gpt-store.dto';
import { UpdateChatGptStoreDto } from './dto/update-chat-gpt-store.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('chat-gpt-store')
export class ChatGptStoreController {
  constructor(private readonly chatGptStoreService: ChatGptStoreService) {}

  @Post()
  addStore(
    @Body() createChatGptStoreDto: CreateChatGptStoreDto,
    @Req() req: Request,
  ) {
    return this.chatGptStoreService.addStore(
      createChatGptStoreDto,
      req['user']['id'],
    );
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
  update(
    @Param('id') id: string,
    @Body() updateChatGptStoreDto: UpdateChatGptStoreDto,
  ) {
    return this.chatGptStoreService.update(+id, updateChatGptStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatGptStoreService.remove(+id);
  }
}
