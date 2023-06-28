import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  contents: string;

  @IsString()
  group_id: string;

  tag_id: number | null;
}
