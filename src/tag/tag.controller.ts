import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body('group_id') group_id: number, @Body('name') name: string) {
    return this.tagService.create(group_id, name);
  }

  @Get(':group_id')
  findTagsByGroup(@Param('group_id') group_id: number) {
    return this.tagService.findTagsByGroup(group_id);
  }

  @Patch(':id')
  editTag(@Param('id') id: string, @Body('name') name: string) {
    return this.tagService.edit(+id, name);
  }

  @Delete(':id')
  deleteTag(@Param('id') id: number) {
    return this.tagService.delete(id);
  }
}
