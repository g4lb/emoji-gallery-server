import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsEnum,
  Min,
  Max,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { EmojiType } from './emoji.schema';

export class EmojiDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsEnum(EmojiType)
  type: EmojiType;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  order: number;
}
