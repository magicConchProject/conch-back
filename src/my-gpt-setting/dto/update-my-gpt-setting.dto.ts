import { PartialType } from '@nestjs/mapped-types';
import { CreateMyGptSettingDto } from './create-my-gpt-setting.dto';

export class UpdateMyGptSettingDto extends PartialType(CreateMyGptSettingDto) {}
