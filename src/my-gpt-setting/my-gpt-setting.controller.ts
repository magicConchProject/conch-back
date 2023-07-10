import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MyGptSettingService } from './my-gpt-setting.service';
import { CreateMyGptSettingDto } from './dto/create-my-gpt-setting.dto';
import { UpdateMyGptSettingDto } from './dto/update-my-gpt-setting.dto';

@Controller('my-gpt-setting')
export class MyGptSettingController {
  constructor(private readonly myGptSettingService: MyGptSettingService) {}

  @Post()
  create(@Body() createMyGptSettingDto: CreateMyGptSettingDto) {
    return this.myGptSettingService.create(createMyGptSettingDto);
  }

  @Get()
  findAll() {
    return this.myGptSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.myGptSettingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMyGptSettingDto: UpdateMyGptSettingDto) {
    return this.myGptSettingService.update(+id, updateMyGptSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.myGptSettingService.remove(+id);
  }
}
