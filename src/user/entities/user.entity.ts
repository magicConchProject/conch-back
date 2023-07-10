import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { Group } from 'src/group/entities/group.entity';
import { UserGroup } from 'src/usergroup/entities/usergroup.entity';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { MyGptSetting } from 'src/my-gpt-setting/entities/my-gpt-setting.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  premium: boolean;

  @Column({ default: 100 })
  token: number;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.user, { cascade: true })
  userGroups: UserGroup[];

  @OneToMany(() => Group, (group) => group.manager, { cascade: true })
  managers: Group[];

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];

  @OneToOne(() => MyGptSetting, (myGptSetting) => myGptSetting.user, {
    cascade: true,
  })
  myGptSetting: MyGptSetting;
}
