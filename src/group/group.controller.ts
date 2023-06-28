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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Request } from 'express';
import { Group } from './entities/group.entity';
import { User } from 'src/user/entities/user.entity';

@UseGuards(JwtGuard)
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Req() req: Request) {
    return this.groupService.create({
      name: req.body.name,
      user: req['user'],
    });
  }

  @Get('/findParticipation')
  findAllParticipation(@Req() req: Request) {
    return this.groupService.findAllParticipation(req['user']['id']);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.groupService.findAll(req['user']['id']);
  }

  @Get('/my')
  findMyAll(@Req() req: Request) {
    return this.groupService.fundMyAll(req['user']['id']);
  }

  @Get('/notMy')
  findNotMyAll(@Req() req: Request) {
    return this.groupService.findNotMyAll(req['user']['id']);
  }

  @Post('/search')
  search(@Req() req: Request, @Body() { name }: { name: string }) {
    return this.groupService.search(req['user']['id'], name);
  }

  @Post('/participate')
  participate(@Req() req: Request, @Body() body) {
    return this.groupService.participate(req['user'] as User, body);
  }

  @Patch('/acceptParticipation/:id')
  acceptParticipation(@Param('id') id: number) {
    return this.groupService.acceptParticipation(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('name') name: string) {
    return this.groupService.update(+id, name);
  }

  @Delete('/denyParticipation/:userGroupId/:groupId')
  denyParticipation(
    @Param('userGroupId') userGroupId: number,
    @Param('groupId') groupId: number,
  ) {
    return this.groupService.denyParticipation(userGroupId, groupId);
  }

  @Delete('/canellationGroup/:userGroupId/:groupId')
  canellationGroup(
    @Param('userGroupId') userGroupId: number,
    @Param('groupId') groupId: number,
  ) {
    return this.groupService.canellationGroup(userGroupId, groupId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
