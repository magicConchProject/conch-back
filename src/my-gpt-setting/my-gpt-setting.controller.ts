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
import { MyGptSettingService } from './my-gpt-setting.service';
import { CreateMyGptSettingDto } from './dto/create-my-gpt-setting.dto';
import { UpdateMyGptSettingDto } from './dto/update-my-gpt-setting.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtGuard)
@Controller('my-gpt-setting')
export class MyGptSettingController {
  constructor(private readonly myGptSettingService: MyGptSettingService) {}

  @Get()
  getSetting(@Req() req: Request) {
    return this.myGptSettingService.findOne(req['user']['id']);
  }

  @Patch()
  update(
    @Req() req: Request,
    @Body() updateMyGptSettingDto: UpdateMyGptSettingDto,
  ) {
    return this.myGptSettingService.update(
      req['user']['id'],
      updateMyGptSettingDto,
    );
  }
}
