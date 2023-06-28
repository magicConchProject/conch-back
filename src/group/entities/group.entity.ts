import { Post } from 'src/post/entities/post.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/user/entities/user.entity';
import { UserGroup } from 'src/usergroup/entities/usergroup.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group, { cascade: true })
  userGroups: UserGroup[];

  @Column({ default: 0 })
  memberCount: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @OneToMany(() => Post, (post) => post.group, { cascade: true })
  postGroups: Post[];

  @OneToMany(() => Tag, (tag) => tag.group, { cascade: true })
  tagGroups: Tag[];
}
