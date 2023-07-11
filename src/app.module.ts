import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { GroupModule } from './group/group.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { Group } from './group/entities/group.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsergroupModule } from './usergroup/usergroup.module';
import { UserGroup } from './usergroup/entities/usergroup.entity';
import { Post } from './post/entities/post.entity';
import { Comment } from './comment/entities/comment.entity';
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/entities/tag.entity';
import { MyGptSettingModule } from './my-gpt-setting/my-gpt-setting.module';
import { ChatGptStoreModule } from './chat-gpt-store/chat-gpt-store.module';
import { MyGptSetting } from './my-gpt-setting/entities/my-gpt-setting.entity';
import { ChatGptStore } from './chat-gpt-store/entities/chat-gpt-store.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number(process.env.PORT),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [
        User,
        Group,
        UserGroup,
        Post,
        Comment,
        Tag,
        MyGptSetting,
        ChatGptStore,
      ],
      synchronize: true,
    }),
    UserModule,
    GroupModule,
    PostModule,
    CommentModule,
    AuthModule,
    UsergroupModule,
    TagModule,
    MyGptSettingModule,
    ChatGptStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppController],
})
export class AppModule {}
