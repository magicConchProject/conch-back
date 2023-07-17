import { IsNumber, IsString } from 'class-validator';

export class CreateChatGptStoreDto {
  @IsString()
  title: string;

  @IsString()
  describtion: string;

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
