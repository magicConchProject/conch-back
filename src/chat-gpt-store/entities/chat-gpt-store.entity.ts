import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ChatGptStore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', default: '' })
  describtion: string;

  @Column({ type: 'text', default: '' })
  concept: string;

  @Column({ default: 'gpt-3.5-turbo' })
  model: string;

  @Column({ default: 1 })
  temperature: number;

  @Column({ default: 1 })
  topP: number;

  @Column({ default: 512 })
  maximumLength: number;

  @Column({ default: 0 })
  frequencyPenalty: number;

  @Column({ default: 0 })
  presencePenalty: number;

  @OneToMany(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
