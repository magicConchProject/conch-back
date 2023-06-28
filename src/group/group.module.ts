import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Group } from './entities/group.entity';
import { GroupRepository } from './repository/group.repository';
import { ConfigModule } from '@nestjs/config';
import { UserGroup } from 'src/usergroup/entities/usergroup.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Group, UserGroup]),
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
  exports: [GroupService, GroupRepository],
})
export class GroupModule {}
