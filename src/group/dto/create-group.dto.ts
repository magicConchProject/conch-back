import { IsArray, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateGroupDto {
  @IsString()
  name: string;

  user: any;
}
