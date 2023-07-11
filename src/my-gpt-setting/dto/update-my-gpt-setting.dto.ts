import { PartialType } from '@nestjs/mapped-types';
import { CreateMyGptSettingDto } from './create-my-gpt-setting.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateMyGptSettingDto extends PartialType(CreateMyGptSettingDto) {
  @IsString()
  concept: string;

  @IsString()
  model: string;

  @IsNumber()
  temperature: number;

  @IsNumber()
  topP: number;

  @IsNumber()
  maximumLength: number;

  @IsNumber()
  frequencyPenalty: number;

  @IsNumber()
  presencePenalty: number;
}
