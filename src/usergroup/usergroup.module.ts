import { Module } from '@nestjs/common';
import { UsergroupService } from './usergroup.service';
import { UsergroupController } from './usergroup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Group } from 'src/group/entities/group.entity';
import { UserGroup } from './entities/usergroup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, UserGroup])],
  controllers: [UsergroupController],
  providers: [UsergroupService],
  exports: [UsergroupService],
})
export class UsergroupModule {}
